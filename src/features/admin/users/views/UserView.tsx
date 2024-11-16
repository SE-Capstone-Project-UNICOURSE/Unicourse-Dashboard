import Iconify from '@app/common/components/iconify/Iconify';
import { Scrollbar } from '@app/common/components/scrollbar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import Typography from '@mui/material/Typography';
import { useState } from 'react';

import DashboardContent from '../../dashboard/layouts/DashboardLayout/DashboardContent';
import { applyFilter, emptyRows, getComparator } from '../utils';
import { TableEmptyRows } from './components/TableEmptyRows';
import { TableNoData } from './components/TableNoData';
import { UserTableHead } from './components/UserTableHead';
import type { UserProps } from './components/UserTableRow';
import { UserTableRow } from './components/UserTableRow';
import { UserTableToolbar } from './components/UserTableToolbar';
import { useUserTable } from './useUserTable';

const _users: UserProps[] = [
  {
    id: '1',
    email: 'thanhdat.it.work@gmail.com',
    full_name: 'Nguyen Thanh Dat',
    date_of_birth: '1995-12-10',
    profile_image: 'https://via.placeholder.com/150',
    address: '123 Đường ABC, TP.HCM',
  },
  {
    id: '2',
    email: null,
    full_name: null,
    date_of_birth: null,
    profile_image: null,
    address: null,
  },
  {
    id: '3',
    email: 'example.user@gmail.com',
    full_name: 'Jane Doe',
    date_of_birth: null,
    profile_image: 'https://via.placeholder.com/150',
    address: '456 Đường DEF, Hà Nội',
  },
  {
    id: '4',
    email: 'john.doe@gmail.com',
    full_name: 'John Doe',
    date_of_birth: '1990-05-20',
    profile_image: 'https://via.placeholder.com/150',
    address: null,
  },
  {
    id: '5',
    email: null,
    full_name: null,
    date_of_birth: '1988-07-15',
    profile_image: null,
    address: '789 Đường GHI, Đà Nẵng',
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
          Danh sách người dùng
        </Typography>
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="mingcute:add-line" />}
        >
          Thêm mới
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
                  { id: 'index', label: 'STT' }, // STT
                  { id: 'profile_image', label: 'Ảnh' }, // Avatar
                  { id: 'full_name', label: 'Họ và Tên' }, // Full Name
                  { id: 'email', label: 'Email' }, // Email
                  { id: 'date_of_birth', label: 'Ngày sinh' }, // Date of Birth
                  { id: 'address', label: 'Địa chỉ' }, // Address
                  { id: 'action', label: 'Thao tác' }, // Action
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
                      index={table.page * table.rowsPerPage + dataFiltered.indexOf(row)}
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
