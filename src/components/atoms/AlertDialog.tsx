import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { Info, Warning, Error, CheckCircle } from '@mui/icons-material';

// Define the dialog types
export type DialogType = 'info' | 'warning' | 'error' | 'success';

// Define the props for the CustomDialog
interface CustomDialogProps {
  open: boolean;
  handleClose: () => void;
  title: string;
  content: string;
  type: DialogType;
  actions: {
    label: string;
    onClick: () => void;
    autoFocus?: boolean;
  }[];
}

const CustomDialog: React.FC<CustomDialogProps> = ({
  open,
  handleClose,
  title,
  content,
  type,
  actions,
}) => {
  // Helper to select the appropriate icon based on the dialog type
  const renderIcon = () => {
    switch (type) {
      case 'info':
        return <Info style={{ color: '#2196f3' }} />;
      case 'warning':
        return <Warning style={{ color: '#ff9800' }} />;
      case 'error':
        return <Error style={{ color: '#f44336' }} />;
      case 'success':
        return <CheckCircle style={{ color: '#4caf50' }} />;
      default:
        return null;
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="custom-dialog-title"
      aria-describedby="custom-dialog-description"
    >
      <DialogTitle id="custom-dialog-title">
        {renderIcon()} {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="custom-dialog-description">{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        {actions.map((action, index) => (
          <Button key={index} onClick={action.onClick} autoFocus={action.autoFocus || false}>
            {action.label}
          </Button>
        ))}
      </DialogActions>
    </Dialog>
  );
};

export default CustomDialog;
