import { useAppDispatch, useAppSelector } from '@app/stores';
import { hideDialog } from '@app/stores/slices/dialogSlice';
import { DialogType } from '@app/stores/types/dialogSlice.type';
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from '@mui/material';
import React from 'react';

const images = {
  check_fail: '/assets/images/check_fail.png',
  check_warning: '/assets/images/check_warning.png',
  check_info: '/assets/images/check_info.png',
  check_success: '/assets/images/check_success.png',
};

const DialogManager: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    isVisible,
    type,
    content,
    title,
    confirmButtonText = 'OK',
    cancelButtonText = 'Đóng',
    onConfirm,
    onCancel,
    isCustomizeButton,
    size = 'small',
  } = useAppSelector((state) => state.dialogState);

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    } else {
      dispatch(hideDialog());
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      dispatch(hideDialog());
    }
  };

  const getDialogStyles = () => {
    switch (type) {
      case DialogType.ERROR:
        return { color: 'error.main', image: images.check_fail };
      case DialogType.WARNING:
        return { color: 'warning.main', image: images.check_warning };
      case DialogType.ALERT:
        return { color: 'info.main', image: images.check_info };
      case DialogType.SUCCESS:
        return { color: 'primary.main', image: images.check_success };
      case DialogType.NORMAL:
      default:
        return { color: 'info.main', image: images.check_info };
    }
  };

  const getDialogMaxWidth = () => {
    switch (size) {
      case 'large':
        return 'lg'; // Material UI uses 'lg' for large dialog
      case 'small':
        return 'sm'; // 'sm' for small dialog
      case 'medium':
      default:
        return 'md'; // 'md' for medium size (default)
    }
  };

  const { color, image } = getDialogStyles();

  return (
    <Dialog open={isVisible} onClose={handleCancel} maxWidth={getDialogMaxWidth()} fullWidth>
      <DialogTitle>
        <Typography variant="h5" color={color} textAlign="center" sx={{ fontWeight: 'bold' }}>
          {title}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Grid container justifyContent="center" alignItems="center" spacing={2}>
          <Grid item>
            <Avatar
              src={image}
              alt="Dialog Icon"
              variant="square"
              sx={{ height: 160, width: 160 }}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" color="text.primary" textAlign="center">
              {content}
            </Typography>
          </Grid>
        </Grid>
      </DialogContent>
      {!isCustomizeButton && (
        <DialogActions sx={{ justifyContent: 'center' }}>
          <Grid container spacing={2} justifyContent="space-between">
            {type !== DialogType.NORMAL && (
              <Grid item>
                <Button
                  onClick={handleCancel}
                  variant="outlined"
                  color="inherit"
                  size="large"
                  sx={{
                    fontWeight: 'bold',
                    borderRadius: '10px', // Bo góc 10px
                    padding: '12px 24px', // Tăng kích thước nút
                    minWidth: '120px',
                  }}
                >
                  {cancelButtonText}
                </Button>
              </Grid>
            )}
            <Grid item>
              <Button
                onClick={handleConfirm}
                variant="contained"
                size="large"
                sx={{
                  backgroundColor: color,
                  fontWeight: 'bold',
                  borderRadius: '10px', // Bo góc 10px
                  padding: '12px 24px', // Tăng kích thước nút
                  minWidth: '120px', // Tăng chiều rộng tối thiểu của nút
                }}
              >
                {confirmButtonText}
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      )}
    </Dialog>
  );
};

export default DialogManager;
