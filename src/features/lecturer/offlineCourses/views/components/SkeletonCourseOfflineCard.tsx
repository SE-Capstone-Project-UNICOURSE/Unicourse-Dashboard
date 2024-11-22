import { Card, CardActions, CardContent, Grid, Skeleton } from '@mui/material';

const SkeletonCourseOfflineCard = () => (
  <Grid container spacing={2}>
    {Array.from(new Array(8)).map((_, index) => (
      <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
        <Card>
          <Skeleton
            variant="rectangular"
            sx={{ width: '100%', height: { xs: 90, sm: 120, md: 140, lg: 180 } }}
          />
          <CardContent>
            <Skeleton variant="text" width="60%" />
            <Skeleton variant="text" width="80%" />
            <Skeleton variant="text" width="40%" />
          </CardContent>
          <CardActions>
            <Skeleton variant="rectangular" width="45%" height={36} sx={{ mr: 1 }} />
            <Skeleton variant="rectangular" width="45%" height={36} />
          </CardActions>
        </Card>
      </Grid>
    ))}
  </Grid>
);
export default SkeletonCourseOfflineCard;
