import { forwardRef, useState, useImperativeHandle } from 'react';
import {
  List,
  ListItemButton,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
} from '@mui/material';
import {
  LocalPoliceOutlined,
  MoreHorizRounded,
  EditRounded,
  DeleteRounded,
} from '@mui/icons-material';

import {
  EditCustomRoleDialog,
  TabNames,
  TabName,
} from './EditCustomRoleDialog';
import { DeleteCustomRoleDialog } from './DeleteCustomRoleDialog';
import { Role } from 'store/types';

type CustomRolesProps = {
  customRoles: Role[];
};
export const CustomRoles = forwardRef(
  ({ customRoles }: CustomRolesProps, ref) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [ZUIDToEdit, setZUIDToEdit] = useState<string>(null);
    const [ZUIDToDelete, setZUIDToDelete] = useState<string>(null);
    const [activeZUID, setActiveZUID] = useState<string>(null);
    const [tabToOpen, setTabToOpen] = useState<TabName>(TabNames.details);

    useImperativeHandle(ref, () => ({
      updateZUIDToEdit: (ZUID: string) => {
        setZUIDToEdit(ZUID);
        setTabToOpen(TabNames.permissions);
      },
    }));

    return (
      <>
        <Box>
          <Typography variant="h5" fontWeight={700} mb={2}>
            Custom Roles
          </Typography>
          <List sx={{ p: 0 }}>
            {customRoles?.map((role, index) => (
              <Box key={role.ZUID}>
                <ListItemButton
                  disableRipple
                  key={role.ZUID}
                  sx={{
                    p: 2,
                    border: (theme) => `1px solid ${theme.palette.border}`,
                    borderRadius: 2,
                    mb: index + 1 < customRoles?.length ? 2 : 0,
                  }}
                  onClick={() => {
                    setZUIDToEdit(role.ZUID);
                    setTabToOpen(TabNames.details);
                  }}
                >
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: 'blue.100' }}>
                      <LocalPoliceOutlined color="info" />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography
                        variant="h6"
                        fontWeight={700}
                        color="text.primary"
                      >
                        {role.name}
                      </Typography>
                    }
                    secondary={
                      <Typography variant="body2" color="text.secondary">
                        {role.description || ''}
                      </Typography>
                    }
                    sx={{
                      my: 0,
                    }}
                  />
                  <IconButton
                    size="small"
                    onClick={(evt) => {
                      evt.stopPropagation();
                      setAnchorEl(evt.currentTarget);
                      setActiveZUID(role.ZUID);
                    }}
                  >
                    <MoreHorizRounded fontSize="small" />
                  </IconButton>
                </ListItemButton>
                <Menu
                  anchorEl={anchorEl}
                  open={!!anchorEl && role.ZUID === activeZUID}
                  onClose={() => setAnchorEl(null)}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                >
                  <MenuItem
                    onClick={() => {
                      setAnchorEl(null);
                      setZUIDToEdit(role.ZUID);
                      setTabToOpen(TabNames.details);
                    }}
                  >
                    <ListItemIcon>
                      <EditRounded />
                    </ListItemIcon>
                    <ListItemText>Edit</ListItemText>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setAnchorEl(null);
                      setZUIDToDelete(role.ZUID);
                    }}
                  >
                    <ListItemIcon>
                      <DeleteRounded />
                    </ListItemIcon>
                    <ListItemText>Delete</ListItemText>
                  </MenuItem>
                </Menu>
              </Box>
            ))}
          </List>
        </Box>
        {!!ZUIDToEdit && (
          <EditCustomRoleDialog
            ZUID={ZUIDToEdit}
            onClose={() => setZUIDToEdit(null)}
            tabToOpen={tabToOpen}
          />
        )}
        {!!ZUIDToDelete && (
          <DeleteCustomRoleDialog
            ZUID={ZUIDToDelete}
            onClose={() => setZUIDToDelete(null)}
          />
        )}
      </>
    );
  },
);
