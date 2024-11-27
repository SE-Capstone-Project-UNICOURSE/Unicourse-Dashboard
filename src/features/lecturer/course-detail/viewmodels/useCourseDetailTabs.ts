import { useAppDispatch, useAppSelector } from '@app/stores';
import { setActiveTab } from '../slices';

const useCourseDetailTabs = () => {
  const dispatch = useAppDispatch();
  const activeTab = useAppSelector((state) => state.courseDetailLecture.activeTab);

  const handleTabChange = (tab: string) => {
    dispatch(setActiveTab(tab));
  };

  return {
    activeTab,
    handleTabChange,
  };
};

export default useCourseDetailTabs;
