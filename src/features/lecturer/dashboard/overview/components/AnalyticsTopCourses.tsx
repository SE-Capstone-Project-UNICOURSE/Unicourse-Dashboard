import { Scrollbar } from '@app/common/components/scrollbar';
import useRouter from '@app/routes/hooks/useRouter';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import LecturerCourseItem from './LecturerCourseItem';

// Updated course list with revenue calculation

type AnalyticsTopCoursesProps = {
  title?: string;
};

const AnalyticsTopCourses = ({
  title = 'Danh sách khoá học nổi bật',
}: AnalyticsTopCoursesProps) => {
  const router = useRouter();
  return (
    <Card>
      <CardHeader style={{ paddingBottom: 10 }} title={title} />

      <Scrollbar sx={{ maxHeight: 400 }}>
        <Stack divider={<Divider sx={{ borderStyle: 'dashed' }} />} px={2}>
          <LecturerCourseItem />
        </Stack>
      </Scrollbar>
    </Card>
  );
};

export default AnalyticsTopCourses;
