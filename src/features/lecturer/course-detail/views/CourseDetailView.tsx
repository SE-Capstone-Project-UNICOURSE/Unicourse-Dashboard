import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './CourseDetailView.scss';

import GlobalBreadcrumb from '@app/common/components/GlobalBreadcrumb';
import DashboardContent from '@app/features/admin/dashboard/layouts/DashboardLayout/DashboardContent';
import useRouter from '@app/routes/hooks/useRouter';
import { useAppSelector } from '@app/stores';
import CourseDetailHeader from './components/CourseDetailHeader';
import CourseDetailInfo from './components/CourseDetailInfo';
import CourseModules from './components/CourseModules';
import CourseReview from './components/CourseReview';
import useCourseDetailViewModel from '../viewmodels/useCourseDetailViewModel';

const CourseDetailView = () => {
  const { id } = useParams();
  const router = useRouter();
  const { courseDetail } = useAppSelector((state) => state.courseDetailLecture);
  const { originalCourse, setOriginalCourse } =  useCourseDetailViewModel({ courseId: Number(id) });

  const breadcrumbItems = [
    { label: 'Khóa học', href: '/lecturer/courses' },
    { label: 'Chi tiết khóa học', href: `/lecturer/courses/${id}` }
  ];

  // Redirect if courseId is missing or invalid
  useEffect(() => {
    console.log('courseDetail', courseDetail);
    if (!id) {
      router.push('/lecturer/courses');
    } else if (courseDetail) {
      setOriginalCourse(courseDetail.data);
    }
  }, [id, router, courseDetail]);  // Ensure the redirection happens only when `id` changes

  return (
    <DashboardContent>
      <GlobalBreadcrumb items={breadcrumbItems} />
      <div className="course-detail-view">
        <CourseDetailHeader 
          loading={courseDetail.isLoadingGetCourseDetail} 
          courseDetail={courseDetail.data} 
        />
        <CourseReview 
          loading={courseDetail.isLoadingGetCourseDetail} 
          courseDetail={courseDetail.data} 
        />
        <CourseDetailInfo
          id={Number(id)} 
          originalCourse={originalCourse}
          loading={courseDetail.isLoadingGetCourseDetail} 
          courseDetail={courseDetail.data} 
        />
        <CourseModules 
          loading={courseDetail.isLoadingGetCourseDetail} 
          courseDetail={courseDetail.data} 
        />
      </div>
    </DashboardContent>
  );
};

export default CourseDetailView;