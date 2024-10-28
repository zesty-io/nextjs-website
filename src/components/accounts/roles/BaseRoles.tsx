import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from '@mui/material';
import {
  AdminPanelSettingsRounded,
  CodeRounded,
  RecommendRounded,
  BorderColorRounded,
  PublicRounded,
} from '@mui/icons-material';
import { Role } from 'store/types';

const BASE_ROLES_CONFIG = Object.freeze({
  owner: {
    name: 'Owner',
    description:
      'Full access to all sections: Content, Schema, Media, Code, Leads, Redirects, Reports, Apps, and Settings. In Accounts they have full access as well which includes the ability to: launch instances, add domains, invite new users and set their roles, add a team, and create tokens.',
    avatar: (
      <Avatar sx={{ bgcolor: 'deepOrange.100' }}>
        <AdminPanelSettingsRounded color="primary" />
      </Avatar>
    ),
  },
  admin: {
    name: 'Admin',
    description:
      'Have the same privileges as the Owner role except for deleting other users.',
    avatar: (
      <Avatar sx={{ bgcolor: 'success.light' }}>
        <AdminPanelSettingsRounded
          sx={{ fill: (theme) => theme.palette.success.dark }}
        />
      </Avatar>
    ),
  },
  'access admin': {
    name: 'Access Admin',
    description:
      'Have the same privileges as Admins, except they cannot create, update, delete, or publish content.',
    avatar: (
      <Avatar sx={{ bgcolor: 'pink.100' }}>
        <AdminPanelSettingsRounded
          sx={{ fill: (theme) => theme.palette.pink[600] }}
        />
      </Avatar>
    ),
  },
  developer: {
    name: 'Developer',
    description:
      'Access to Content, Schema, Media, Code, Leads, Redirects, Reports, Apps, and Setting section.',
    avatar: (
      <Avatar sx={{ bgcolor: 'blue.100' }}>
        <CodeRounded sx={{ fill: (theme) => theme.palette.blue[500] }} />
      </Avatar>
    ),
  },
  'developer contributor': {
    name: 'Developer Contributor',
    description:
      'Have the same privileges as Developers except they cannot delete or publish content.',
    avatar: (
      <Avatar sx={{ bgcolor: 'yellow.50' }}>
        <CodeRounded sx={{ fill: (theme) => theme.palette.yellow[500] }} />
      </Avatar>
    ),
  },
  seo: {
    name: 'SEO',
    description:
      'Access to Content, Media, Leads, Redirects, Reports, and Apps section.',
    avatar: (
      <Avatar sx={{ bgcolor: 'purple.100' }}>
        <RecommendRounded sx={{ fill: (theme) => theme.palette.purple[600] }} />
      </Avatar>
    ),
  },
  publisher: {
    name: 'Publisher',
    description: 'Access to Content, Media, Leads, Reports, and Apps section.',
    avatar: (
      <Avatar sx={{ bgcolor: 'pink.100' }}>
        <PublicRounded sx={{ fill: (theme) => theme.palette.pink[600] }} />
      </Avatar>
    ),
  },
  contributor: {
    name: 'Contributor',
    description: 'Access to Content, Media, and Apps section.',
    avatar: (
      <Avatar sx={{ bgcolor: 'yellow.50' }}>
        <BorderColorRounded
          sx={{ fill: (theme) => theme.palette.yellow[500] }}
        />
      </Avatar>
    ),
  },
});

type BaseRolesProps = {
  baseRoles: Role[];
};
export const BaseRoles = ({ baseRoles }: BaseRolesProps) => {
  return (
    <Box>
      <Typography variant="h5" fontWeight={700} mb={2}>
        Base Roles
      </Typography>
      <List sx={{ p: 0 }}>
        {baseRoles?.map((role, index) => (
          <ListItem
            key={role.ZUID}
            sx={{
              p: 2,
              border: (theme) => `1px solid ${theme.palette.border}`,
              borderRadius: 2,
              mb: index + 1 < baseRoles?.length ? 1 : 0,
            }}
          >
            <ListItemAvatar>
              {BASE_ROLES_CONFIG[role.name.toLowerCase()]?.avatar}
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography variant="h6" fontWeight={700} color="text.primary">
                  {BASE_ROLES_CONFIG[role.name.toLowerCase()]?.name}
                </Typography>
              }
              secondary={
                <Typography variant="body2" color="text.secondary">
                  {BASE_ROLES_CONFIG[role.name.toLowerCase()]?.description}
                </Typography>
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
