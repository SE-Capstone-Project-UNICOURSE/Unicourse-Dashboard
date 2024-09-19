import { useCallback, useState } from 'react';

import Iconify from '@app/components/iconify/Iconify';
import { DashboardContent } from '@features/dashboard';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { PostItem } from '../components/PostItem';
import { PostSearch } from '../components/PostSearch';
import { PostSort } from '../components/PostSort';

// ----------------------------------------------------------------------

const hardcodedPosts = [
  {
    id: 1,
    title: 'Hardcoded Post 1',
    author: { name: 'John Doe', avatarUrl: 'path-to-avatar-1.jpg' },
    coverUrl: 'path-to-cover-1.jpg',
    totalComments: 12,
    totalViews: 100,
    totalShares: 50,
    postedAt: '2023-09-18',
  },
  {
    id: 2,
    title: 'Hardcoded Post 2',
    author: { name: 'Jane Smith', avatarUrl: 'path-to-avatar-2.jpg' },
    coverUrl: 'path-to-cover-2.jpg',
    totalComments: 5,
    totalViews: 80,
    totalShares: 30,
    postedAt: '2023-09-17',
  },
  {
    id: 3,
    title: 'Hardcoded Post 3',
    author: { name: 'Alice Johnson', avatarUrl: 'path-to-avatar-3.jpg' },
    coverUrl: 'path-to-cover-3.jpg',
    totalComments: 20,
    totalViews: 150,
    totalShares: 70,
    postedAt: '2023-09-16',
  },
  {
    id: 4,
    title: 'Hardcoded Post 4',
    author: { name: 'Bob Williams', avatarUrl: 'path-to-avatar-4.jpg' },
    coverUrl: 'path-to-cover-4.jpg',
    totalComments: 8,
    totalViews: 90,
    totalShares: 40,
    postedAt: '2023-09-15',
  },
];

export function BlogView() {
  const [sortBy, setSortBy] = useState('latest');

  const handleSort = useCallback((newSort: string) => {
    setSortBy(newSort);
  }, []);

  return (
    <DashboardContent>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          Blog
        </Typography>
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="mingcute:add-line" />}
        >
          New post
        </Button>
      </Box>

      <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ mb: 5 }}>
        <PostSearch />
        <PostSort
          sortBy={sortBy}
          onSort={handleSort}
          options={[
            { value: 'latest', label: 'Latest' },
            { value: 'popular', label: 'Popular' },
            { value: 'oldest', label: 'Oldest' },
          ]}
        />
      </Box>

      <Grid container spacing={3}>
        {hardcodedPosts.map((post, index) => {
          const latestPostLarge = index === 0;
          const latestPost = index === 1 || index === 2;

          return (
            <Grid key={post.id} xs={12} sm={latestPostLarge ? 12 : 6} md={latestPostLarge ? 6 : 3}>
              <PostItem post={post} latestPost={latestPost} latestPostLarge={latestPostLarge} />
            </Grid>
          );
        })}
      </Grid>

      <Pagination count={10} color="primary" sx={{ mt: 8, mx: 'auto' }} />
    </DashboardContent>
  );
}
