import { useMemo } from 'react';
import {
  Typography,
  Stack,
  Box,
  TextField,
  Autocomplete,
  InputLabel,
  Tooltip,
} from '@mui/material';
import { Close, InfoRounded, Check } from '@mui/icons-material';

import { useZestyStore } from 'store';
import {
  BASE_ROLE_PERMISSIONS,
  PRODUCT_DETAILS,
} from '../../CreateCustomRoleDialog';
import { RoleDetails } from '../index';
import { useRoles } from 'store/roles';

type DetailsProps = {
  data: RoleDetails;
  onUpdateData: (data: Partial<RoleDetails>) => void;
  errors: {
    roleName: string;
    roleDescription: string;
  };
};
export const Details = ({ data, onUpdateData, errors }: DetailsProps) => {
  const { instance } = useZestyStore((state) => state);
  const { baseRoles } = useRoles((state) => state);

  const baseRoleOptions = useMemo(() => {
    if (!baseRoles?.length) return [];

    return baseRoles?.map((role) => ({
      label: role.name,
      value: role.systemRoleZUID,
    }));
  }, [baseRoles]);

  return (
    <Stack gap={2.5}>
      <Box>
        <Stack direction="row" alignItems="center" gap={1} mb={0.5}>
          <InputLabel sx={{ mb: 0 }}>Role Name *</InputLabel>
          <Tooltip title="Lorem Ipsum" placement="right">
            <InfoRounded color="action" sx={{ fontSize: 12 }} />
          </Tooltip>
        </Stack>
        <TextField
          value={data?.name}
          onChange={(evt) => onUpdateData({ name: evt.target.value })}
          placeholder="e.g. Lawyer"
          fullWidth
          error={!!errors?.roleName}
          helperText={errors?.roleName}
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
          value={data?.description}
          onChange={(evt) => onUpdateData({ description: evt.target.value })}
          placeholder="What is this role going to be used for"
          multiline
          fullWidth
          rows={4}
          error={!!errors?.roleDescription}
          helperText={errors?.roleDescription}
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
            (role) => role.value === data?.systemRoleZUID,
          )}
          onChange={(_, value) => onUpdateData({ systemRoleZUID: value.value })}
          options={baseRoleOptions}
          renderInput={(params) => <TextField {...params} />}
        />
      </Box>
      <Box>
        <Typography variant="body2" fontWeight={700} mb={1.5}>
          {instance?.name} Base Permissions
        </Typography>
        <Stack direction="row">
          {Object.entries(
            BASE_ROLE_PERMISSIONS[data?.systemRoleZUID]?.actions || {},
          )?.map(([name, permission]) => (
            <Stack width={80} gap={0.5}>
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
              BASE_ROLE_PERMISSIONS[data?.systemRoleZUID]?.products || {},
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
            {data?.systemRoleZUID === '31-71cfc74-0wn3r'
              ? 'Can delete users'
              : 'Cannot delete other users'}
          </Typography>
        </Box>
      </Box>
    </Stack>
  );
};
