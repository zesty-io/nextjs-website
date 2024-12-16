import { Box, Stack, Typography, Checkbox, Button } from '@mui/material';
import { Check } from '@mui/icons-material';
import dynamic from 'next/dynamic';
import { useMemo, useReducer } from 'react';

import { NewGranularRole } from './index';
import { ResourceSelector } from './ResourceSelector';
import { GranularRole } from 'store/types';

const DataGrid = dynamic(() =>
  import('@mui/x-data-grid').then((e) => e.DataGrid),
);

type AddRuleProps = {
  onAddRuleClick: (data: NewGranularRole) => void;
  onCancel: () => void;
  granularRoles: Partial<GranularRole>[];
};
export const AddRule = ({
  onAddRuleClick,
  onCancel,
  granularRoles,
}: AddRuleProps) => {
  const [ruleData, updateRuleData] = useReducer(
    (state: NewGranularRole, data: Partial<NewGranularRole>) => {
      return {
        ...state,
        ...data,
      };
    },
    {
      resourceZUID: '',
      create: false,
      read: false,
      update: false,
      delete: false,
      publish: false,
    },
  );

  const resourcesToFilter = granularRoles?.map((role) => role.resourceZUID);

  const COLUMNS = useMemo(
    () => [
      {
        field: 'resourceZUID',
        headerName: 'Resource Name',
        width: 380,
        sortable: false,
        renderCell: () => (
          <ResourceSelector
            onChange={(zuid) =>
              updateRuleData({
                resourceZUID: zuid,
              })
            }
            resourcesToFilter={resourcesToFilter}
          />
        ),
      },
      {
        field: 'create',
        headerName: 'Create',
        sortable: false,
        renderCell: () => (
          <Checkbox
            onChange={(evt) => updateRuleData({ create: evt.target.checked })}
          />
        ),
      },
      {
        field: 'read',
        headerName: 'Read',
        sortable: false,
        renderCell: () => (
          <Checkbox
            onChange={(evt) => updateRuleData({ read: evt.target.checked })}
          />
        ),
      },
      {
        field: 'update',
        headerName: 'Update',
        sortable: false,
        renderCell: () => (
          <Checkbox
            onChange={(evt) => updateRuleData({ update: evt.target.checked })}
          />
        ),
      },
      {
        field: 'delete',
        headerName: 'Delete',
        sortable: false,
        renderCell: () => (
          <Checkbox
            onChange={(evt) => updateRuleData({ delete: evt.target.checked })}
          />
        ),
      },
      {
        field: 'publish',
        headerName: 'Publish',
        sortable: false,
        renderCell: () => (
          <Checkbox
            onChange={(evt) => updateRuleData({ publish: evt.target.checked })}
          />
        ),
      },
    ],
    [],
  );
  const ROWS = useMemo(
    () => [
      {
        id: 1,
        resourceZUID: '',
        create: false,
        read: false,
        update: false,
        delete: false,
        publish: false,
      },
    ],
    [],
  );

  return (
    <Box
      p={2.5}
      bgcolor="background.paper"
      border={1}
      borderColor="border"
      borderRadius={2}
    >
      <Typography variant="h5" fontWeight={700}>
        Add Rule
      </Typography>
      <Typography
        variant="body3"
        fontWeight={600}
        color="text.secondary"
        mb={2}
      >
        Assign specific permissions (create, read, update, delete, publish) for
        the items of any model
      </Typography>
      <DataGrid
        columns={COLUMNS}
        rows={ROWS}
        disableColumnMenu
        disableRowSelectionOnClick
        hideFooter
        sx={{
          width: 882,

          '& .MuiDataGrid-columnHeaders': {
            borderBottom: 0,

            '&:hover .MuiDataGrid-columnSeparator': {
              visibility: 'hidden',
            },
          },

          '& .MuiDataGrid-cell': {
            borderBottom: 0,

            '&:focus-within': {
              outline: 'none',
            },
          },

          '& .MuiDataGrid-columnHeader:focus-within': {
            outline: 'none',
          },
        }}
      />
      <Stack direction="row" gap={2} pt={2} justifyContent="flex-end">
        <Button variant="outlined" color="inherit" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          variant="contained"
          startIcon={<Check />}
          onClick={() => onAddRuleClick(ruleData)}
          disabled={!ruleData.resourceZUID}
        >
          Done
        </Button>
      </Stack>
    </Box>
  );
};
