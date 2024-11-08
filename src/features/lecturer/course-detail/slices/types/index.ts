import { Category, Course } from "../../models";

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
};
