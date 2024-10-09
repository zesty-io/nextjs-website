import { useReducer } from 'react';
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
  MonitorHeartRounded,
  HistoryRounded,
  SettingsRounded,
} from '@mui/icons-material';
import { Database } from '@zesty-io/material';

import { useZestyStore } from 'store';

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
      schema: true,
      media: true,
      code: true,
      leads: true,
      analytics: true,
      health: true,
      activityLog: true,
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
      schema: true,
      media: true,
      code: true,
      leads: true,
      analytics: true,
      health: true,
      activityLog: true,
      settings: true,
    },
  },
  '31-71cfc74-4cc4dm13': {
    actions: {
      create: true,
      read: true,
      update: false,
      delete: false,
      publish: false,
      grant: true,
      super: true,
    },
    products: {
      content: true,
      schema: true,
      media: true,
      code: true,
      leads: true,
      analytics: true,
      health: true,
      activityLog: true,
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
      schema: true,
      media: true,
      code: true,
      leads: true,
      analytics: false,
      health: true,
      activityLog: false,
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
      schema: true,
      media: true,
      code: true,
      leads: true,
      analytics: false,
      health: true,
      activityLog: false,
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
      schema: false,
      media: true,
      code: false,
      leads: true,
      analytics: false,
      health: false,
      activityLog: false,
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
      schema: true,
      media: true,
      code: true,
      leads: true,
      analytics: true,
      health: true,
      activityLog: true,
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
      schema: false,
      media: true,
      code: false,
      leads: true,
      analytics: false,
      health: true,
      activityLog: false,
      settings: false,
    },
  },
});
export const PRODUCT_DETAILS = Object.freeze({
  content: {
    name: 'Content',
    icon: <EditRounded color="action" sx={{ fontSize: 16 }} />,
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
  health: {
    name: 'Health',
    icon: <MonitorHeartRounded color="action" sx={{ fontSize: 16 }} />,
  },
  activityLog: {
    name: 'Activity Log',
    icon: <HistoryRounded color="action" sx={{ fontSize: 16 }} />,
  },
  settings: {
    name: 'Settings',
    icon: <SettingsRounded color="action" sx={{ fontSize: 16 }} />,
  },
});
export const BASE_ROLE_OPTIONS = Object.freeze([
  {
    value: '31-71cfc74-0wn3r',
    label: 'Owner',
  },
  {
    value: '31-71cfc74-4dm13',
    label: 'Admin',
  },
  {
    value: '31-71cfc74-4cc4dm13',
    label: 'Access Admin',
  },
  {
    value: '31-71cfc74-d3v3l0p3r',
    label: 'Developer',
  },
  {
    value: '31-71cfc74-d3vc0n',
    label: 'Developer Contributor',
  },
  {
    value: '31-71cfc74-p0bl1shr',
    label: 'Publisher',
  },
  {
    value: '31-71cfc74-s30',
    label: 'SEO',
  },
  {
    value: '31-71cfc74-c0ntr1b0t0r',
    label: 'Contributor',
  },
]);

export const CreateCustomRoleDialog = ({ onClose }) => {
  const { instance } = useZestyStore((state) => state);

  const [fieldData, updateFieldData] = useReducer(
    (state, data) => {
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
            value={BASE_ROLE_OPTIONS.find(
              (role) => role.value === fieldData.systemRoleZUID,
            )}
            onChange={(_, value) =>
              updateFieldData({ systemRoleZUID: value.value })
            }
            options={BASE_ROLE_OPTIONS}
            renderInput={(params) => <TextField {...params} />}
          />
        </Box>
        <Box>
          <Typography variant="body2" fontWeight={700} mb={1.5}>
            {instance?.name} Base Permissions
          </Typography>
          <Stack direction="row">
            {Object.entries(
              BASE_ROLE_PERMISSIONS[fieldData.systemRoleZUID]?.actions || {},
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
        <Button variant="outlined" color="inherit" onClick={() => onClose?.()}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => console.log('create custom role')}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};
