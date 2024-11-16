import { useState, useCallback } from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Popover from '@mui/material/Popover';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Iconify from '@app/common/components/iconify/Iconify';
import { UserDetailsDialog } from './UserDetailsPopoverProps';

export type UserProps = {
  id: string;
  email: string | null; // Cho phép null
  full_name: string | null; // Cho phép null
  date_of_birth: string | null; // Cho phép null
  profile_image: string | null; // Cho phép null
  address: string | null; // Cho phép null
};

type UserTableRowProps = {
  row: UserProps;
  index: number;
  selected: boolean;
  onSelectRow: () => void;
};

export function UserTableRow({ row, index, selected, onSelectRow }: UserTableRowProps) {
  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const [detailAnchorEl, setDetailAnchorEl] = useState<HTMLElement | null>(null);

  const handleOpenPopover = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  const handleOpenDetails = (event: React.MouseEvent<HTMLButtonElement>) => {
    setDetailAnchorEl(event.currentTarget);
    handleClosePopover();
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        {/* Checkbox */}
        <TableCell align="center">
          <Checkbox checked={selected} onChange={onSelectRow} />
        </TableCell>

        {/* STT */}
        <TableCell align="center">{index + 1}</TableCell>

        {/* Avatar */}
        <TableCell align="center">
          <Avatar
            alt={row.full_name || 'Chưa cập nhật'}
            src={row.profile_image || '/assets/images/default-avatar.png'}
          />
        </TableCell>

        {/* Họ và Tên */}
        <TableCell>
          <Box
            sx={{
              color: row.full_name ? 'text.primary' : 'error.main', // Màu đỏ nếu "Chưa cập nhật"
            }}
          >
            {row.full_name || 'Chưa cập nhật'}
          </Box>
        </TableCell>

        {/* Email */}
        <TableCell>
          <Box
            sx={{
              color: row.email ? 'text.primary' : 'error.main', // Màu đỏ nếu "Chưa cập nhật"
            }}
          >
            {row.email || 'Chưa cập nhật'}
          </Box>
        </TableCell>

        {/* Ngày sinh */}
        <TableCell align="center">
          <Box
            sx={{
              color: row.date_of_birth ? 'text.primary' : 'error.main', // Màu đỏ nếu "Chưa cập nhật"
            }}
          >
            {row.date_of_birth
              ? new Date(row.date_of_birth).toLocaleDateString('vi-VN')
              : 'Chưa cập nhật'}
          </Box>
        </TableCell>

        {/* Địa chỉ */}
        <TableCell>
          <Box
            sx={{
              color: row.address ? 'text.primary' : 'error.main', // Màu đỏ nếu "Chưa cập nhật"
            }}
          >
            {row.address || 'Chưa cập nhật'}
          </Box>
        </TableCell>

        {/* Action Buttons */}
        <TableCell align="center">
          <IconButton onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      {/* Popover Menu */}
      <Popover
        open={!!openPopover}
        anchorEl={openPopover}
        onClose={handleClosePopover}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuList
          sx={{
            p: 1, // Padding cho toàn bộ menu
            gap: 1, // Khoảng cách giữa các mục menu
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Xem chi tiết */}
          <MenuItem
            onClick={handleOpenDialog}
            sx={{
              color: 'primary.main',
              borderRadius: 1,
              '&:hover': {
                bgcolor: 'primary.lighter',
              },
              gap: 1,
            }}
          >
            <Iconify icon="eva:eye-outline" width={20} />
            <Box component="span" sx={{ fontWeight: '500' }}>
              Xem chi tiết
            </Box>
          </MenuItem>

          {/* Khóa hoạt động */}
          <MenuItem
            onClick={() => {
              handleClosePopover();
            }}
            sx={{
              color: 'error.main',
              borderRadius: 1,
              '&:hover': {
                bgcolor: 'error.lighter',
              },
              gap: 1, // Khoảng cách giữa icon và text
            }}
          >
            <Iconify icon="eva:lock-outline" width={20} />
            <Box component="span" sx={{ fontWeight: '500' }}>
              Khóa hoạt động
            </Box>
          </MenuItem>
        </MenuList>
      </Popover>

      <UserDetailsDialog
        open={openDialog}
        onClose={handleCloseDialog}
        user={{
          email: 'thanhdat.it.work@gmail.com',
          full_name: 'Nguyen Thanh Dat',
          profile_image:
            'https://lh3.googleusercontent.com/a/ACg8ocL_iceN0ZyShgRTQdNLHte_ByaC2ddrXDVkSUR6CmpkYJDSS50=s96-c',
          date_of_birth: '1995-12-10',
          role: 'USER',
          phone_num: null,
          address: '123 Đường ABC, TP.HCM',
          total_courses: 0,
          facebook_url: null,
          linkedin_url: null,
          github_url: null,
          created_at: '2024-10-21T06:02:20.241Z',
        }}
      />
    </>
  );
}
