import Iconify from '@app/common/components/iconify/Iconify';
import Autocomplete, { autocompleteClasses } from '@mui/material/Autocomplete';
import InputAdornment from '@mui/material/InputAdornment';
import type { SxProps, Theme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

// ----------------------------------------------------------------------

type Post = {
  id: number;
  title: string;
};

type PostSearchProps = {
  sx?: SxProps<Theme>;
};

// Hardcoded posts data
const posts: Post[] = [
  { id: 1, title: 'How to use React' },
  { id: 2, title: 'Understanding TypeScript' },
  { id: 3, title: 'Material UI Customization' },
  { id: 4, title: 'React Router v6 Guide' },
  { id: 5, title: 'State Management in React' },
];

export function PostSearch({ sx }: PostSearchProps) {
  return (
    <Autocomplete
      sx={{ width: 280 }}
      autoHighlight
      popupIcon={null}
      slotProps={{
        paper: {
          sx: {
            width: 320,
            [`& .${autocompleteClasses.option}`]: {
              typography: 'body2',
            },
            ...sx,
          },
        },
      }}
      options={posts}
      getOptionLabel={(post) => post.title}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Search post..."
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <Iconify
                  icon="eva:search-fill"
                  sx={{ ml: 1, width: 20, height: 20, color: 'text.disabled' }}
                />
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  );
}
