import { PaginateResponse } from '@app/stores/models';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Course } from '../../../models';
import './CourseTable.scss';
import ActionButton from './components/ActionButton';
import TableLoading from './components/TableLoading';
import { columns } from './core/services';
import StatusChip from '@app/common/components/Chip';
import { labels } from '../../../constants';

const CourseTable = ({ isLoadingGetListCourse, data }: { isLoadingGetListCourse: boolean; data: PaginateResponse<Array<Course>> | undefined}) => {
  const [rows, setRows] = useState<Array<Course>>([]);

  useEffect(() => {
    if (!isLoadingGetListCourse && data && data.data) {
      setRows(data.data);
    } else {
      setRows([]);
    }
  }, [isLoadingGetListCourse, data]);

  if (isLoadingGetListCourse) {
    return (
      <TableLoading />
    )
  }

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
            {rows.map((row: Course) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={row.title}>
                {columns.map((column) => {
                  const value = row[column.id];
                  return (
                    <TableCell key={column.id} align={column.align}>
                      {column.id === 'thumbnail' ? (
                        <img
                          loading="lazy"
                          className="course-image"
                          src={row.thumbnail}
                          alt={row.title}
                        />
                      ) : column.id === 'action' ? ( // Display action buttons
                        <ActionButton course={row} sx={{ justifyContent: 'center' }} />
                      ) : column.format ? ( // Format value if column has format function
                        column.id === 'status' ? (
                          <StatusChip value={value} label={labels} />
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
    </Paper>
  );
};

export default CourseTable;
