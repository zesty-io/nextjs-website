import { useMemo } from 'react';
import {
  Stack,
  Box,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
} from '@mui/material';

import { hashMD5 } from 'utils/Md5Hash';
import shield from '../../../public/assets/images/shield.svg';

export const NoPermission = ({ users }) => {
  const ownersAndAdmins = useMemo(() => {
    if (!users && !users?.length) return [];

    const owners = users
      .filter((user) => user.role?.name?.toLowerCase() === 'owner')
      .sort((a, b) => a.firstName.localeCompare(b.firstName));
    const admins = users
      .filter((user) => user.role?.name?.toLowerCase() === 'admin')
      .sort((a, b) => a.firstName.localeCompare(b.firstName));

    return [...owners, ...admins];
  }, [users]);

  return (
    <Stack direction="row" gap={17.5} alignItems="flex-start" py={4}>
      <Box maxWidth={540}>
        <Typography variant="h3" fontWeight={700} mb={1}>
          You need permission to view and edit Roles & Permissions
        </Typography>
        <Typography variant="body2" mb={3} color="text.secondary">
          Contact the instance owner or administrators listed below to upgrade
          your role to Admin or Owner for this capability.
        </Typography>
        <List>
          {ownersAndAdmins?.map((user) => (
            <ListItem
              key={user.ZUID}
              dense
              disableGutters
              sx={{
                borderBottom: '1px solid',
                borderColor: 'border',
              }}
            >
              <ListItemAvatar>
                <Avatar
                  alt={`${user.firstName} ${user.lastName}`}
                  src={`https://www.gravatar.com/avatar/${hashMD5(
                    user.email || '',
                  )}?s=40`}
                />
              </ListItemAvatar>
              <ListItemText
                primary={`${user.firstName} ${user.lastName}`}
                primaryTypographyProps={{
                  sx: {
                    color: 'text.primary',
                  },
                }}
                secondary={`${user.role.name} • ${user.email}`}
              />
            </ListItem>
          ))}
        </List>
      </Box>
      <Box
        component="img"
        src={shield?.src}
        alt={shield?.title}
        loading="lazy"
      />
    </Stack>
  );
};
