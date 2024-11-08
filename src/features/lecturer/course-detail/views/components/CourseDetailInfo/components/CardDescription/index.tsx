import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  Dialog,
  DialogContent,
  DialogActions,
  Typography,
  CardHeader,
} from '@mui/material';
import ModalTextEditor from './components/ModalTextEditor';

interface CardDescriptionProps {
  description: string;
  onChangeDescription: (field: string, value: string, shouldValidate: boolean) => void;
}

const CardDescription: React.FC<CardDescriptionProps> = ({ description, onChangeDescription }) => {
  // State variables
  const [currentDescription, setCurrentDescription] = useState(description);

  // Behaviors variables
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isEditTextDialogOpen, setEditTextDialogOpen] = useState(false);
  const [copyText, setCopyText] = useState('Sao chép');
  const [limitedDescription, setLimitedDescription] = useState('');

  // INITIALIZATION ZONE
  useEffect(() => {
    setCurrentDescription(description);
    // Limit description to 100 characters and add "..."
    setLimitedDescription(description.length > 200 ? `${description.slice(0, 200)}...` : description);
  }, [description]);

  // BEHAVIORS ZONE
  // Open dialog to show full description
  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  // Close dialog
  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  // Open dialog to edit description
  const handleOpenEditTextDialog = () => {
    setEditTextDialogOpen(true);
  };

  // Close dialog
  const handleCloseEditTextAndSaveDialog = () => {
    setEditTextDialogOpen(false);
    onChangeDescription('description', currentDescription, true);
  };

  const handleCloseEditTextAndResetValueDialog = () => {
    setEditTextDialogOpen(false);
    setCurrentDescription(description);
  }

  // Copy description to clipboard
  const handleCopyDescription = () => {
    const tempElement = document.createElement('div');
    tempElement.innerHTML = description;
    const textToCopy = tempElement.innerText || tempElement.textContent || '';

    // Change button text to "Đã sao chép" for 2 seconds, then change back to "Sao chép"
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopyText('Đã sao chép');
      setTimeout(() => {
        setCopyText('Sao chép');
      }, 1000);
    });
  };

  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="elevation">
        <CardHeader title="Giới thiệu khóa học" />
        <CardContent sx={{ paddingY: 0 }}>
          {limitedDescription.length === 0 ? (
            <Typography sx={{ paddingY: '0.5rem' }} variant="body1" component="div">
              Không có mô tả
            </Typography>
          ) : (
            <div dangerouslySetInnerHTML={{ __html: limitedDescription }} />
          )}
        </CardContent>
        <CardActions>
          <Button size="small" onClick={handleOpenDialog}>
            Xem đầy đủ
          </Button>
          <Button size="small" onClick={handleCopyDescription}>
            {copyText}
          </Button>
          <Button size="small" onClick={handleOpenEditTextDialog}>
            Chỉnh sửa
          </Button>
        </CardActions>
      </Card>

      {/* Dialog for displaying full description */}
      <Dialog open={isDialogOpen} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogContent>
          <Typography variant="body1" component="div">
            {description.length === 0 ? (
              <Typography sx={{ paddingY: '0.5rem' }} variant="body1" component="div">
                Không có mô tả
              </Typography>
            ) : (
              <div dangerouslySetInnerHTML={{ __html: description }} />
            )}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Đóng
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for editing description */}
      <Dialog
        open={isEditTextDialogOpen}
        onClose={handleCloseEditTextAndResetValueDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogContent>
          <ModalTextEditor originalDescription={description} setCurrentDescription={setCurrentDescription} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditTextAndResetValueDialog} color="primary">
            Đóng
          </Button>
          <Button onClick={handleCloseEditTextAndSaveDialog} color="primary">
            Lưu
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CardDescription;
