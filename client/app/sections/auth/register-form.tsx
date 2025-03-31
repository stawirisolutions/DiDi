'use client';

import { useState } from 'react';
import { useForm, FormProvider, Resolver, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Typography, Button, Alert, Link as MuiLink, FormLabel, RadioGroup, FormControlLabel, Radio, FormControl, FormHelperText } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Import from client components directory
import { RHFTextField, RHFCheckbox, RHFPhoneNumber } from '@/app/components/client';

// Define form data type
interface RegisterFormData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
  role: string;
}

// Form validation schema
const registerSchema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  phoneNumber: yup.string().required('Phone number is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
  confirmPassword: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password')], 'Passwords must match'),
  terms: yup
    .boolean()
    .oneOf([true], 'You must accept the terms and conditions'),
  role: yup
    .string()
    .required('Please select an account type')
    .oneOf(['Customer', 'Vendor'], 'Invalid account type')
});

export default function RegisterForm() {
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [accountStatus, setAccountStatus] = useState('');
  
  const methods = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema) as Resolver<RegisterFormData>,
    defaultValues: {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
      password: '',
      confirmPassword: '',
      terms: false,
      role: 'Customer' // Default role
    },
    mode: 'onChange', // Validate on change for real-time feedback
  });
  
  const { handleSubmit, formState: { errors }, register, watch } = methods;
  const selectedRole = watch('role');

  const router = useRouter();
  
  const onSubmit = async (data: RegisterFormData) => {
    setIsSubmitting(true);
    setError('');
    setAccountStatus('');
    
    try {
      console.log('Form submitted:', data);
      
      try {
        const response = await fetch('http://localhost:8000/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        
        if (response.ok) {
          setAccountStatus('success');
          
          // Redirect based on role
          if (data.role === 'Vendor') {
            setTimeout(() => {
              router.push('/dashboard/vendor');
            }, 1500);
          } else {
            setTimeout(() => {
              router.push('/dashboard/customer');
            }, 1500);
          }
        } else {
          // Your existing error handling code...
          const responseClone = response.clone();
          
          try {
            const result = await response.json();
            if (result.error === 'ACCOUNT_EXISTS') {
              setError('An account with this email already exists. Please login instead.');
            } else {
              setError(result.error || 'Failed to create account. Please try again.');
            }
          } catch (jsonError) {
            try {
              const errorText = await responseClone.text();
              setError(errorText || 'Failed to create account. Please try again.');
            } catch (textError) {
              setError('Failed to create account. Please try again later.');
            }
          }
        }
      } catch (fetchError) {
        console.error('Fetch error:', fetchError);
        setError('Network error while creating account. Please check your connection and try again.');
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred during registration';
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className='flex flex-col gap-8 w-full'>
      <div className='text-center mb-4'>
        <Typography variant="h4" gutterBottom className="font-extrabold">
          Sign Up
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Enter your information to create an account.
        </Typography>
      </div>
      
      {error && (
        <Alert severity="error" className="mb-4">
          {error}
        </Alert>
      )}
      
      {accountStatus === 'success' && (
        <Alert severity="success" className="mb-4">
          Account created successfully! You will be redirected to your dashboard shortly.
        </Alert>
      )}
      
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-8'>
          {/* Account Type Selection */}
          <FormControl component="fieldset" fullWidth error={!!errors.role}>
            <FormLabel component="legend">Account Type</FormLabel>
            <Controller
              control={methods.control}
              name="role"
              render={({ field }) => (
                <RadioGroup
                  row
                  {...field}
                >
                  <FormControlLabel value="Customer" control={<Radio />} label="Customer" />
                  <FormControlLabel value="Vendor" control={<Radio />} label="Vendor" />
                </RadioGroup>
              )}
            />
            {errors.role && (
              <FormHelperText error>{errors.role.message}</FormHelperText>
            )}
            {selectedRole === 'Vendor' && (
              <Typography variant="body2" color="textSecondary" className="mt-1">
                As a vendor, you'll be able to list and sell products on our platform.
              </Typography>
            )}
          </FormControl>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <RHFTextField
              name="firstName"
              label="First Name"
              placeholder="Enter your first name"
            />
            
            <RHFTextField
              name="lastName"
              label="Last Name"
              placeholder="Enter your last name"
            />
          </div>
          
          <div className="space-y-1">
            <FormLabel className="flex items-center gap-2 mb-1">
              <span>🇰🇪</span> Phone Number (Kenya)
            </FormLabel>
            <div className="phone-input-wrapper">
              {/* Add a wrapper with custom styling to ensure consistent appearance */}
              <RHFPhoneNumber
                name="phoneNumber"
                helperText="We'll use this to verify your account"
              />
            </div>
            <style jsx global>{`
              /* Ensure phone input has consistent styling with other inputs */
              .phone-input-wrapper input {
                width: 100% !important;
                height: 56px !important;
                border-radius: 4px !important;
                border: 1px solid rgba(0, 0, 0, 0.23) !important;
                padding: 16.5px 14px !important;
                font-size: 1rem !important;
                font-family: inherit !important;
                background-color: transparent !important;
              }
              .phone-input-wrapper .special-label {
                display: none !important;
              }
              .phone-input-wrapper input:focus {
                border: 2px solid #1976d2 !important;
                padding: 15.5px 13px !important;
              }
              .phone-input-wrapper .flag-dropdown {
                border-radius: 4px 0 0 4px !important;
                border: 1px solid rgba(0, 0, 0, 0.23) !important;
                background-color: transparent !important;
              }
            `}</style>
          </div>
          
          <RHFTextField
            name="email"
            label="Email Address"
            placeholder="your.email@example.com"
          />
          
          <RHFTextField
            name="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
            helperText="Password must be at least 8 characters and include uppercase, lowercase, number, and special character"
          />
          
          <RHFTextField
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            placeholder="Confirm your password"
          />
          
          <RHFCheckbox
            name="terms"
            label="I agree to the Terms & Conditions"
          />
          
          <Button
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating Account...' : 'Sign Up'}
          </Button>
          
          <Typography variant="body2" align="center" className="mt-6">
            Already have an account?{' '}
            <MuiLink component={Link} href="/auth/login">
              Login
            </MuiLink>
          </Typography>
        </form>
      </FormProvider>
    </div>
  );
}