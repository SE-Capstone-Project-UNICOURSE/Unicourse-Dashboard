import Iconify from '@app/components/iconify/Iconify';
import type { BoxProps } from '@mui/material/Box';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import MenuItem, { menuItemClasses } from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Popover from '@mui/material/Popover';
import { useCallback, useState } from 'react';

type TaskItemProps = BoxProps & {
  checked: boolean;
  item: {
    id: string;
    name: string;
  };
  onChange: (id: string) => void;
};

function TaskItem({ item, checked, onChange, sx, ...other }: TaskItemProps) {
  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null);

  const handleOpenPopover = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenPopover(event.currentTarget);
  }, []);

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null);
  }, []);

  const handleMarkComplete = useCallback(() => {
    handleClosePopover();
    console.info('MARK COMPLETE', item.id);
  }, [handleClosePopover, item.id]);

  const handleShare = useCallback(() => {
    handleClosePopover();
    console.info('SHARE', item.id);
  }, [handleClosePopover, item.id]);

  const handleEdit = useCallback(() => {
    handleClosePopover();
    console.info('EDIT', item.id);
  }, [handleClosePopover, item.id]);

  const handleDelete = useCallback(() => {
    handleClosePopover();
    console.info('DELETE', item.id);
  }, [handleClosePopover, item.id]);

  return (
    <>
      <Box
        sx={{
          pl: 2,
          pr: 1,
          py: 1.5,
          display: 'flex',
          ...(checked && { color: 'text.disabled', textDecoration: 'line-through' }),
          ...sx,
        }}
        {...other}
      >
        <FormControlLabel
          control={
            <Checkbox
              disableRipple
              checked={checked}
              onChange={onChange}
              inputProps={{
                name: item.name,
                'aria-label': 'Checkbox demo',
              }}
            />
          }
          label={item.name}
          sx={{ m: 0, flexGrow: 1 }}
        />

        <IconButton
          color={openPopover ? 'inherit' : 'default'}
          onClick={handleOpenPopover}
          sx={{ alignSelf: 'flex-start' }}
        >
          <Iconify icon="eva:more-vertical-fill" />
        </IconButton>
      </Box>

      <Popover
        open={!!openPopover}
        anchorEl={openPopover}
        onClose={handleClosePopover}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuList
          disablePadding
          sx={{
            p: 0.5,
            gap: 0.5,
            display: 'flex',
            flexDirection: 'column',
            [`& .${menuItemClasses.root}`]: {
              pl: 1,
              pr: 2,
              gap: 2,
              borderRadius: 0.75,
              [`&.${menuItemClasses.selected}`]: { bgcolor: 'action.selected' },
            },
          }}
        >
          <MenuItem onClick={handleMarkComplete}>
            <Iconify icon="solar:check-circle-bold" />
            Mark complete
          </MenuItem>

          <MenuItem onClick={handleEdit}>
            <Iconify icon="solar:pen-bold" />
            Edit
          </MenuItem>

          <MenuItem onClick={handleShare}>
            <Iconify icon="solar:share-bold" />
            Share
          </MenuItem>

          <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
            <Iconify icon="solar:trash-bin-trash-bold" />
            Delete
          </MenuItem>
        </MenuList>
      </Popover>
    </>
  );
}

export default TaskItem;
