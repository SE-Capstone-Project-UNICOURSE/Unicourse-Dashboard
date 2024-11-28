import useRouter from '@app/routes/hooks/useRouter';
import { useAppDispatch, useAppSelector } from '@app/stores';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { getCategories, getCourseDetailById } from '../slices/actions';
import {
  courseDetailInfoValue,
  CourseFormValues,
  validationSchema,
} from '../views/components/CourseDetailInfo/core/schema/courseDetailInfo.schema';
import { useParams } from 'react-router-dom';
import { submitDynamicArrayField } from '../slices';
import CourseDetailService from '../services';
import { updateCoursePayload } from '../types/courseDetailCreationFormValues';
import { hideDialog, showDialog } from '@app/stores/slices/dialogSlice';
import { DialogType } from '@app/stores/types/dialogSlice.type';

const useCourseDetailViewModel = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const accessToken = localStorage.getItem('accessToken');
  const { courseDetail } = useAppSelector((state) => state.courseDetailLecture);
  const { id } = useParams();
  const methods = useForm<CourseFormValues>({
    resolver: yupResolver(validationSchema),
    defaultValues: courseDetailInfoValue,
  });

  // INITIALIZATION ZONE
  useEffect(() => {
    if (!id) {
      router.push('/lecturer/courses');
    }
  }, [id]);

  useEffect(() => {
    // If no access token, redirect to sign-in
    if (!accessToken) {
      router.push('/sign-in');
    } else if (id) {
      // Dispatch action to get course details by id
      dispatch(
        getCourseDetailById({
          accessToken: accessToken || '',
          courseId: Number(id),
        })
      );
    }
  }, [accessToken, id, dispatch, router]);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]); // Ensure dispatch is included as a dependency

  useEffect(() => {
    if (courseDetail.data) {
      methods.reset({
        title: courseDetail.data.title,
        price: courseDetail.data.price,
        title_description: courseDetail.data.title_description,
        description: courseDetail.data.description,
        learning_outcome: courseDetail.data.learning_outcome || [],
        requirements: courseDetail.data.requirements || [],
        category_id: courseDetail.data.category_id,
        status: courseDetail.data.status,
      });
    }
  }, [courseDetail.data, id]);

  // Access Redux state for dynamic array fields outside the onSubmit function
  const newLearningOutcome = useAppSelector(
    (state) => state.courseDetailLecture.dynamicArrayFields.learning_outcome
  );
  const newRequirements = useAppSelector(
    (state) => state.courseDetailLecture.dynamicArrayFields.requirements
  );

  // REACT HOOK FORM ZONE: FORM FOR BASIC COURSE INFO
  const onSubmit = async (data: CourseFormValues) => {
    // Trigger validation for all fields
    dispatch(submitDynamicArrayField('learning_outcome'));
    dispatch(submitDynamicArrayField('requirements'));

    // Check if the form is valid and if dynamic array fields are valid
    if (!newLearningOutcome.isValid || !newRequirements.isValid) {
      return;
    }

    const payload: updateCoursePayload = {
      id: Number(id),
      title: data.title,
      price: data.price,
      title_description: data.title_description,
      description: data.description,
      learning_outcome: newLearningOutcome.items,
      requirements: newRequirements.items,
      category_id: data.category_id,
      // thumbnail: data.thumbnail,
      status: data.status,
    };

    if (!accessToken) {
      // Show error dialog if the user is not logged in
      dispatch(
        showDialog({
          title: 'Lỗi',
          content: 'Không tìm thấy người dùng vui lòng đăng nhập lại',
          onConfirm() {
            dispatch(hideDialog());
            router.push('/sign-in');
            localStorage.clear();
          },
          onCancel() {
            dispatch(hideDialog());
            router.push('/sign-in');
            localStorage.clear();
          },
          type: DialogType.ERROR,
        })
      );
      return;
    }

    // PROCESS API ZONE
    try {
      const response = await CourseDetailService.updateCourseDetail(payload, accessToken);
      if (response.status === 201) {
        dispatch(getCourseDetailById({ accessToken, courseId: Number(id) }));
        dispatch(
          showDialog({
            title: 'Thành công',
            content: 'Cập nhật khóa học thành công.',
            type: DialogType.SUCCESS,
          })
        );
      }
    } catch (error) {
      console.error(error);
      dispatch(
        showDialog({
          title: 'Lỗi',
          content: 'Đã xảy ra lỗi cập nhật khóa học, vui lòng thử lại.',
          type: DialogType.ERROR,
        })
      );
    }
  };

  return {
    methods,
    onSubmit,
  };
};

export default useCourseDetailViewModel;
