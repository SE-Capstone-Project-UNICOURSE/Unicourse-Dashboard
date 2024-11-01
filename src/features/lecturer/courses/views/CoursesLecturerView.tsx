import { Card, CardContent, CardHeader } from '@mui/material';
import DashboardContent from '@app/features/admin/dashboard/layouts/DashboardLayout/DashboardContent';
import './CourseLecturerView.scss';
import CourseTable from './components/CourseTable';
import CoursesHeader from './components/CoursesHeader';
import CoursesPagination from './components/CoursesPagination';
import TableHeader from './components/TableHeader';
import useListCourseViewModel from '../viewmodels/useListCourseViewModel';
import { useAppSelector } from '@app/stores';

const CourseLecturerView = () => {
  const { pageOption, handleChange } = useListCourseViewModel();
  const { listCourse } = useAppSelector((state) => state.listCourseLecture);

  return (
    <DashboardContent className="container">
      {/* Header */}
      <CoursesHeader />

      {/* List of Courses */}
      <Card variant="outlined">
        {/* Header of the card */}
        <CardHeader component={TableHeader} />
        {/* Table of courses */}
        <CardContent>
          <CourseTable
            isLoadingGetListCourse={listCourse.isLoadingGetListCourse}
            data={listCourse.data}
          />

          {/* Pagination */}
          <CoursesPagination
            totalPages={listCourse?.data?.totalPages || 0} // Pass page count here
            pageOption={pageOption}
            onChange={handleChange}
          />
        </CardContent>
      </Card>
    </DashboardContent>
  );
};

export default CourseLecturerView;
