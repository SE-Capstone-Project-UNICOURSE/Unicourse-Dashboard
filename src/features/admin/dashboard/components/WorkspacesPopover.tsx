import Iconify from '@app/common/components/iconify/Iconify';
import { Label } from '@app/common/components/label';
import Box from '@mui/material/Box';
import type { ButtonBaseProps } from '@mui/material/ButtonBase';
import ButtonBase from '@mui/material/ButtonBase';
import MenuItem, { menuItemClasses } from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Popover from '@mui/material/Popover';
import { useCallback, useState } from 'react';
import { varAlpha } from 'src/theme/styles';
import { _workspaces } from '../_mockData';

// ----------------------------------------------------------------------

export type WorkspacesPopoverProps = ButtonBaseProps & {
  data?: {
    id: string;
    name: string;
    logo: string;
    plan: string;
  }[];
};

export default function WorkspacesPopover({
  data = _workspaces,
  sx,
  ...other
}: WorkspacesPopoverProps) {
  const [workspace, setWorkspace] = useState(data[0]);
  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null);
  const handleOpenPopover = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenPopover(event.currentTarget);
  }, []);

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null);
  }, []);

  const handleChangeWorkspace = useCallback(
    (newValue: (typeof data)[number]) => {
      setWorkspace(newValue);
      handleClosePopover();
    },
    [handleClosePopover]
  );

  const renderAvatar = (alt: string, src: string) => (
    <Box component="img" alt={alt} src={src} sx={{ width: 28, height: 28, borderRadius: '50%' }} />
  );

  const renderLabel = (plan: string) => (
    <Label color={plan === 'Free' ? 'default' : 'info'}>{plan}</Label>
  );

  return (
    <>
      <ButtonBase
        disableRipple
        onClick={handleOpenPopover}
        sx={{
          pl: 2,
          py: 2,
          gap: 1.5,
          pr: 1.5,
          width: 1,
          borderRadius: 1.5,
          textAlign: 'left',
          justifyContent: 'flex-start',
          bgcolor: (theme) => varAlpha(theme.vars.palette.grey['500Channel'], 0.08),
          ...sx,
        }}
        {...other}
      >
        {renderAvatar(workspace?.name, workspace?.logo)}

        <Box
          gap={1}
          flexGrow={1}
          display="flex"
          alignItems="center"
          sx={{ typography: 'body2', fontWeight: 'fontWeightSemiBold' }}
        >
          {workspace?.name}
          {renderLabel(workspace?.plan)}
        </Box>

        <Iconify width={16} icon="carbon:chevron-sort" sx={{ color: 'text.disabled' }} />
      </ButtonBase>

      <Popover open={!!openPopover} anchorEl={openPopover} onClose={handleClosePopover}>
        <MenuList
          disablePadding
          sx={{
            p: 0.5,
            gap: 0.5,
            width: 260,
            display: 'flex',
            flexDirection: 'column',
            [`& .${menuItemClasses.root}`]: {
              p: 1.5,
              gap: 1.5,
              borderRadius: 0.75,
              [`&.${menuItemClasses.selected}`]: {
                bgcolor: 'action.selected',
                fontWeight: 'fontWeightSemiBold',
              },
            },
          }}
        >
          {data.map((option) => (
            <MenuItem
              key={option.id}
              selected={option.id === workspace?.id}
              onClick={() => handleChangeWorkspace(option)}
            >
              {renderAvatar(option.name, option.logo)}

              <Box component="span" sx={{ flexGrow: 1 }}>
                {option.name}
              </Box>

              {renderLabel(option.plan)}
            </MenuItem>
          ))}
        </MenuList>
      </Popover>
    </>
  );
}