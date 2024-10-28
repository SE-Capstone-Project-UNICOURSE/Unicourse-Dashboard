import React from 'react';
import {
  Card,
  CardContent,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import './CourseTable.scss';
import helpers from '@app/utils/helpers';
import { COMMON_CONSTANTS } from '@app/common/constants/appConstants';
import ActionButton from './components/ActionButton';
import StatusChip from './components/StatusChip';
import { Column } from './core/models';

const columns: readonly Column[] = [
  { id: 'course', label: 'Khóa học', minWidth: 100 },
  {
    id: 'thumbnail',
    label: 'Ảnh Thumbnail',
    minWidth: 170,
    align: 'center',
  },
  {
    id: 'price',
    label: 'Giá cả',
    minWidth: 170,
    align: 'center',
    format: (value: number) => helpers.formatCurrencyVND(value),
  },
  {
    id: 'created_at',
    label: 'Ngày tạo',
    minWidth: 170,
    align: 'center',
    format: (value: Date) => helpers.formatDate(value),
  },
  {
    id: 'status',
    label: 'Trạng thái',
    minWidth: 170,
    align: 'center',
    format: (value: string) => helpers.formatStatus(value, COMMON_CONSTANTS.COURSE),
  },
  {
    id: 'action',
    label: 'Chức năng',
    minWidth: 170,
    align: 'center',
  },
];

interface Data {
  course: string;
  thumbnail: string;
  price: number;
  created_at: Date;
  status: string;
}

function createData(
  course: string,
  thumbnail: string,
  price: number,
  created_at: Date,
  status: string
): Data {
  return { course, thumbnail, price, created_at, status };
}

const rows = [
  createData(
    'ReactJS',
    'https://firebasestorage.googleapis.com/v0/b/unicourse-f4020.appspot.com/o/Course%2FSpringBoot%20c%C6%A1%20b%E1%BA%A3n%2FDanh%20s%C3%A1ch%20h%C3%ACnh%20%E1%BA%A3nh%20kho%C3%A1%20h%E1%BB%8Dc.png?alt=media&token=b8a09657-983d-4a00-b8a2-1093d7a8bacc',
    1000000,
    new Date(),
    'PUBLISHED'
  ),
  createData(
    'NodeJS',
    'https://firebasestorage.googleapis.com/v0/b/unicourse-f4020.appspot.com/o/Course%2FSpringBoot%20c%C6%A1%20b%E1%BA%A3n%2FDanh%20s%C3%A1ch%20h%C3%ACnh%20%E1%BA%A3nh%20kho%C3%A1%20h%E1%BB%8Dc.png?alt=media&token=b8a09657-983d-4a00-b8a2-1093d7a8bacc',
    2000000,
    new Date(),
    'DRAFT'
  ),
  createData(
    'Angular',
    'https://firebasestorage.googleapis.com/v0/b/unicourse-f4020.appspot.com/o/Course%2FSpringBoot%20c%C6%A1%20b%E1%BA%A3n%2FDanh%20s%C3%A1ch%20h%C3%ACnh%20%E1%BA%A3nh%20kho%C3%A1%20h%E1%BB%8Dc.png?alt=media&token=b8a09657-983d-4a00-b8a2-1093d7a8bacc',
    3000000,
    new Date(),
    'PUBLISHED'
  ),
  createData(
    'VueJS',
    'https://firebasestorage.googleapis.com/v0/b/unicourse-f4020.appspot.com/o/Course%2FSpringBoot%20c%C6%A1%20b%E1%BA%A3n%2FDanh%20s%C3%A1ch%20h%C3%ACnh%20%E1%BA%A3nh%20kho%C3%A1%20h%E1%BB%8Dc.png?alt=media&token=b8a09657-983d-4a00-b8a2-1093d7a8bacc',
    4000000,
    new Date(),
    'CLOSED'
  ),
  createData(
    'Svelte',
    'https://firebasestorage.googleapis.com/v0/b/unicourse-f4020.appspot.com/o/Course%2FSpringBoot%20c%C6%A1%20b%E1%BA%A3n%2FDanh%20s%C3%A1ch%20h%C3%ACnh%20%E1%BA%A3nh%20kho%C3%A1%20h%E1%BB%8Dc.png?alt=media&token=b8a09657-983d-4a00-b8a2-1093d7a8bacc',
    5000000,
    new Date(),
    'PUBLISHED'
  ),
  createData(
    'NextJS',
    'https://firebasestorage.googleapis.com/v0/b/unicourse-f4020.appspot.com/o/Course%2FSpringBoot%20c%C6%A1%20b%E1%BA%A3n%2FDanh%20s%C3%A1ch%20h%C3%ACnh%20%E1%BA%A3nh%20kho%C3%A1%20h%E1%BB%8Dc.png?alt=media&token=b8a09657-983d-4a00-b8a2-1093d7a8bacc',
    6000000,
    new Date(),
    'PUBLISHED'
  ),
  createData(
    'NuxtJS',
    'https://firebasestorage.googleapis.com/v0/b/unicourse-f4020.appspot.com/o/Course%2FSpringBoot%20c%C6%A1%20b%E1%BA%A3n%2FDanh%20s%C3%A1ch%20h%C3%ACnh%20%E1%BA%A3nh%20kho%C3%A1%20h%E1%BB%8Dc.png?alt=media&token=b8a09657-983d-4a00-b8a2-1093d7a8bacc',
    7000000,
    new Date(),
    'PUBLISHED'
  ),
  createData(
    'React Native',
    'https://firebasestorage.googleapis.com/v0/b/unicourse-f4020.appspot.com/o/Course%2FSpringBoot%20c%C6%A1%20b%E1%BA%A3n%2FDanh%20s%C3%A1ch%20h%C3%ACnh%20%E1%BA%A3nh%20kho%C3%A1%20h%E1%BB%8Dc.png?alt=media&token=b8a09657-983d-4a00-b8a2-1093d7a8bacc',
    8000000,
    new Date(),
    'PUBLISHED'
  ),
  createData(
    'Flutter',
    'https://firebasestorage.googleapis.com/v0/b/unicourse-f4020.appspot.com/o/Course%2FSpringBoot%20c%C6%A1%20b%E1%BA%A3n%2FDanh%20s%C3%A1ch%20h%C3%ACnh%20%E1%BA%A3nh%20kho%C3%A1%20h%E1%BB%8Dc.png?alt=media&token=b8a09657-983d-4a00-b8a2-1093d7a8bacc',
    9000000,
    new Date(),
    'PUBLISHED'
  ),
  createData(
    'Ionic',
    'https://firebasestorage.googleapis.com/v0/b/unicourse-f4020.appspot.com/o/Course%2FSpringBoot%20c%C6%A1%20b%E1%BA%A3n%2FDanh%20s%C3%A1ch%20h%C3%ACnh%20%E1%BA%A3nh%20kho%C3%A1%20h%E1%BB%8Dc.png?alt=media&token=b8a09657-983d-4a00-b8a2-1093d7a8bacc',
    10000000,
    new Date(),
    'PUBLISHED'
  ),
];

const CourseTable = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ overflow: 'auto' }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  <Typography variant="subtitle1">{column.label}</Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={row.course}>
                {columns.map((column) => {
                  const value = row[column.id];
                  return (
                    <TableCell key={column.id} align={column.align}>
                      {column.id === 'thumbnail' ? (
                        <img src={value} alt={row.course} style={{ width: '100px' }} />
                      ) : column.id === 'action' ? ( // Display action buttons
                        <ActionButton sx={{ justifyContent: 'center' }} />
                      ) : column.format ? ( // Format value if column has format function
                        column.id === 'status' ? (
                          <StatusChip value={value} />
                        ) : (
                          <Typography variant="subtitle2">{column.format(value)}</Typography>
                        )
                      ) : (
                        // Display value as is
                        <Typography variant="subtitle2">{value}</Typography>
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <TablePagination
        rowsPerPageOptions={[10]}
        component="div"
        count={rows.length}
        rowsPerPage={10}
        page={page}
        onPageChange={handleChangePage}
      /> */}
    </Paper>
  );
};

export default CourseTable;
