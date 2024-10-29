import { Label } from '@app/common/components/label';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { fCurrency } from 'src/utils/format-number';

type CourseItemProps = {};

const CourseLecturerItem = () => {
  const renderStatus = (
    <Label
      variant="inverted"
      // color={('sale' && 'error') || 'info'}
      color={'info'}
      sx={{
        zIndex: 9,
        top: 16,
        right: 16,
        position: 'absolute',
        textTransform: 'uppercase',
      }}
    >
      Status
    </Label>
  );

  const renderImg = (
    <Box
      component="img"
      alt={'Product Title'}
      src={'Product URL'}
      sx={{
        top: 0,
        width: 1,
        height: 1,
        objectFit: 'cover',
        position: 'absolute',
      }}
    />
  );
  const renderInstructor = (
    <Typography variant="subtitle1">
      <Typography component="span" variant="body1">
        Instructor
      </Typography>
    </Typography>
  );

  const renderPrice = (
    <Typography variant="subtitle1">
      <Typography
        component="span"
        variant="body1"
        sx={{
          color: 'text.disabled',
          textDecoration: 'line-through',
        }}
      >
        {/* {product.priceSale && fCurrency(product.priceSale)} */}
        {fCurrency(20000)}
      </Typography>
      &nbsp;
      {fCurrency(30000)}
    </Typography>
  );

  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        {renderStatus}

        {renderImg}
      </Box>

      <Stack spacing={1} sx={{ p: 2 }}>
        <Link color="inherit" underline="hover" variant="subtitle2" noWrap>
          Product Title
        </Link>
        {renderInstructor}

        <Box display="flex" alignItems="center" justifyContent="space-between">
          {renderPrice}
        </Box>
      </Stack>
    </Card>
  );
};

export default CourseLecturerItem;
