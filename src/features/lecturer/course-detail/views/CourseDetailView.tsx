import GlobalBreadcrumb from '@app/common/components/GlobalBreadcrumb';
import DashboardContent from '@app/features/admin/dashboard/layouts/DashboardLayout/DashboardContent';
import { useAppSelector } from '@app/stores';
import { Box, Tab, Tabs } from '@mui/material';
import { FormProvider } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import useCourseDetailTabs from '../viewmodels/useCourseDetailTabs';
import useCourseDetailViewModel from '../viewmodels/useCourseDetailViewModel';
import CourseDetailHeader from './components/CourseDetailHeader';
import CourseDetailInfo from './components/CourseDetailInfo';
import CourseModules from './components/CourseModules';
import CourseReview from './components/CourseReview';
import './CourseDetailView.scss';

const CourseDetailView = () => {
  const { id } = useParams();
  const { methods, onSubmit } = useCourseDetailViewModel({ courseId: Number(id) });
  const { courseDetail } = useAppSelector((state) => state.courseDetailLecture);

  // BEHAVIOR STATE
  const { activeTab, handleTabChange } = useCourseDetailTabs();
  const breadcrumbItems = [
    { label: 'Khóa học', href: '/lecturer/courses' },
    { label: 'Chi tiết khóa học', href: `/lecturer/courses/${id}` },
  ];

  const { handleSubmit } = methods;

  return (
    <DashboardContent>
      <GlobalBreadcrumb items={breadcrumbItems} />
      <div className="course-detail-view">
        <CourseDetailHeader
          loading={courseDetail.isLoadingGetCourseDetail}
          courseDetail={courseDetail.data}
        />

        <Box>
          <Tabs
            value={activeTab}
            onChange={(e, value) => handleTabChange(value)}
            aria-label="course detail tabs"
          >
            <Tab label="Thông tin chi tiết" value="info" />
            <Tab label="Chương học" value="chapter" />
          </Tabs>
        </Box>

        <CourseReview
          loading={courseDetail.isLoadingGetCourseDetail}
          courseDetail={courseDetail.data}
        />

        {/* Tab Content */}
        <Box sx={{ mt: 3 }}>
          {activeTab === 'info' && (
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <CourseDetailInfo methods={methods} />
              </form>
            </FormProvider>
          )}
          {activeTab === 'chapter' && (
            <CourseModules
              loading={courseDetail.isLoadingGetCourseDetail}
              courseDetail={courseDetail.data}
            />
          )}
        </Box>
      </div>
    </DashboardContent>
  );
};

export default CourseDetailView;
