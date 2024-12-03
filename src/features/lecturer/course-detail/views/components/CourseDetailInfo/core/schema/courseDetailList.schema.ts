import { Topic } from '@app/common/models/Course';
import * as Yup from 'yup';

interface courseDetailListFormValues {
    title: string;
    position: number;
    created_at: string;
    updated_at: string;
    status: string;
    course_id: number;
    topic: Topic[];
}

const courseDetailListValue: courseDetailListFormValues = {
    title: '',
    position: 0,
    created_at: '',
    updated_at: '',
    status: '',
    course_id: 0,
    topic: [],
};

const validationCourseDetailListSchema = Yup.object().shape({
    title: Yup.string().required('Tiêu đề chương là bắt buộc').min(10, 'Tiêu đề chương cần ít nhất 10 ký tự'),
    position: Yup.number().required('Vị trí là bắt buộc'),
    status: Yup.string()
        .oneOf(['PUBLISHED', 'DRAFT', 'CLOSED'], 'Trạng thái không hợp lệ')
        .required('Trạng thái là bắt buộc'),
    course_id: Yup.number().required('Khóa học là bắt buộc'),
    topic: Yup.array().of(
        Yup.object().shape({
            title: Yup.string().required('Tiêu đề là bắt buộc').min(10, 'Tiêu đề cần ít nhất 10 ký tự'),
            position: Yup.number().required('Vị trí là bắt buộc'),
            status: Yup.string()
                .oneOf(['PUBLISHED', 'DRAFT', 'CLOSED'], 'Trạng thái không hợp lệ')
                .required('Trạng thái là bắt buộc'),
            element_topic: Yup.object().shape({
                video: Yup.object().shape({
                    url: Yup.string().required('URL video là bắt buộc'),
                    duration: Yup.number().required('Thời lượng video là bắt buộc'),
                    platform: Yup.string().required('Nền tảng video là bắt buộc'),
                }),
            }),
        }),
    ),
});

export { courseDetailListValue, validationCourseDetailListSchema };
export type { courseDetailListFormValues };