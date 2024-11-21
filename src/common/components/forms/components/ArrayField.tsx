// import React from 'react';
// import { Box, Grid, IconButton, TextField, Button } from '@mui/material';
// import AddIcon from '@mui/icons-material/Add';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { Control, useFieldArray, FieldValues, Path } from 'react-hook-form';

// interface ArrayFieldProps<T extends FieldValues> {
//   name: Path<T>;
//   control: Control<T>;
//   label?: string;
//   placeholder?: string;
//   minItems?: number;
//   maxItems?: number;
//   error?: { [key: string]: string };
// }

// function ArrayField<T extends FieldValues>({
//   name,
//   control,
//   label,
//   placeholder = 'Enter a value',
//   minItems = 0,
//   maxItems = 10,
//   error = {},
// }: ArrayFieldProps<T>) {
//   const { fields, append, remove } = useFieldArray({
//     control,
//     name,
//   });

//   return (
//     <Box>
//       {label && <Box mb={1}>{label}</Box>}
//       <Grid container spacing={2}>
//         {fields.map((field, index) => (
//           <Grid container item spacing={2} key={field.id} alignItems="center">
//             <Grid item xs={10}>
//               <TextField
//                 fullWidth
//                 placeholder={placeholder}
//                 defaultValue={field.value || ''}
//                 error={!!error[`${name}.${index}`]}
//                 helperText={error[`${name}.${index}`] || ''}
//                 onChange={(e) =>
//                   control.setValue(`${name}.${index}` as Path<T>, e.target.value, {
//                     shouldValidate: true,
//                   })
//                 }
//               />
//             </Grid>
//             <Grid item xs={2}>
//               <IconButton
//                 color="error"
//                 onClick={() => remove(index)}
//                 disabled={fields.length <= minItems}
//               >
//                 <DeleteIcon />
//               </IconButton>
//             </Grid>
//           </Grid>
//         ))}
//       </Grid>
//       <Button
//         startIcon={<AddIcon />}
//         onClick={() => fields.length < maxItems && append('')}
//         disabled={fields.length >= maxItems}
//         sx={{ mt: 2 }}
//       >
//         Add Item
//       </Button>
//     </Box>
//   );
// }

// export default ArrayField;