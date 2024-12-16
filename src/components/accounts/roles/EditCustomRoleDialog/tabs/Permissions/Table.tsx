import { useMemo } from 'react';
import dynamic from 'next/dynamic';
import { Checkbox, Typography, IconButton, Tooltip } from '@mui/material';
import { Database } from '@zesty-io/material';
import { EditRounded, InfoRounded, DeleteRounded } from '@mui/icons-material';
import { GridRenderCellParams, GridValueGetterParams } from '@mui/x-data-grid';

import { GranularRoleWithResourceName, UpdateGranularRole } from './index';
import { useInstance } from 'store/instance';

const DataGrid = dynamic(() =>
  import('@mui/x-data-grid').then((e) => e.DataGrid),
);

type TableProps = {
  granularRoles: Partial<GranularRoleWithResourceName>[];
  onDataChange: (roleData: UpdateGranularRole) => void;
  onDelete: (resourceZUID: string) => void;
};
export const Table = ({
  granularRoles,
  onDataChange,
  onDelete,
}: TableProps) => {
  const { instanceModels, instanceContentItems } = useInstance(
    (state) => state,
  );

  const COLUMNS = useMemo(
    () => [
      {
        field: 'resourceName',
        headerName: 'Resource Name',
        width: 300,
        sortable: false,
        renderCell: (params: GridValueGetterParams) => (
          <>
            {params.row.id?.startsWith('6-') ? (
              <Database fontSize="small" color="action" />
            ) : (
              <EditRounded fontSize="small" color="action" />
            )}
            <Typography variant="body2" pl={1.5} fontWeight={600}>
              {params.value}
            </Typography>
          </>
        ),
      },
      {
        field: 'create',
        headerName: 'Create',
        sortable: false,
        renderCell: (params: GridRenderCellParams) => (
          <Checkbox
            defaultChecked={!!params.value}
            onChange={(evt) =>
              onDataChange({
                resourceZUID: params.row?.id,
                create: evt.target.checked,
              })
            }
          />
        ),
      },
      {
        field: 'read',
        headerName: 'Read',
        sortable: false,
        renderCell: (params: GridRenderCellParams) => (
          <Checkbox
            defaultChecked={!!params.value}
            onChange={(evt) =>
              onDataChange({
                resourceZUID: params.row?.id,
                read: evt.target.checked,
              })
            }
          />
        ),
      },
      {
        field: 'update',
        headerName: 'Update',
        sortable: false,
        renderCell: (params: GridRenderCellParams) => (
          <Checkbox
            defaultChecked={!!params.value}
            onChange={(evt) =>
              onDataChange({
                resourceZUID: params.row?.id,
                update: evt.target.checked,
              })
            }
          />
        ),
      },
      {
        field: 'delete',
        headerName: 'Delete',
        sortable: false,
        renderCell: (params: GridRenderCellParams) => (
          <Checkbox
            defaultChecked={!!params.value}
            onChange={(evt) =>
              onDataChange({
                resourceZUID: params.row?.id,
                delete: evt.target.checked,
              })
            }
          />
        ),
      },
      {
        field: 'publish',
        headerName: 'Publish',
        sortable: false,
        renderCell: (params: GridRenderCellParams) => (
          <Checkbox
            defaultChecked={!!params.value}
            onChange={(evt) =>
              onDataChange({
                resourceZUID: params.row?.id,
                publish: evt.target.checked,
              })
            }
          />
        ),
      },
      {
        field: 'actions',
        headerName: '',
        sortable: false,
        renderCell: (params: GridRenderCellParams) => {
          const title = `Name: ${params.row?.resourceName} \n ${
            params.value?.startsWith('6-')
              ? 'Model'
              : !!params.value?.startsWith('7-')
              ? 'Item'
              : ''
          } ZUID: ${params.value}`;

          return (
            <>
              <Tooltip
                placement="right"
                title={title}
                disableInteractive
                slotProps={{
                  tooltip: {
                    sx: {
                      whiteSpace: 'pre-line',
                    },
                  },
                }}
              >
                <InfoRounded color="action" fontSize="small" />
              </Tooltip>
              <IconButton
                size="small"
                sx={{ ml: 2 }}
                onClick={() => onDelete(params.value)}
              >
                <DeleteRounded fontSize="small" />
              </IconButton>
            </>
          );
        },
      },
    ],
    [instanceModels, instanceContentItems],
  );
  const rows = granularRoles?.map((role) => {
    return {
      id: role.resourceZUID,
      resourceName: role.resourceName,
      create: role.create,
      read: role.read,
      update: role.update,
      delete: role.delete,
      publish: role.publish,
      actions: role.resourceZUID,
    };
  });

  return (
    <DataGrid
      columns={COLUMNS}
      rows={rows}
      disableColumnMenu
      disableRowSelectionOnClick
      hideFooter
      sx={{
        '& .MuiDataGrid-columnHeaders': {
          borderBottom: 0,

          '&:hover .MuiDataGrid-columnSeparator': {
            visibility: 'hidden',
          },
        },

        '& .MuiDataGrid-cell': {
          '&:focus-within': {
            outline: 'none',
          },
        },

        '& .MuiDataGrid-columnHeader:focus-within': {
          outline: 'none',
        },

        '& .MuiDataGrid-row': {
          bgcolor: 'background.paper',
        },
      }}
    />
  );
};
