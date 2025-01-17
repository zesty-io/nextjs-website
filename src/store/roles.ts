import { create } from 'zustand';

import { UserRole, Role, GranularRole, RoleWithSort } from './types';
import { getZestyAPI } from 'store';
import { RoleDetails } from 'components/accounts/roles/CreateCustomRoleDialog';
import { NewGranularRole } from 'components/accounts/roles/EditCustomRoleDialog/tabs/Permissions';

const BASE_ROLE_SORT_ORDER = [
  '31-71cfc74-0wn3r',
  '31-71cfc74-4dm13',
  '31-71cfc74-4cc4dm13',
  '31-71cfc74-d3v3l0p3r',
  '31-71cfc74-d3vc0n',
  '31-71cfc74-s30',
  '31-71cfc74-p0bl1shr',
  '31-71cfc74-c0ntr1b0t0r',
] as const;

const ZestyAPI = getZestyAPI();

type RolesState = {
  usersWithRoles: UserRole[];
  baseRoles: RoleWithSort[];
  customRoles: Role[];
};
type RolesAction = {
  getUsersWithRoles: (instanceZUID: string) => Promise<void>;
  updateUserRole: (
    data: { userZUID: string; oldRoleZUID: string; newRoleZUID: string }[],
  ) => Promise<void>;
  getRoles: (instanceZUID: string) => Promise<void>;
  createRole: (data: RoleDetails & { instanceZUID: string }) => Promise<void>;
  updateRole: ({
    roleZUID,
    name,
    description,
    systemRoleZUID,
  }: {
    roleZUID: string;
    name: string;
    description: string;
    systemRoleZUID: string;
  }) => Promise<void>;
  deleteRole: (data: {
    roleZUIDToDelete: string;
    roleZUIDToTransferUsers: string;
  }) => Promise<void>;
  createGranularRole: ({
    roleZUID,
    data,
  }: {
    roleZUID: string;
    data: NewGranularRole & { name: string };
  }) => Promise<void>;
  updateGranularRole: ({
    roleZUID,
    granularRoles,
  }: {
    roleZUID: string;
    granularRoles: Partial<GranularRole>[];
  }) => Promise<void>;
  deleteGranularRole: ({
    roleZUID,
    resourceZUIDs,
  }: {
    roleZUID: string;
    resourceZUIDs: string[];
  }) => Promise<void>;
};

export const useRoles = create<RolesState & RolesAction>((set) => ({
  usersWithRoles: [],
  getUsersWithRoles: async (instanceZUID) => {
    const response = await ZestyAPI.getInstanceUsersWithRoles(instanceZUID);

    if (response.error) {
      console.error('getUsersWithRoles error: ', response.error);
      throw new Error(response.error);
    } else {
      set({ usersWithRoles: response.data });
      return response.data;
    }
  },
  updateUserRole: async (data) => {
    if (!data?.length) return;

    Promise.all([
      data?.forEach(({ userZUID, oldRoleZUID, newRoleZUID }) =>
        ZestyAPI.updateUserRole(userZUID, oldRoleZUID, newRoleZUID),
      ),
    ])
      .then((response) => response)
      .catch((error) => {
        console.error('updateUserRole error: ', error);
        throw new Error(error);
      });
  },

  baseRoles: [],
  customRoles: [],
  getRoles: async (instanceZUID) => {
    const response = await ZestyAPI.getInstanceRoles(instanceZUID);

    if (response.error) {
      console.error('getRoles error: ', response.error);
      throw new Error(response.error);
    } else {
      const _baseRoles: RoleWithSort[] = [];
      const _customRoles: Role[] = [];

      // Separate base roles from custom roles
      response.data?.forEach((role: Role) => {
        if (role.static) {
          _baseRoles.push({
            ...role,
            sort: BASE_ROLE_SORT_ORDER.findIndex(
              (systemRoleZUID) => systemRoleZUID === role.systemRoleZUID,
            ),
          });
        } else {
          _customRoles.push(role);
        }
      });

      set({
        baseRoles: _baseRoles.sort((a, b) => a.sort - b.sort),
        customRoles: _customRoles,
      });
    }
  },
  createRole: async ({ name, description, systemRoleZUID, instanceZUID }) => {
    if (!name && !systemRoleZUID) return;

    const res = await ZestyAPI.createRole(
      name,
      instanceZUID,
      systemRoleZUID,
      description,
    );

    if (res.error) {
      console.error('Failed to create role: ', res.error);
      throw new Error(res.error);
    } else {
      return res.data;
    }
  },
  updateRole: async ({ roleZUID, name, description, systemRoleZUID }) => {
    if (!roleZUID || !name) return;

    const res = await ZestyAPI.updateRole(roleZUID, {
      name,
      description,
      systemRoleZUID,
    });

    if (res.error) {
      console.error('Failed to update role: ', res.error);
      throw new Error(res.error);
    } else {
      return res.data;
    }
  },
  deleteRole: async ({ roleZUIDToDelete, roleZUIDToTransferUsers }) => {
    if (!roleZUIDToDelete || !roleZUIDToTransferUsers) return;

    // Transfer the existing users to a new role
    const transferResponse = await ZestyAPI.bulkReassignUsersRole({
      oldRoleZUID: roleZUIDToDelete,
      newRoleZUID: roleZUIDToTransferUsers,
    });

    if (transferResponse.error) {
      console.error('Failed to reassign users role: ', transferResponse.error);
      throw new Error(transferResponse.error);
    } else {
      // Once users have been reassigned, delete the role
      const deleteRoleResponse = await ZestyAPI.deleteRole(roleZUIDToDelete);

      if (deleteRoleResponse.error) {
        console.error(
          `Failed to delete role ${roleZUIDToDelete}: `,
          transferResponse.error,
        );
        throw new Error(transferResponse.error);
      } else {
        return deleteRoleResponse.data;
      }
    }
  },

  createGranularRole: async ({ roleZUID, data }) => {
    if (!roleZUID || !data || !Object.keys(data)?.length) return;

    const res = await ZestyAPI.createGranularRole(
      roleZUID,
      data.resourceZUID,
      data.create,
      data.read,
      data.update,
      data.delete,
      data.publish,
    );

    if (res.error) {
      console.error('Failed to update role: ', res.error);
      throw new Error(res.error);
    } else {
      return res.data;
    }
  },
  updateGranularRole: async ({ roleZUID, granularRoles }) => {
    if (!roleZUID || !granularRoles) return;

    const res = await ZestyAPI.batchUpdateGranularRoles(
      roleZUID,
      granularRoles,
    );

    if (res.error) {
      console.error('Failed to update granular role: ', res.error);
      throw new Error(res.error);
    } else {
      return res.data;
    }
  },
  deleteGranularRole: async ({ roleZUID, resourceZUIDs }) => {
    if (!roleZUID || !resourceZUIDs || !resourceZUIDs?.length) return;

    Promise.all([
      resourceZUIDs.forEach((zuid) =>
        ZestyAPI.deleteGranularRole(roleZUID, zuid),
      ),
    ])
      .then((res) => {
        console.log('delete response', res);
        return res;
      })
      .catch((err) => {
        console.error('Failed to delete granular role: ', err);
        throw new Error(err);
      });
  },
}));
