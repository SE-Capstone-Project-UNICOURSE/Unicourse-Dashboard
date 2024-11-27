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

const useCourseDetailViewModel = ({ courseId }: { courseId: number }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const accessToken = localStorage.getItem('accessToken');
  const { isFirstLoadCategory } = useAppSelector((state) => state.courseDetailLecture);
  const { courseDetail } = useAppSelector((state) => state.courseDetailLecture);
  const { id } = useParams();

  // FORM ZONE
  const methods = useForm<CourseFormValues>({
    resolver: yupResolver(validationSchema),
    defaultValues: courseDetailInfoValue,
  });

  // Fetch course details for the given courseId if token exists
  useEffect(() => {
    // If no access token, redirect to sign-in
    if (!accessToken) {
      router.push('/sign-in');
    } else if (courseId) {
      // Dispatch action to get course details by id
      dispatch(
        getCourseDetailById({
          accessToken: accessToken || '',
          courseId,
        })
      );
    }
  }, [accessToken, courseId, dispatch, router]); // Add `dispatch` and `router` as dependencies

  // Fetch categories only if it's the first time loading
  useEffect(() => {
    if (isFirstLoadCategory) {
      dispatch(getCategories());
    }
  }, [isFirstLoadCategory, dispatch]); // Ensure dispatch is included as a dependency

  // INITIALIZE ZONE
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

  // REACT HOOK FORM
  const onSubmit = async (data: CourseFormValues) => {
    // Trigger validation for all fields
    dispatch(submitDynamicArrayField('learning_outcome'));
    dispatch(submitDynamicArrayField('requirements'));

    // Check if the form is valid and if dynamic array fields are valid
    if (!newLearningOutcome.isValid || !newRequirements.isValid) {
      return; // Prevent form submission if invalid
    }

    // Proceed with form submission
    const finalData = {
      ...data,
      learning_outcome: newLearningOutcome.items,
      requirements: newRequirements.items,
    };
    console.log('Form submitted:', finalData);
  };

  useEffect(() => {
    if (!id) {
      router.push('/lecturer/courses');
    }
  }, [id]);

  return {
    methods,
    onSubmit,
  };
};

export default useCourseDetailViewModel;
