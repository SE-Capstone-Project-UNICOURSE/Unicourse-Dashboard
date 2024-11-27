import { COMMON_CONSTANTS } from '@app/common/constants/appConstants';
import { Chip, ChipPropsColorOverrides, ChipPropsSizeOverrides, Stack } from '@mui/material';
import PropTypes from 'prop-types';

export interface StatusChipProps {
  value: string; // The status value to compare against COMMON_CONSTANTS
  size?: ChipPropsSizeOverrides;
  color?: ChipPropsColorOverrides;
  label: {
    DRAFT: string; // Label for DRAFT status
    PUBLISHED: string; // Label for PUBLISHED status
    CLOSED: string; // Label for CLOSED status
  };
}

const StatusChip: React.FC<StatusChipProps> = ({ value, size, color, label }) => {
  const getChipProps = () => {
    switch (value) {
      case COMMON_CONSTANTS.DRAFT:
        return { label: label.DRAFT, color: color || 'primary', size };
      case COMMON_CONSTANTS.PUBLISHED:
        return { label: label.PUBLISHED, color: color || 'success', size };
      case COMMON_CONSTANTS.CLOSED:
        return { label: label.CLOSED, color: color || 'error', size };
      default:
        return { label: label.CLOSED, color: color || 'error', size };
    }
  };

  const chipProps = getChipProps();

  return (
    <Stack>
      <Chip
        size={chipProps.size as 'small' | 'medium'}
        label={chipProps.label}
        color={
          chipProps.color as
            | 'default'
            | 'primary'
            | 'secondary'
            | 'error'
            | 'info'
            | 'success'
            | 'warning'
        }
      />
    </Stack>
  );
};
StatusChip.propTypes = {
  value: PropTypes.string.isRequired,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  color: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  label: PropTypes.shape({
    DRAFT: PropTypes.string.isRequired,
    PUBLISHED: PropTypes.string.isRequired,
    CLOSED: PropTypes.string.isRequired,
  }).isRequired,
};

export default StatusChip;
