import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Popover,
  Typography,
} from '@mui/material';
import Iconify from '@app/common/components/iconify/Iconify';
import dayjs from 'dayjs';

type UserDetailsDialogProps = {
  open: boolean;
  onClose: () => void;
  user: {
    email: string;
    full_name: string | null;
    profile_image: string | null;
    date_of_birth: string | null;
    role: string;
    phone_num: string | null;
    address: string | null;
    facebook_url: string | null;
    linkedin_url: string | null;
    github_url: string | null;
    created_at: string;
    total_courses: number; // Tổng số khóa học đã đăng ký
  };
};

export function UserDetailsDialog({ open, onClose, user }: UserDetailsDialogProps) {
  const [lockPopover, setLockPopover] = useState<HTMLElement | null>(null);

  const handleOpenLockPopover = (event: React.MouseEvent<HTMLButtonElement>) => {
    setLockPopover(event.currentTarget);
  };

  const handleCloseLockPopover = () => {
    setLockPopover(null);
  };

  const handleLockAccount = () => {
    console.log(`Khoá tài khoản người dùng ID: ${user.email}`);
    setLockPopover(null); // Đóng Popover sau khi hành động
    onClose(); // Đóng Dialog
  };

  const daysJoined = dayjs().diff(dayjs(user.created_at), 'day');

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: 4,
          boxShadow: 10,
        },
      }}
    >
      {/* Header */}
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            Thông tin chi tiết
          </Typography>
          <IconButton onClick={onClose}>
            <Iconify icon="eva:close-fill" />
          </IconButton>
        </Box>
      </DialogTitle>

      {/* Nội dung */}
      <DialogContent>
        <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
          {/* Avatar */}
          <Avatar
            alt={user.full_name || 'Chưa cập nhật'}
            src={user.profile_image || '/assets/images/default-avatar.png'}
            sx={{
              width: 120,
              height: 120,
              border: '2px solid',
              borderColor: 'primary.main',
              mb: 2,
            }}
          />
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            {user.full_name || 'Chưa cập nhật'}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ fontStyle: 'italic' }}>
            {user.role === 'USER' ? 'Học Viên' : user.role || 'Chưa cập nhật'}
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Thông tin cá nhân */}
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
            Thông tin cá nhân
          </Typography>
          <Box display="flex" flexDirection="column" gap={2}>
            <Box display="flex" alignItems="center" gap={1.5}>
              <Iconify icon="eva:email-outline" width={24} />
              <Typography variant="body2" color="text.primary">
                {user.email || 'Chưa cập nhật'}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1.5}>
              <Iconify icon="eva:phone-outline" width={24} />
              <Typography variant="body2" color="text.primary">
                {user.phone_num || 'Chưa cập nhật'}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1.5}>
              <Iconify icon="eva:calendar-outline" width={24} />
              <Typography variant="body2" color="text.primary">
                {user.date_of_birth
                  ? new Date(user.date_of_birth).toLocaleDateString('vi-VN')
                  : 'Chưa cập nhật'}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1.5}>
              <Iconify icon="eva:pin-outline" width={24} />
              <Typography variant="body2" color="text.primary">
                {user.address || 'Chưa cập nhật'}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1.5}>
              <Iconify icon="eva:clock-outline" width={24} />
              <Typography variant="body2" color="text.primary">
                Tham gia: {daysJoined} ngày
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1.5}>
              <Iconify icon="eva:book-outline" width={24} />
              <Typography variant="body2" color="text.primary">
                Đã đăng ký: {user.total_courses} khóa học
              </Typography>
            </Box>
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Liên kết xã hội */}
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
            Liên kết xã hội
          </Typography>
          <Box display="flex" flexDirection="column" gap={1.5}>
            <Box display="flex" alignItems="center" gap={1.5}>
              <Iconify icon="eva:facebook-outline" width={24} />
              <Typography
                component="a"
                href={user.facebook_url || '#'}
                target="_blank"
                color="primary"
                sx={{ textDecoration: user.facebook_url ? 'underline' : 'none' }}
              >
                {user.facebook_url ? 'Facebook' : 'Chưa cập nhật'}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1.5}>
              <Iconify icon="eva:linkedin-outline" width={24} />
              <Typography
                component="a"
                href={user.linkedin_url || '#'}
                target="_blank"
                color="primary"
                sx={{ textDecoration: user.linkedin_url ? 'underline' : 'none' }}
              >
                {user.linkedin_url ? 'LinkedIn' : 'Chưa cập nhật'}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1.5}>
              <Iconify icon="eva:github-outline" width={24} />
              <Typography
                component="a"
                href={user.github_url || '#'}
                target="_blank"
                color="primary"
                sx={{ textDecoration: user.github_url ? 'underline' : 'none' }}
              >
                {user.github_url ? 'GitHub' : 'Chưa cập nhật'}
              </Typography>
            </Box>
          </Box>
        </Box>
      </DialogContent>

      {/* Footer */}
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
        <Button variant="outlined" onClick={onClose}>
          Huỷ
        </Button>
        <Button
          variant="contained"
          color="error"
          startIcon={<Iconify icon="eva:lock-outline" />}
          onClick={handleOpenLockPopover}
        >
          Khoá tài khoản
        </Button>
      </Box>

      {/* Popover Xác Nhận */}
      <Popover
        open={Boolean(lockPopover)}
        anchorEl={lockPopover}
        onClose={handleCloseLockPopover}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <Box sx={{ p: 2, maxWidth: 280, textAlign: 'center' }}>
          <Typography variant="subtitle1" gutterBottom>
            Bạn có chắc chắn muốn khoá tài khoản này?
          </Typography>
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button variant="outlined" onClick={handleCloseLockPopover}>
              Huỷ
            </Button>
            <Button variant="contained" color="error" onClick={handleLockAccount}>
              Xác nhận
            </Button>
          </Box>
        </Box>
      </Popover>
    </Dialog>
  );
}
