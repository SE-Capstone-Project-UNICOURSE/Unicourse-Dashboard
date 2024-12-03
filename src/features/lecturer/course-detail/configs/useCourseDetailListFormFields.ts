import { FormFieldConfig } from '@app/common/components/forms/configs/FormFieldConfig';
import { useAppDispatch, useAppSelector } from '@app/stores';
import { useFormContext } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { courseDetailListFormValues } from '../views/components/CourseDetailInfo/core/schema/courseDetailList.schema';

export const useCourseDetailListFormFields = (): FormFieldConfig<courseDetailListFormValues>[] => {
    const dispatch = useAppDispatch();
      const { courseDetail } = useAppSelector((state) => state.courseDetailLecture);
      const { id } = useParams();

      const methods = useFormContext<courseDetailListFormValues>()

      const { trigger } = methods
    
      const config: FormFieldConfig<courseDetailListFormValues>[] = [
        {
            name: 'title',
            label: 'Tiêu đề',
            inputType: 'input',
            grid: { xs: 12, sm: 6, md: 12 },
            inputProps: {
              onBlur: () => trigger('title'),
            },
        },
      ];
    
      return config;
};