import React from 'react';
import { Chip, Stack } from '@mui/material';
import { COMMON_CONSTANTS } from '@app/common/constants/appConstants';

function StatusChip({ value }: { value: string }) {
  if (value === COMMON_CONSTANTS.DRAFT) {
    return (
      <Stack alignItems="center">
        <Chip sx={{ width: '7rem' }} label="ĐANG CHỜ" color="primary" />
      </Stack>
    );
  } else if (value === COMMON_CONSTANTS.PUBLISHED) {
    return (
      <Stack alignItems="center">
        <Chip sx={{ width: '7rem' }} label="HOẠT ĐỘNG" color="success" />
      </Stack>
    );
  } else {
    return (
      <Stack alignItems="center">
        <Chip sx={{ width: '7rem' }} label="ĐÃ ĐÓNG" color="error" />
      </Stack>
    );
  }
}

export default StatusChip;
