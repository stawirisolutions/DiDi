'use client';

import { Controller, useFormContext } from 'react-hook-form';
import Checkbox, { CheckboxProps } from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import { ReactNode } from 'react';

interface RHF_CHECKBOX_PROPS {
  name: string;
  helperText?: string;
  color?: CheckboxProps['color'];
  label?: string | ReactNode;
}

export function RHFCheckbox({ name, helperText, label, color = 'default', ...other }: RHF_CHECKBOX_PROPS) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div>
          <FormControlLabel 
            label={label} 
            control={<Checkbox 
              {...field}
              color='primary'
              checked={field.value} 
            />} 
            {...other} 
          />

          {(!!error || helperText) && (
            <FormHelperText error={!!error}>{error ? error?.message : helperText}</FormHelperText>
          )}
        </div>
      )}
    />
  );
}