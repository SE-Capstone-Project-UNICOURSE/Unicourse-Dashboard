/* eslint-disable camelcase */
import GradientButton from '@app/common/components/atoms/GradientButton';
import { useAppDispatch, useAppSelector } from '@app/stores';
import { Box, Divider, IconButton, Typography } from '@mui/material';
import { GridAddIcon, GridDeleteIcon } from '@mui/x-data-grid';
import { FormProvider } from 'react-hook-form';
import { setTotalForm } from '../../slices';
import useEditCourseCalendarFormViewModel from '../../viewmodels/useEditCourseCalendarFormViewModel';
import CourseCalendarEditField from './CourseCalendarEditField';

type EditCourseCalendarFormProps = {
  indexItem: number;
  onDelete: (formId: number) => void;
  formRef?: (ref: any) => void;
};

const EditCourseCalendarForm = ({ indexItem, onDelete, formRef }: EditCourseCalendarFormProps) => {
  const { totalForm } = useAppSelector((state) => state.listCourseOfflineLecture);
  const isLastItem = indexItem === totalForm.length;
  const dispatch = useAppDispatch();

  const { methods, onSubmit } = useEditCourseCalendarFormViewModel(indexItem);
  const { handleSubmit, trigger } = methods;

  if (formRef) {
    formRef({ trigger, handleSubmit: handleSubmit(onSubmit) });
  }

  const handleAddNewForm = async () => {
    const isValid = await trigger();
    if (isValid) {
      await handleSubmit(onSubmit)();
      dispatch(setTotalForm([...totalForm, totalForm.length + 1]));
    } else {
      console.error('Form không hợp lệ');
    }
  };

  return (
    <FormProvider {...methods}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} position="relative">
        <Box my={2}>
          {isLastItem && (
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
            Tạo Mô Tả Buổi {indexItem}
          </Typography>
        </Box>

        <CourseCalendarEditField methods={methods} isDisable={!isLastItem} />

        {isLastItem && (
          <Box display="flex" justifyContent="flex-end" mt={2}>
            <GradientButton variant="outlined" onClick={handleAddNewForm}>
              <GridAddIcon /> Thêm buổi mới
            </GradientButton>
          </Box>
        )}
      </Box>
      <Divider textAlign="center">
        <GridAddIcon />
      </Divider>
    </FormProvider>
  );
};

export default EditCourseCalendarForm;
