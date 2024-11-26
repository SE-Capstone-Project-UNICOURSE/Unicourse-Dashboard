import { Category, Course, Vimeo } from "../../models";

interface DynamicArrayField {
    items: string[];
    errors: boolean[];
    isValid: boolean;
  }

export interface CourseDetailScreenState {
    courseDetail: {
        isLoadingGetCourseDetail: boolean;
        data: Course | undefined;
    };
    isFirstLoadCategory: boolean;
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
}

export const initialCourseDetailScreenState: CourseDetailScreenState = {
    courseDetail: {
        data: undefined,
        isLoadingGetCourseDetail: false,
    },
    isFirstLoadCategory: true,
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
};