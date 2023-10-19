import * as React from 'react';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Box, TablePagination, Typography } from '@mui/material';
import { LoadingSpinner } from '../loading';
import { StickyTable } from './StickyTable';
import { NoData } from './NoData';

const collapsColumns = [
  {
    id: 'name',
    label: 'Name',
  },
  {
    id: 'email',
    label: 'email',
  },
  {
    id: 'role',
    label: 'Role',
  },
];

function Row({ row, instanceUserWithRoles }) {
  const [open, setOpen] = React.useState(false);
  const [teamMembers, setteamMembers] = React.useState([]);

  const handleClick = async (e) => {
    if (!open) {
      setOpen(true);
      const res = instanceUserWithRoles.filter((x) => x.teamZUID === e.zuid);
      setteamMembers(res);
    } else {
      setOpen(false);
    }
  };

  const collapseRows = teamMembers?.map((e) => {
    return {
      name: `${e.firstName} ${e.lastName}` || '-',
      email: e.email || '-',
      role: e.role?.name || '-',
    };
  });

  return (
    <React.Fragment>
      <TableRow
        sx={{
          '& > *': { borderBottom: 'unset' },
        }}
      >
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => handleClick(row)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{row.name}</TableCell>
        <TableCell align="left">{row.description}</TableCell>
        <TableCell align="left">{row.zuid}</TableCell>
        <TableCell align="right">{row.action}</TableCell>
      </TableRow>
      {open && (
        <TableRow>
          <TableCell style={{ padding: '1.5rem 4rem' }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <StickyTable
                title={'Team Members'}
                loading={false}
                rows={collapseRows}
                columns={collapsColumns}
              />
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </React.Fragment>
  );
}

export const CollapseTable = ({
  rows,
  columns,
  pagination = true,
  perPage = 10,
  loading = false,
  title = '',
  instanceUserWithRoles = [],
  cta,
}) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(perPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  React.useEffect(() => {
    setPage(0);
  }, [rows]);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if (loading) {
    return <LoadingSpinner />;
  }
  if (rows.length === 0) {
    return <NoData columns={columns} header={'No Teams Added'} cta={cta} />;
  }

  if (rows.length < 10) {
    pagination = false;
  }

  const showTable = rows.length === 0 ? false : true;
  return (
    <Box paddingY={2} display={showTable ? 'block' : 'none'}>
      <Box paddingY={0}>
        <Typography variant="h5">{title}</Typography>
      </Box>
      <Paper>
        <TableContainer>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                {columns?.map((e) => {
                  return (
                    <TableCell
                      width={'3rem'}
                      align="left"
                      sx={{
                        fontWeight: 'bold',
                        textTransform: 'capitalize',
                        fontSize: '14px',
                      }}
                    >
                      {e.label}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <Row
                  key={row.name}
                  row={row}
                  instanceUserWithRoles={instanceUserWithRoles}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {pagination && (
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        )}
      </Paper>
    </Box>
  );
};
