import { useMemo, useState } from 'react';
import {
  Avatar,
  Box,
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  InputLabel,
  Autocomplete,
} from '@mui/material';
import { DeleteRounded } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { useRouter } from 'next/router';

import { useRoles } from 'store/roles';
import { ErrorMsg } from '../ui';

type DeleteCustomRoleDialogProps = {
  ZUID: string;
  onClose: () => void;
};
export const DeleteCustomRoleDialog = ({
  ZUID,
  onClose,
}: DeleteCustomRoleDialogProps) => {
  const router = useRouter();
  const { customRoles, baseRoles, deleteRole, getUsersWithRoles, getRoles } =
    useRoles((state) => state);
  const [isDeleting, setIsDeleting] = useState(false);

  const roleData = useMemo(() => {
    return customRoles?.find((role) => role.ZUID === ZUID);
  }, [ZUID, customRoles]);

  const roleOptions = useMemo(() => {
    const customRolesOpts = customRoles
      ?.filter((role) => role.ZUID !== ZUID)
      ?.map((role) => ({
        label: role.name,
        value: role.ZUID,
      }));
    const baseRolesOpts = baseRoles?.map((role) => ({
      label: role.name,
      value: role.ZUID,
    }));

    return [...customRolesOpts, ...baseRolesOpts]?.sort(
      (a, b) => a.label?.localeCompare(b.label),
    );
  }, [customRoles, baseRoles]);

  const defaultBaseRole = baseRoles?.find(
    (role) => role.systemRoleZUID === roleData?.systemRoleZUID,
  );

  const [selectedTransferRole, setSelectedTransferRole] = useState<{
    label: string;
    value: string;
  }>({
    label: defaultBaseRole?.name,
    value: defaultBaseRole?.ZUID,
  });

  const { zuid: instanceZUID } = router.query;

  const handleConfirmDelete = () => {
    setIsDeleting(true);
    deleteRole({
      roleZUIDToDelete: ZUID,
      roleZUIDToTransferUsers: selectedTransferRole?.value,
    })
      .catch(() => ErrorMsg({ title: 'Failed to delete role' }))
      .finally(() => {
        setIsDeleting(false);
        getRoles(String(instanceZUID));
        getUsersWithRoles(String(instanceZUID));
        onClose();
      });
  };

  return (
    <Dialog
      open
      onClose={() => onClose?.()}
      PaperProps={{ sx: { width: 480 } }}
    >
      <Box p={2.5} boxSizing="border-box">
        <Avatar sx={{ bgcolor: 'red.100' }}>
          <DeleteRounded color="error" />
        </Avatar>
        <Typography variant="h5" fontWeight={700} mt={1.5} mb={1}>
          Delete Custom Role:{' '}
          <Box component="span" fontWeight={400}>
            {roleData?.name || ''}
          </Box>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          This role and its permissions will be immediately deactivated. <br />
          Please reassign users currently assigned to this role to a new role.
        </Typography>
      </Box>
      <DialogContent>
        <InputLabel>Role to reassign users to</InputLabel>
        <Autocomplete
          disableClearable
          value={selectedTransferRole}
          options={roleOptions}
          onChange={(_, value) => setSelectedTransferRole(value)}
          renderInput={(params) => <TextField {...params} />}
        />
      </DialogContent>
      <DialogActions>
        <Button variant="text" color="inherit" onClick={() => onClose?.()}>
          Cancel
        </Button>
        <LoadingButton
          loading={isDeleting}
          variant="contained"
          color="error"
          onClick={handleConfirmDelete}
        >
          Delete Custom Role
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};
