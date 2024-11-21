import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './CourseDetailView.scss';

import GlobalBreadcrumb from '@app/common/components/GlobalBreadcrumb';
import DashboardContent from '@app/features/admin/dashboard/layouts/DashboardLayout/DashboardContent';
import useRouter from '@app/routes/hooks/useRouter';
import { useAppSelector } from '@app/stores';
import useCourseDetailViewModel from '../viewmodels/useCourseDetailViewModel';
import CourseDetailHeader from './components/CourseDetailHeader';
import CourseDetailInfo from './components/CourseDetailInfo';
import CourseModules from './components/CourseModules';
import CourseReview from './components/CourseReview';

const CourseDetailView = () => {
  const { id } = useParams();
  const router = useRouter();
  const { courseDetail } = useAppSelector((state) => state.courseDetailLecture);
  const { editMode, setEditMode } = useCourseDetailViewModel({ courseId: Number(id) });

  const breadcrumbItems = [
    { label: 'Khóa học', href: '/lecturer/courses' },
    { label: 'Chi tiết khóa học', href: `/lecturer/courses/${id}` }
  ];

  // Redirect if courseId is missing or invalid
  useEffect(() => {
    if (!id) {
      router.push('/lecturer/courses');
    }
  }, [id]);

  return (
    <DashboardContent>
      <GlobalBreadcrumb items={breadcrumbItems} />
      <div className="course-detail-view">
        <CourseDetailHeader editMode={editMode} setEditMode={setEditMode} loading={courseDetail.isLoadingGetCourseDetail} courseDetail={courseDetail.data} />
        <CourseReview loading={courseDetail.isLoadingGetCourseDetail} courseDetail={courseDetail.data}/>
        <CourseDetailInfo loading={courseDetail.isLoadingGetCourseDetail} courseDetail={courseDetail.data} editMode={editMode} setEditMode={setEditMode} />
        <CourseModules loading={courseDetail.isLoadingGetCourseDetail} courseDetail={courseDetail.data}/>
      </div>
    </DashboardContent>
  );
};

export default CourseDetailView;
