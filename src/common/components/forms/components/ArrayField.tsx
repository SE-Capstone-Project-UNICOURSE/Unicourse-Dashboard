import React from 'react';
import { Box, Grid, IconButton, TextField, Button, Typography } from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import useDynamicArrayField from '@app/features/lecturer/course-detail/viewmodels/useDynamicArrayField';

export interface ArrayProps {
  column: number;
  placeholder?: string;
  buttonText: string;
  initialValues?: string[];
  fieldName?: string;
}

export interface ArrayFieldProps {
  label: string;
  arrayProps: ArrayProps;
}

const ArrayField: React.FC<ArrayFieldProps> = ({ label, arrayProps }) => {
  const { items, errors, isValid, handleInputChange, addItem, removeItem } = useDynamicArrayField({
    fieldName: arrayProps.fieldName || '',
    initialValues: arrayProps.initialValues || [''],
  });

  return (
    <Box>
      <Grid container spacing={2}>
        {items.map((item, index) => (
          <Grid item xs={12 / arrayProps.column} key={index}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={10}>
                {/* Input field spanning 10/12 of the space */}
                <TextField
                  fullWidth
                  value={item}
                  placeholder={arrayProps.placeholder}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  error={errors[index]}
                  helperText={errors[index] ? 'Thông tin không hợp lệ' : ''}
                  label={`${label} ${index + 1}`}
                />
              </Grid>
              <Grid item xs={2}>
                {/* Delete button spanning 2/12 of the space */}
                <IconButton
                  color="error"
                  onClick={() => removeItem(index)}
                  disabled={items.length === 1} // Prevent removing the last item
                >
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Grid>
      <Button startIcon={<AddIcon />} onClick={addItem} variant="contained" sx={{ mt: 2 }}>
        {arrayProps.buttonText}
      </Button>
    </Box>
  );
};

export default ArrayField;
