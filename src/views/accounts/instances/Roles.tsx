import { useMemo, useState, useRef, useDeferredValue } from 'react';
import {
  Button,
  TextField,
  Stack,
  InputAdornment,
  ThemeProvider,
  CircularProgress,
} from '@mui/material';
import { Search, AddRounded } from '@mui/icons-material';
import { theme } from '@zesty-io/material';

import { useRoles } from 'store/roles';
import { AccountsHeader } from 'components/accounts';
import { NoPermission } from 'components/globals/NoPermission';
import { BaseRoles } from 'components/accounts/roles/BaseRoles';
import { NoCustomRoles } from 'components/accounts/roles/NoCustomRoles';
import { CustomRoles } from 'components/accounts/roles/CustomRoles';
import { CreateCustomRoleDialog } from 'components/accounts/roles/CreateCustomRoleDialog';
import { NoSearchResults } from 'components/accounts/ui/NoSearchResults';

type RolesProps = {
  isLoading: boolean;
  hasPermission: boolean;
};
export const Roles = ({ isLoading, hasPermission }: RolesProps) => {
  const { usersWithRoles, customRoles, baseRoles } = useRoles((state) => state);
  const customRolesRef = useRef(null);
  const searchFieldRef = useRef(null);
  const [isCreateCustomRoleDialogOpen, setIsCreateCustomRoleDialogOpen] =
    useState(false);
  const [filterKeyword, setFilterKeyword] = useState('');
  const deferredFilterKeyword = useDeferredValue(filterKeyword);

  const filteredRoles = useMemo(() => {
    const keyword = deferredFilterKeyword?.toLowerCase();

    if (!keyword) {
      return {
        baseRoles,
        customRoles,
      };
    }

    return {
      baseRoles: baseRoles?.filter((role) =>
        role.name.toLowerCase().includes(keyword),
      ),
      customRoles: customRoles?.filter((role) =>
        role.name.toLowerCase().includes(keyword),
      ),
    };
  }, [baseRoles, customRoles, deferredFilterKeyword]);

  if (isLoading) {
    return (
      <ThemeProvider theme={theme}>
        <Stack height="100%">
          {/* @ts-expect-error untyped component */}
          <AccountsHeader
            title="Roles & Permissions"
            description="Manage your roles and their permissions"
            info="View and manage all the roles (both system and custom) that your users can have."
          ></AccountsHeader>
          <Stack
            mx={4}
            bgcolor="grey.50"
            flex={1}
            borderRadius={2}
            alignItems="center"
            justifyContent="center"
          >
            <CircularProgress />
          </Stack>
        </Stack>
      </ThemeProvider>
    );
  }

  if (!hasPermission) {
    return (
      <ThemeProvider theme={theme}>
        <Stack height="100%">
          {/* @ts-expect-error untyped component */}
          <AccountsHeader
            title="Roles & Permissions"
            description="Manage your roles and their permissions"
            info="View and manage all the roles (both system and custom) that your users can have."
          ></AccountsHeader>
          <Stack
            mx={4}
            bgcolor="grey.50"
            flex={1}
            borderRadius={2}
            alignItems="center"
            justifyContent="center"
          >
            <NoPermission users={usersWithRoles} />
          </Stack>
        </Stack>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Stack height="100%">
        <AccountsHeader
          title="Roles & Permissions"
          description="Manage your roles and their permissions"
          info="View and manage all the roles (both system and custom) that your users can have."
        >
          <Stack gap={2} direction="row">
            <TextField
              size="small"
              placeholder="Search Roles"
              value={filterKeyword}
              onChange={(evt) => setFilterKeyword(evt.target.value)}
              ref={searchFieldRef}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              size="small"
              color="primary"
              variant="contained"
              startIcon={<AddRounded />}
              onClick={() => setIsCreateCustomRoleDialogOpen(true)}
            >
              Create Custom Role
            </Button>
          </Stack>
        </AccountsHeader>
        <Stack gap={2} mx={4}>
          {!filteredRoles?.customRoles?.length &&
          !filteredRoles?.baseRoles?.length &&
          deferredFilterKeyword ? (
            <NoSearchResults
              keyword={deferredFilterKeyword}
              onSearchAgain={() => {
                setFilterKeyword('');
                searchFieldRef.current?.querySelector('input')?.focus();
              }}
            />
          ) : (
            <>
              {filteredRoles?.customRoles?.length ||
              (!filteredRoles?.customRoles?.length &&
                !!deferredFilterKeyword) ? (
                <CustomRoles
                  customRoles={filteredRoles?.customRoles}
                  ref={customRolesRef}
                />
              ) : (
                <NoCustomRoles
                  onCreateCustomRoleClick={() =>
                    setIsCreateCustomRoleDialogOpen(true)
                  }
                />
              )}
              <BaseRoles baseRoles={filteredRoles?.baseRoles} />
            </>
          )}
        </Stack>
      </Stack>
      {isCreateCustomRoleDialogOpen && (
        <CreateCustomRoleDialog
          onClose={() => setIsCreateCustomRoleDialogOpen(false)}
          onRoleCreated={(ZUID) =>
            customRolesRef.current?.updateZUIDToEdit?.(ZUID)
          }
        />
      )}
    </ThemeProvider>
  );
};
