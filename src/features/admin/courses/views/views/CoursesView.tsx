import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { useCallback, useState } from 'react';

import DashboardContent from '@app/features/admin/dashboard/layouts/DashboardLayout/DashboardContent';
import {
  _courses,
  CATEGORY_OPTIONS,
  COLOR_OPTIONS,
  defaultFilters,
  GENDER_OPTIONS,
  PRICE_OPTIONS,
  RATING_OPTIONS,
} from '../_mockData';
import CartIcon from './components/CartIcon';
import type { FiltersProps } from './components/CourseFilters';
import CourseFilter from './components/CourseFilters';
import CourseItem from './components/CourseItem';
import CourseSort from './components/CourseSort';

const CourseView = () => {
  const [sortBy, setSortBy] = useState('featured');
  const [openFilter, setOpenFilter] = useState(false);
  const [filters, setFilters] = useState<FiltersProps>(defaultFilters);

  const handleOpenFilter = useCallback(() => {
    setOpenFilter(true);
  }, []);

  const handleCloseFilter = useCallback(() => {
    setOpenFilter(false);
  }, []);

  const handleSort = useCallback((newSort: string) => {
    setSortBy(newSort);
  }, []);

  const handleSetFilters = useCallback((updateState: Partial<FiltersProps>) => {
    setFilters((prevValue) => ({ ...prevValue, ...updateState }));
  }, []);

  const canReset = Object.keys(filters).some(
    (key) => filters[key as keyof FiltersProps] !== defaultFilters[key as keyof FiltersProps]
  );

  return (
    <DashboardContent>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Courses
      </Typography>

      <CartIcon totalItems={8} />

      <Box
        display="flex"
        alignItems="center"
        flexWrap="wrap-reverse"
        justifyContent="flex-end"
        sx={{ mb: 5 }}
      >
        <Box display="flex" flexShrink={0} sx={{ my: 1 }}>
          <CourseFilter
            canReset={canReset}
            filters={filters}
            onSetFilters={handleSetFilters}
            openFilter={openFilter}
            onOpenFilter={handleOpenFilter}
            onCloseFilter={handleCloseFilter}
            onResetFilter={() => setFilters(defaultFilters)}
            options={{
              genders: GENDER_OPTIONS,
              categories: CATEGORY_OPTIONS,
              ratings: RATING_OPTIONS,
              price: PRICE_OPTIONS,
              colors: COLOR_OPTIONS,
            }}
          />

          <CourseSort
            sortBy={sortBy}
            onSort={handleSort}
            options={[
              { value: 'featured', label: 'Featured' },
              { value: 'newest', label: 'Newest' },
              { value: 'priceDesc', label: 'Price: High-Low' },
              { value: 'priceAsc', label: 'Price: Low-High' },
            ]}
          />
        </Box>
      </Box>

      <Grid container spacing={3}>
        {_courses.map((product) => (
          <Grid key={product.id} xs={12} sm={6} md={3}>
            <CourseItem product={product} />
          </Grid>
        ))}
      </Grid>

      <Pagination count={10} color="primary" sx={{ mt: 8, mx: 'auto' }} />
    </DashboardContent>
  );
};

export default CourseView;
