import { useReducer, useState, useMemo } from 'react';
import {
  Typography,
  Avatar,
  Stack,
  Box,
  TextField,
  Autocomplete,
  IconButton,
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  InputLabel,
  Tooltip,
} from '@mui/material';
import {
  LocalPoliceOutlined,
  Close,
  InfoRounded,
  Check,
  EditRounded,
  ImageRounded,
  CodeRounded,
  RecentActorsRounded,
  BarChartRounded,
  HistoryRounded,
  SettingsRounded,
  ShuffleRounded,
  ExtensionRounded,
} from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Database, Block } from '@zesty-io/material';
import { useRouter } from 'next/router';

import { useZestyStore } from 'store';
import { useRoles } from 'store/roles';
import { ErrorMsg } from '../ui';

export const BASE_ROLE_PERMISSIONS = Object.freeze({
  '31-71cfc74-0wn3r': {
    actions: {
      create: true,
      read: true,
      update: true,
      delete: true,
      publish: true,
      grant: true,
      super: true,
    },
    products: {
      content: true,
      blocks: true,
      schema: true,
      media: true,
      code: true,
      leads: true,
      analytics: true,
      redirects: true,
      activityLog: true,
      apps: true,
      settings: true,
    },
  },
  '31-71cfc74-4dm13': {
    actions: {
      create: true,
      read: true,
      update: true,
      delete: true,
      publish: true,
      grant: true,
      super: false,
    },
    products: {
      content: true,
      blocks: true,
      schema: true,
      media: true,
      code: true,
      leads: true,
      analytics: true,
      redirects: true,
      activityLog: true,
      apps: true,
      settings: true,
    },
  },
  '31-71cfc74-4cc4dm13': {
    actions: {
      create: false,
      read: true,
      update: false,
      delete: false,
      publish: false,
      grant: true,
      super: true,
    },
    products: {
      content: true,
      blocks: true,
      schema: true,
      media: true,
      code: true,
      leads: true,
      analytics: true,
      redirects: true,
      activityLog: true,
      apps: true,
      settings: true,
    },
  },
  '31-71cfc74-d3v3l0p3r': {
    actions: {
      create: true,
      read: true,
      update: true,
      delete: true,
      publish: true,
      grant: false,
      super: false,
    },
    products: {
      content: true,
      blocks: true,
      schema: true,
      media: true,
      code: true,
      leads: true,
      analytics: false,
      redirects: true,
      activityLog: false,
      apps: true,
      settings: true,
    },
  },
  '31-71cfc74-d3vc0n': {
    actions: {
      create: true,
      read: true,
      update: true,
      delete: false,
      publish: false,
      grant: false,
      super: false,
    },
    products: {
      content: true,
      blocks: true,
      schema: true,
      media: true,
      code: true,
      leads: true,
      analytics: false,
      redirects: true,
      activityLog: false,
      apps: true,
      settings: true,
    },
  },
  '31-71cfc74-p0bl1shr': {
    actions: {
      create: true,
      read: true,
      update: true,
      delete: true,
      publish: true,
      grant: false,
      super: false,
    },
    products: {
      content: true,
      blocks: true,
      schema: false,
      media: true,
      code: false,
      leads: true,
      analytics: false,
      redirects: false,
      activityLog: false,
      apps: true,
      settings: false,
    },
  },
  '31-71cfc74-c0ntr1b0t0r': {
    actions: {
      create: true,
      read: true,
      update: true,
      delete: false,
      publish: false,
      grant: false,
      super: false,
    },
    products: {
      content: true,
      blocks: true,
      schema: true,
      media: true,
      code: true,
      leads: true,
      analytics: true,
      redirects: true,
      activityLog: true,
      apps: true,
      settings: true,
    },
  },
  '31-71cfc74-s30': {
    actions: {
      create: true,
      read: true,
      update: true,
      delete: true,
      publish: true,
      grant: false,
      super: false,
    },
    products: {
      content: true,
      blocks: true,
      schema: false,
      media: true,
      code: false,
      leads: true,
      analytics: false,
      redirects: true,
      activityLog: false,
      apps: true,
      settings: false,
    },
  },
});
export const PRODUCT_DETAILS = Object.freeze({
  content: {
    name: 'Content',
    icon: <EditRounded color="action" sx={{ fontSize: 16 }} />,
  },
  blocks: {
    name: 'Blocks',
    // FIXME: Icon is too small
    icon: <Block color="action" sx={{ fontSize: 16 }} />,
  },
  schema: {
    name: 'Schema',
    icon: <Database color="action" sx={{ fontSize: 16 }} />,
  },
  media: {
    name: 'Media',
    icon: <ImageRounded color="action" sx={{ fontSize: 16 }} />,
  },
  code: {
    name: 'Code (Zesty IDE)',
    icon: <CodeRounded color="action" sx={{ fontSize: 16 }} />,
  },
  leads: {
    name: 'Leads',
    icon: <RecentActorsRounded color="action" sx={{ fontSize: 16 }} />,
  },
  analytics: {
    name: 'Analytics',
    icon: <BarChartRounded color="action" sx={{ fontSize: 16 }} />,
  },
  redirects: {
    name: 'Redirects',
    icon: <ShuffleRounded color="action" sx={{ fontSize: 16 }} />,
  },
  activityLog: {
    name: 'Activity Log',
    icon: <HistoryRounded color="action" sx={{ fontSize: 16 }} />,
  },
  apps: {
    name: 'Apps',
    icon: <ExtensionRounded color="action" sx={{ fontSize: 16 }} />,
  },
  settings: {
    name: 'Settings',
    icon: <SettingsRounded color="action" sx={{ fontSize: 16 }} />,
  },
});

export type RoleDetails = {
  name: string;
  description: string;
  systemRoleZUID: string;
};

type CreateCustomRoleDialogProps = {
  onClose: () => void;
  onRoleCreated: (ZUID: string) => void;
};
export const CreateCustomRoleDialog = ({
  onClose,
  onRoleCreated,
}: CreateCustomRoleDialogProps) => {
  const router = useRouter();
  const { instance } = useZestyStore((state) => state);
  const { createRole, getRoles, baseRoles } = useRoles((state) => state);
  const [isCreatingRole, setIsCreatingRole] = useState(false);

  const [fieldData, updateFieldData] = useReducer(
    (state: RoleDetails, data: Partial<RoleDetails>) => {
      return {
        ...state,
        ...data,
      };
    },
    {
      name: '',
      description: '',
      systemRoleZUID: '31-71cfc74-4dm13',
    },
  );

  const baseRoleOptions = useMemo(() => {
    if (!baseRoles?.length) return [];

    return baseRoles?.map((role) => ({
      label: role.name,
      value: role.systemRoleZUID,
    }));
  }, [baseRoles]);

  const handleCreateRole = () => {
    const instanceZUID = String(router?.query?.zuid);

    if (!fieldData.name && !fieldData.systemRoleZUID) return;

    setIsCreatingRole(true);
    createRole({
      name: fieldData.name.replace(/[^\w\s\n]/g, ''),
      description: fieldData.description.replace(/[^\w\s\n]/g, ''),
      systemRoleZUID: fieldData.systemRoleZUID,
      instanceZUID,
    })
      .then((response: any) => {
        getRoles(instanceZUID)
          .then(() => {
            onRoleCreated(response?.ZUID);
            onClose?.();
          })
          .catch(() => ErrorMsg({ title: 'Failed to fetch roles' }));
      })
      .catch(() => ErrorMsg({ title: 'Failed to create role' }))
      .finally(() => {
        setIsCreatingRole(false);
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
      <Stack
        direction="row"
        p={2.5}
        height={86}
        boxSizing="border-box"
        justifyContent="space-between"
        alignItems="flex-start"
        borderBottom="2px solid"
        borderColor="border"
      >
        <Stack direction="row" gap={1.5} alignItems="center">
          <Avatar sx={{ bgcolor: 'blue.100' }}>
            <LocalPoliceOutlined color="info" />
          </Avatar>
          <Box display="inline">
            <Typography variant="h5" fontWeight={700}>
              Create Custom Role
            </Typography>
            <Typography variant="body3" fontWeight={600} color="text.secondary">
              Creates a custom role that can have granular permissions applied
              to it
            </Typography>
          </Box>
        </Stack>
        <IconButton size="small" onClick={() => onClose?.()}>
          <Close />
        </IconButton>
      </Stack>
      <DialogContent
        sx={{
          p: 2.5,
          bgcolor: 'grey.50',
          display: 'flex',
          flexDirection: 'column',
          gap: 2.5,
        }}
      >
        <Box>
          <Stack direction="row" alignItems="center" gap={1} mb={0.5}>
            <InputLabel sx={{ mb: 0 }}>Role Name</InputLabel>
            <Tooltip title="Lorem Ipsum" placement="right">
              <InfoRounded color="action" sx={{ fontSize: 12 }} />
            </Tooltip>
          </Stack>
          <TextField
            value={fieldData.name}
            onChange={(evt) => updateFieldData({ name: evt.target.value })}
            placeholder="e.g. Lawyer"
            fullWidth
            disabled={isCreatingRole}
          />
        </Box>
        <Box>
          <Stack direction="row" alignItems="center" gap={1} mb={0.5}>
            <InputLabel sx={{ mb: 0 }}>Role Description</InputLabel>
            <Tooltip title="Lorem Ipsum" placement="right">
              <InfoRounded color="action" sx={{ fontSize: 12 }} />
            </Tooltip>
          </Stack>
          <TextField
            value={fieldData.description}
            onChange={(evt) =>
              updateFieldData({ description: evt.target.value })
            }
            placeholder="What is this role going to be used for"
            multiline
            fullWidth
            rows={4}
            disabled={isCreatingRole}
          />
        </Box>
        <Box>
          <Stack direction="row" alignItems="center" gap={1} mb={0.5}>
            <InputLabel sx={{ mb: 0 }}>Base Role</InputLabel>
            <Tooltip title="Lorem Ipsum" placement="right">
              <InfoRounded color="action" sx={{ fontSize: 12 }} />
            </Tooltip>
          </Stack>
          <Autocomplete
            disableClearable
            value={baseRoleOptions.find(
              (role) => role.value === fieldData.systemRoleZUID,
            )}
            onChange={(_, value) =>
              updateFieldData({ systemRoleZUID: value.value })
            }
            options={baseRoleOptions}
            renderInput={(params) => <TextField {...params} />}
            disabled={isCreatingRole}
          />
        </Box>
        <Box>
          <Typography variant="body2" fontWeight={700} mb={1.5}>
            {instance?.name} Base Permissions
          </Typography>
          <Stack direction="row">
            {Object.entries(
              BASE_ROLE_PERMISSIONS[fieldData.systemRoleZUID]?.actions || {},
            )?.map(([name, permission], index) => (
              <Stack width={80} gap={0.5} key={index}>
                <Typography
                  variant="body2"
                  fontWeight={600}
                  sx={{ textTransform: 'capitalize' }}
                >
                  {name}
                </Typography>
                {!!permission ? (
                  <Check color="success" />
                ) : (
                  <Close color="error" />
                )}
              </Stack>
            ))}
          </Stack>
        </Box>
        <Box component="ul" pl={2.5} my={0}>
          <Box component="li">
            <Typography variant="body2" mb={2}>
              Has access to:
            </Typography>
            <Stack direction="row" gap={1.5}>
              {Object.entries(
                BASE_ROLE_PERMISSIONS[fieldData.systemRoleZUID]?.products || {},
              )?.map(([product, hasAccess]) => {
                if (hasAccess && !!PRODUCT_DETAILS[product]) {
                  return (
                    <Stack direction="row" gap={0.5} alignItems="center">
                      {PRODUCT_DETAILS[product]?.icon}
                      <Typography variant="body3">
                        {PRODUCT_DETAILS[product]?.name}
                      </Typography>
                    </Stack>
                  );
                }
              })}
            </Stack>
          </Box>
          <Box component="li">
            <Typography variant="body2" mt={2}>
              {fieldData.systemRoleZUID === '31-71cfc74-0wn3r'
                ? 'Can delete users'
                : 'Cannot delete other users'}
            </Typography>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions
        sx={{ p: 2.5, gap: 1, borderTop: '2px solid', borderColor: 'border' }}
      >
        <Button
          variant="outlined"
          color="inherit"
          onClick={() => onClose?.()}
          disabled={isCreatingRole}
        >
          Cancel
        </Button>
        <LoadingButton
          disabled={!fieldData.systemRoleZUID || !fieldData.name}
          loading={isCreatingRole}
          variant="contained"
          color="primary"
          onClick={handleCreateRole}
        >
          Create
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};
