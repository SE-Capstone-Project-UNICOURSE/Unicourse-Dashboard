import Iconify from '@app/components/iconify/Iconify';
import { Scrollbar } from '@components/scrollbar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import Typography from '@mui/material/Typography';
import { useState } from 'react';

import DashboardContent from '@app/features/dashboard/layouts/DashboardLayout/DashboardContent';
import { applyFilter, emptyRows, getComparator } from '../utils';
import { TableEmptyRows } from './components/TableEmptyRows';
import { TableNoData } from './components/TableNoData';
import { UserTableHead } from './components/UserTableHead';
import type { UserProps } from './components/UserTableRow';
import { UserTableRow } from './components/UserTableRow';
import { UserTableToolbar } from './components/UserTableToolbar';
import { useUserTable } from './useUserTable';

const _users = [
  {
    id: '1',
    name: 'John Doe',
    company: 'Tech Solutions',
    role: 'Admin',
    isVerified: true,
    status: 'active',
    avatarUrl: 'https://via.placeholder.com/150', // Thêm avatarUrl
  },
  {
    id: '2',
    name: 'Jane Smith',
    company: 'Innovative Inc.',
    role: 'User',
    isVerified: false,
    status: 'pending',
    avatarUrl: 'https://via.placeholder.com/150', // Thêm avatarUrl
  },
  {
    id: '3',
    name: 'Alice Johnson',
    company: 'Acme Corp',
    role: 'Manager',
    isVerified: true,
    status: 'inactive',
    avatarUrl: 'https://via.placeholder.com/150', // Thêm avatarUrl
  },
  {
    id: '4',
    name: 'Bob Williams',
    company: 'Creative Agency',
    role: 'User',
    isVerified: false,
    status: 'active',
    avatarUrl: 'https://via.placeholder.com/150', // Thêm avatarUrl
  },
  {
    id: '5',
    name: 'Charlie Brown',
    company: 'StartUp X',
    role: 'Admin',
    isVerified: true,
    status: 'pending',
    avatarUrl: 'https://via.placeholder.com/150', // Thêm avatarUrl
  },
];

export function UserView() {
  const table = useUserTable();

  const [filterName, setFilterName] = useState('');

  const dataFiltered: UserProps[] = applyFilter({
    inputData: _users,
    comparator: getComparator(table.order, table.orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <DashboardContent>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          Users
        </Typography>
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="mingcute:add-line" />}
        >
          New user
        </Button>
      </Box>

      <Card>
        <UserTableToolbar
          numSelected={table.selected.length}
          filterName={filterName}
          onFilterName={(event: React.ChangeEvent<HTMLInputElement>) => {
            setFilterName(event.target.value);
            table.onResetPage();
          }}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={table.order}
                orderBy={table.orderBy}
                rowCount={_users.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
                onSelectAllRows={(checked) =>
                  table.onSelectAllRows(
                    checked,
                    _users.map((user) => user.id)
                  )
                }
                headLabel={[
                  { id: 'name', label: 'Name' },
                  { id: 'company', label: 'Company' },
                  { id: 'role', label: 'Role' },
                  { id: 'isVerified', label: 'Verified', align: 'center' },
                  { id: 'status', label: 'Status' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(
                    table.page * table.rowsPerPage,
                    table.page * table.rowsPerPage + table.rowsPerPage
                  )
                  .map((row) => (
                    <UserTableRow
                      key={row.id}
                      row={row}
                      selected={table.selected.includes(row.id)}
                      onSelectRow={() => table.onSelectRow(row.id)}
                    />
                  ))}

                <TableEmptyRows
                  height={68}
                  emptyRows={emptyRows(table.page, table.rowsPerPage, _users.length)}
                />

                {notFound && <TableNoData searchQuery={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          component="div"
          page={table.page}
          count={_users.length}
          rowsPerPage={table.rowsPerPage}
          onPageChange={table.onChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={table.onChangeRowsPerPage}
        />
      </Card>
    </DashboardContent>
  );
}
