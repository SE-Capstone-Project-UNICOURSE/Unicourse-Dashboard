import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './CourseDetailView.scss';

import DashboardContent from '@app/features/admin/dashboard/layouts/DashboardLayout/DashboardContent';
import CourseDetailHeader from './components/CourseDetailHeader';
import CourseDetailInfo from './components/CourseDetailInfo';
import CourseModules from './components/CourseModules';
import CourseActions from './components/CourseActions';
import GlobalBreadcrumb from '@app/common/components/GlobalBreadcrumb';
import useCourseDetailViewModel from '../viewmodels/useCourseDetailViewModel';
import { useAppSelector } from '@app/stores';
import useRouter from '@app/routes/hooks/useRouter';

const CourseDetailView = () => {
  const { id } = useParams();
  const router = useRouter();
  const { courseDetail, categories } = useAppSelector((state) => state.courseDetailLecture);
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
        <CourseDetailInfo loading={courseDetail.isLoadingGetCourseDetail} courseDetail={courseDetail.data} categories={categories} editMode={editMode} setEditMode={setEditMode} />
        {/* <CourseActions /> */}
        {/* <CourseModules /> */}
      </div>
    </DashboardContent>
  );
};

export default CourseDetailView;
