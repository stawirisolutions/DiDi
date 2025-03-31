'use client';

import { Controller, useFormContext } from 'react-hook-form';
import TextField, { TextFieldProps } from '@mui/material/TextField';

interface RTF extends Omit<TextFieldProps, 'name'> {
  name: string;
  placeholder: string;
}

export default function RHFTextField({ name, placeholder, ...other }: RTF) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          placeholder={placeholder}
          error={!!error}
          helperText={error?.message}
          {...other}
        />
      )}
    />
  );
}