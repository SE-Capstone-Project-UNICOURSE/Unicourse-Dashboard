import { Scrollbar } from '@app/common/components/scrollbar';
import useRouter from '@app/routes/hooks/useRouter';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import LecturerCourseItem from './LecturerCourseItem';

// Updated course list with revenue calculation
const title = 'Danh sách khoá học nổi bật';
const list = [
  {
    id: '1',
    title: 'UI/UX Design with Adobe XD',
    price: 89,
    sold: 20,
    revenue: 1780,
    category: 'UI/X',
  },
  {
    id: '2',
    title: 'Introduction to Machine Learning',
    price: 120,
    sold: 75,
    revenue: 9000,
    category: 'ML',
  },
  {
    id: '3',
    title: 'Advanced React Development',
    price: 150,
    sold: 90,
    revenue: 13500,
    category: 'React',
  },
];

const AnalyticsTopCourses = () => {
  const router = useRouter();
  return (
    <Card>
      <CardHeader style={{ paddingBottom: 10 }} title={title} />

      <Scrollbar sx={{ maxHeight: 400 }}>
        <Stack divider={<Divider sx={{ borderStyle: 'dashed' }} />} px={2}>
          {list.map((item) => (
            <LecturerCourseItem
              key={item.id}
              title={item.title}
              price={item.price}
              sold={item.sold}
              revenue={item.revenue}
              category={item.category}
            />
          ))}
        </Stack>
      </Scrollbar>
    </Card>
  );
};

export default AnalyticsTopCourses;
