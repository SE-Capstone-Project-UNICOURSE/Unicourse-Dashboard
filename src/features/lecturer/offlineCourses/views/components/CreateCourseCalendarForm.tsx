import GradientButton from '@app/common/components/atoms/GradientButton';
import { useAppSelector } from '@app/stores';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Divider, IconButton, Typography } from '@mui/material';
import { GridAddIcon, GridDeleteIcon } from '@mui/x-data-grid';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { courseMentorSessionSchema } from '../../schema/courseMentorSession.schema';
import {
  CourseMentorSessionFormValues,
  courseMentorSessionFormValues,
} from '../../types/courseMentorSessionFormValues';
import CourseCalenderCreateField from './CourseCalenderCreateField';

type CreateCourseCalendarFormProps = {
  indexItem: number;
  onDelete: (formId: number) => void;
  addNewForm: () => void;
  formRef?: (ref: any) => void;
};

const CreateCourseCalendarForm = ({
  indexItem,
  onDelete,
  addNewForm,
  formRef,
}: CreateCourseCalendarFormProps) => {
  const { totalForm } = useAppSelector((state) => state.listCourseOfflineLecture);
  const isLastItem = indexItem === totalForm.length - 1; // Kiểm tra nếu đây là form cuối cùng

  const methods = useForm<CourseMentorSessionFormValues>({
    resolver: yupResolver(courseMentorSessionSchema),
    defaultValues: courseMentorSessionFormValues,
  });

  const { handleSubmit, trigger } = methods;

  if (formRef) {
    formRef({ trigger, handleSubmit });
  }

  const onSubmit: SubmitHandler<CourseMentorSessionFormValues> = (data) => {
    console.log('Submitted Data:', data);
  };

  return (
    <FormProvider {...methods}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} position="relative">
        <Box my={2}>
          {isLastItem && ( // Chỉ cho phép xóa nếu là form cuối cùng
            <IconButton
              onClick={() => onDelete(indexItem)}
              style={{
                position: 'absolute',
                top: 8,
                right: 8,
                marginBottom: 30,
                color: 'red',
              }}
              aria-label="delete"
            >
              <GridDeleteIcon />
            </IconButton>
          )}
          <Typography variant="h4" gutterBottom>
            Tạo Mô Tả Buổi {indexItem + 1}
          </Typography>
        </Box>

        {/* Truyền prop `isDisabled` xuống các trường */}
        <CourseCalenderCreateField methods={methods} isDisable={!isLastItem} />
      </Box>
      <Divider textAlign="center">
        <GridAddIcon />
      </Divider>
      {isLastItem && ( // Chỉ hiển thị nút thêm buổi mới nếu là form cuối cùng
        <Box display="flex" justifyContent="flex-end" mt={2}>
          <GradientButton variant="outlined" onClick={addNewForm}>
            <GridAddIcon /> Thêm buổi mới
          </GradientButton>
        </Box>
      )}
    </FormProvider>
  );
};

export default CreateCourseCalendarForm;
