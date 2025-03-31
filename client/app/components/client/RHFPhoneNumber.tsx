'use client';

import { Controller, useFormContext } from 'react-hook-form';
import { FormControl, FormHelperText, Typography } from '@mui/material';
import PhoneInput from 'react-phone-input-2'; // Replace with your actual import

// Define the props for the RHFPhoneNumber component
interface RHFPhoneNumberProps {
  name: string;
  helperText?: string;
  defaultCountry?: string;
}

export function RHFPhoneNumber({ 
  name, 
  helperText,
  defaultCountry = 'ke' // Default to Kenya
}: RHFPhoneNumberProps) {
  const { control, formState: { errors } } = useFormContext();
  const error = errors[name];

  return (
    <FormControl fullWidth error={!!error}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <>
            <PhoneInput
              {...field}
              country={defaultCountry}
              // Only pass props that your PhoneInput accepts
              // Removed label, helperText, and error props
            />
            
            {(error || helperText) && (
              <FormHelperText error={!!error}>
                {error ? (error.message as string) : helperText}
              </FormHelperText>
            )}
          </>
        )}
      />
    </FormControl>
  );
}

export default RHFPhoneNumber;