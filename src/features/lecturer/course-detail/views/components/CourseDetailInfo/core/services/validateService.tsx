import { UseFormClearErrors, UseFormSetError } from 'react-hook-form';
import { CourseFormValues } from '../schema/courseDetailInfo.schema';
import { FORM_FIELD } from '../constants';

const validationArrayString = (
  setError: UseFormSetError<CourseFormValues>,
  clearErrors: UseFormClearErrors<CourseFormValues>,
  field: string,
  value: any,
  index: number
): boolean => {
  // if (field === FORM_FIELD.LEARNING_OUTCOME) {
  //   if (value[index].length < 1) {
  //     setError(`learning_outcome.${index}`, {
  //       type: 'min',
  //       message: 'Mục tiêu không được bỏ trống',
  //     });
  //     return false;
  //   } else {
  //     clearErrors(`learning_outcome.${index}`);
  //     return true;
  //   }
  // } else if (field === FORM_FIELD.REQUIREMENTS) {
  //   if (value[index].length < 1) {
  //     setError(`requirements.${index}`, {
  //       type: 'min',
  //       message: 'Yêu cầu không được bỏ trống',
  //     });
  //     return false;
  //   } else {
  //     clearErrors(`requirements.${index}`);
  //     return true;
  //   }
  // }
  return true;
};

export { validationArrayString };
