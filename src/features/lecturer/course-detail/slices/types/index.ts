import { Category, Course, Vimeo } from '../../models';

interface DynamicArrayField {
  items: string[];
  errors: boolean[];
  isValid: boolean;
}

export type TabState = 'info' | 'chapter';

export interface CourseDetailScreenState {
  courseDetail: {
    isLoadingGetCourseDetail: boolean;
    data: Course | undefined;
  };
  categories: {
    isLoadingGetCategories: boolean;
    data: Array<Category> | undefined;
  };
  vimeoVideo: {
    isLoadingVimeoVideo: boolean;
    data: Vimeo | undefined;
  };
  previewImage: string;
  dynamicArrayFields: Record<string, DynamicArrayField>;
  activeTab: TabState;
}

export const initialCourseDetailScreenState: CourseDetailScreenState = {
  courseDetail: {
    data: undefined,
    isLoadingGetCourseDetail: false
  },
  categories: {
    data: undefined,
    isLoadingGetCategories: false,
  },
  vimeoVideo: {
    data: undefined,
    isLoadingVimeoVideo: false,
  },
  previewImage: '',
  dynamicArrayFields: {},
  activeTab: 'info' //  Default tab
};
