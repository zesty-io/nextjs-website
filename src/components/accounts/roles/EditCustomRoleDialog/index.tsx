import { useMemo, useState, useReducer, useEffect } from 'react';
import {
  Typography,
  Avatar,
  Stack,
  Box,
  IconButton,
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Tabs,
  Tab,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import {
  LocalPoliceOutlined,
  Close,
  InfoRounded,
  RuleRounded,
  GroupsRounded,
} from '@mui/icons-material';
import { useRouter } from 'next/router';

import { useRoles } from 'store/roles';
import { Details } from './tabs/Details';
import { Permissions } from './tabs/Permissions';
import { Users } from './tabs/Users';
import { GranularRole } from 'store/types';
import { useZestyStore } from 'store';
import { ErrorMsg } from 'components/accounts/ui';

export const TabNames = {
  details: 'details',
  permissions: 'permissions',
  users: 'users',
} as const;
export type TabName = (typeof TabNames)[keyof typeof TabNames];
type FieldErrors = {
  detailsTab: {
    roleName: string;
    roleDescription: string;
  };
  permissionsTab: string[];
  usersTab: string[];
};
export type RoleDetails = {
  name: string;
  description: string;
  systemRoleZUID: string;
};

type EditCustomRoleDialogProps = {
  ZUID: string;
  onClose: () => void;
  tabToOpen?: TabName;
};
export const EditCustomRoleDialog = ({
  ZUID,
  onClose,
  tabToOpen = TabNames.details,
}: EditCustomRoleDialogProps) => {
  const router = useRouter();
  const { ZestyAPI } = useZestyStore((state: any) => state);
  const {
    getRoles,
    customRoles,
    baseRoles,
    updateGranularRole,
    updateRole,
    createGranularRole,
    deleteGranularRole,
    usersWithRoles,
    updateUserRole,
    getUsersWithRoles,
  } = useRoles((state) => state);
  const [activeTab, setActiveTab] = useState<TabName>(tabToOpen);
  const [isSaving, setIsSaving] = useState(false);
  const [fieldErrors, updateFieldErrors] = useReducer(
    (
      state: FieldErrors,
      action: {
        tab: keyof FieldErrors;
        data: Partial<FieldErrors[keyof FieldErrors]>;
      },
    ) => {
      return {
        ...state,
        [action.tab]: {
          ...state[action.tab],
          ...action.data,
        },
      };
    },
    {
      detailsTab: {
        roleName: null,
        roleDescription: null,
      },
      permissionsTab: [],
      usersTab: [],
    },
  );

  const roleUsers = useMemo(() => {
    if (!usersWithRoles?.length) return [];

    return usersWithRoles?.filter((user) => user.role?.ZUID === ZUID);
  }, [usersWithRoles, customRoles]);
  const [userEmails, setUserEmails] = useState<string[]>(
    roleUsers?.map((user) => user.email) || [],
  );

  const { zuid: instanceZUID } = router.query;

  const roleData = customRoles?.find((role) => role.ZUID === ZUID);
  const [granularRoles, setGranularRoles] = useState<Partial<GranularRole>[]>(
    [],
  );
  const [resourceZUIDsToDelete, setResourceZUIDsToDelete] = useState<string[]>(
    [],
  );

  useEffect(() => {
    setUserEmails(roleUsers?.map((user) => user.email) || []);
  }, [roleUsers]);

  const [detailsData, updateDetailsData] = useReducer(
    (state: RoleDetails, data: Partial<RoleDetails>) => {
      return {
        ...state,
        ...data,
      };
    },
    {
      name: roleData?.name || '',
      description: roleData?.description || '',
      systemRoleZUID: roleData?.systemRoleZUID || '31-71cfc74-4dm13',
    },
  );

  useEffect(() => {
    if (!ZUID) return;

    getPermissions(ZUID);
  }, [ZUID]);

  const getPermissions = async (ZUID: string) => {
    const res = await ZestyAPI.getAllGranularRoles(ZUID);

    if (res.error) {
      ErrorMsg({ text: res.error });
      setGranularRoles([]);
    } else {
      setGranularRoles(res.data);
    }
  };

  const saveGranularRoleUpdates = async () => {
    const granularRolesClone: GranularRole[] = JSON.parse(
      JSON.stringify(granularRoles || []),
    );
    const payload = granularRolesClone?.map((role) => ({
      resourceZUID: role.resourceZUID,
      create: role.create,
      read: role.read,
      update: role.update,
      delete: role.delete,
      publish: role.publish,
      name: '',
    }));

    if (!!roleData?.granularRoleZUID) {
      // If a granularRoleZUID is already attached to the role, we can just
      // do an update to add the new granular roles
      if (!!payload?.length) {
        return updateGranularRole({
          roleZUID: ZUID,
          granularRoles: payload,
        });
      }
    } else {
      // If the role doesn't have any granularRoleZUID attached, we need to create a
      // granular role first
      const granularRoleInitiator = payload?.[0];

      if (granularRoleInitiator) {
        return createGranularRole({
          roleZUID: ZUID,
          data: granularRoleInitiator,
        }).then(() => {
          // If there are any other granular roles aside from the one we used to
          // initiate a new granular role zuid, we then use the update endpoint to
          // add those in as well
          if (payload?.length > 1) {
            return updateGranularRole({
              roleZUID: ZUID,
              granularRoles: payload,
            });
          }
        });
      }
    }
  };

  const saveUsersUpdate = () => {
    const baseRoleZUID = baseRoles?.find(
      (role) => role.systemRoleZUID === roleData?.systemRoleZUID,
    )?.ZUID;
    const alreadyExistingUsers: string[] = roleUsers?.reduce(
      (prev, curr) => [...prev, curr.email],
      [],
    );
    const usersToRemove = alreadyExistingUsers?.filter(
      (email) => !userEmails?.includes(email),
    );
    const usersToAdd = userEmails?.filter(
      (email) => !alreadyExistingUsers.includes(email),
    );

    // TODO: Do something with emails that are not yet instance members
    const users = usersWithRoles?.reduce(
      (prev, curr) => {
        if (usersToAdd?.includes(curr.email)) {
          return {
            ...prev,
            toAdd: [
              ...prev.toAdd,
              {
                userZUID: curr.ZUID,
                oldRoleZUID: curr.role?.ZUID,
                newRoleZUID: ZUID,
              },
            ],
          };
        }

        if (usersToRemove?.includes(curr.email)) {
          return {
            ...prev,
            toRemove: [
              ...prev.toRemove,
              {
                userZUID: curr.ZUID,
                oldRoleZUID: curr.role?.ZUID,
                newRoleZUID: baseRoleZUID,
              },
            ],
          };
        }

        return prev;
      },
      {
        toAdd: [],
        toRemove: [],
      },
    );

    return Promise.all([
      updateUserRole(users.toAdd),
      updateUserRole(users.toRemove),
    ]);
  };

  const saveDetailsUpdate = () => {
    if (!detailsData?.name?.trim()) {
      updateFieldErrors({
        tab: 'detailsTab',
        data: {
          roleName: 'Role name is required',
        },
      });
    } else {
      return updateRole({
        roleZUID: ZUID,
        name: detailsData.name?.replace(/[^\w\s\n]/g, ''),
        description: detailsData.description?.replace(/[^\w\s\n]/g, ''),
        systemRoleZUID: detailsData.systemRoleZUID,
      });
    }
  };

  const handleSave = () => {
    setIsSaving(true);

    Promise.all([
      // Update role details
      saveDetailsUpdate(),
      // Delete a granular role if there's any to delete
      ...(!!resourceZUIDsToDelete && [
        deleteGranularRole({
          roleZUID: ZUID,
          resourceZUIDs: resourceZUIDsToDelete,
        }),
      ]),
      // Perform all granular role updates
      saveGranularRoleUpdates(),
      // Save all user updates
      saveUsersUpdate(),
    ])
      .then((responses) => console.log(responses))
      .catch(() => ErrorMsg({ title: 'Failed to update role' }))
      .finally(() => {
        getUsersWithRoles(String(instanceZUID));
        getRoles(String(instanceZUID));
        getPermissions(ZUID);
        setIsSaving(false);
        setResourceZUIDsToDelete([]);

        // Navigate to the tab if that tab has errors
        if (
          !!fieldErrors?.detailsTab?.roleName ||
          !!fieldErrors?.detailsTab?.roleDescription
        ) {
          setActiveTab('details');
        } else if (!!fieldErrors?.permissionsTab?.length) {
          setActiveTab('permissions');
        } else if (!!fieldErrors?.usersTab?.length) {
          setActiveTab('users');
        }
      });
  };

  return (
    <Dialog
      open
      fullWidth
      onClose={() => onClose?.()}
      PaperProps={{
        sx: {
          maxWidth: 960,
          width: 960,
          minHeight: 800,
        },
      }}
    >
      <Box borderBottom="2px solid" borderColor="border">
        <Stack
          direction="row"
          px={2.5}
          pt={2.5}
          boxSizing="border-box"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Stack direction="row" gap={1.5} alignItems="center">
            <Avatar sx={{ bgcolor: 'blue.100' }}>
              <LocalPoliceOutlined color="info" />
            </Avatar>
            <Box display="inline">
              <Typography variant="h5" fontWeight={700}>
                Edit {roleData?.name}
              </Typography>
              <Typography
                variant="body3"
                fontWeight={600}
                color="text.secondary"
              >
                Edit your custom role that can have granular permissions applied
                to it
              </Typography>
            </Box>
          </Stack>
          <IconButton size="small" onClick={() => onClose?.()}>
            <Close />
          </IconButton>
        </Stack>
        <Tabs
          value={activeTab}
          onChange={(_, value) => setActiveTab(value)}
          sx={{
            position: 'relative',
            top: '2px',
            px: 2.5,
          }}
        >
          <Tab
            value="details"
            label="Details"
            icon={<InfoRounded fontSize="small" />}
            iconPosition="start"
          />
          <Tab
            value="permissions"
            label="Permissions"
            icon={<RuleRounded fontSize="small" />}
            iconPosition="start"
          />
          <Tab
            value="users"
            label="Users"
            icon={<GroupsRounded fontSize="small" />}
            iconPosition="start"
          />
        </Tabs>
      </Box>
      <DialogContent
        sx={{
          p: 2.5,
          bgcolor: 'grey.50',
        }}
      >
        {activeTab === TabNames.details && (
          <Details
            data={detailsData}
            onUpdateData={(data) => {
              updateDetailsData(data);

              if (data?.name?.length) {
                updateFieldErrors({
                  tab: 'detailsTab',
                  data: {
                    roleName: null,
                  },
                });
              }
            }}
            errors={fieldErrors.detailsTab}
          />
        )}
        {activeTab === TabNames.permissions && (
          <Permissions
            granularRoles={granularRoles}
            onAddNewGranularRole={(newRoleData) => {
              setGranularRoles((prev) => [...prev, newRoleData]);
            }}
            onDeleteGranularRole={(resourceZUID) => {
              setResourceZUIDsToDelete((prevState) => {
                try {
                  const resourceZUIDsToDeleteClone = JSON.parse(
                    JSON.stringify(prevState),
                  );
                  resourceZUIDsToDeleteClone.push(resourceZUID);

                  return Array.from(new Set(resourceZUIDsToDeleteClone));
                } catch (err) {
                  console.error(err);
                }
              });
              setGranularRoles(
                (prevState) =>
                  prevState?.filter(
                    (role) => role.resourceZUID !== resourceZUID,
                  ),
              );
            }}
            onUpdateGranularRole={(updatedRoleData) => {
              setGranularRoles((prevState) => {
                try {
                  const granularRolesClone: GranularRole[] = JSON.parse(
                    JSON.stringify(prevState),
                  );
                  const index = granularRolesClone?.findIndex(
                    (role) =>
                      role.resourceZUID === updatedRoleData?.resourceZUID,
                  );

                  if (index === -1) return prevState;

                  granularRolesClone[index] = {
                    ...granularRolesClone[index],
                    ...updatedRoleData,
                  };

                  return granularRolesClone;
                } catch (err) {
                  console.error(err);
                }
              });
            }}
          />
        )}
        {activeTab === TabNames.users && (
          <Users
            userEmails={userEmails}
            onUpdateUserEmails={(emails) => setUserEmails(emails)}
          />
        )}
      </DialogContent>
      <DialogActions
        sx={{ p: 2.5, gap: 1, borderTop: '2px solid', borderColor: 'border' }}
      >
        <Button variant="outlined" color="inherit" onClick={() => onClose?.()}>
          Cancel
        </Button>
        <LoadingButton
          loading={isSaving}
          variant="contained"
          color="primary"
          onClick={handleSave}
        >
          Save
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};
