'use client'

import FormProvider from '@/app/components/hookform/FormProvider';
import { RHFCheckbox } from '@/app/components/hookform/RHFCheckbox';
import RHFTextField from '@/app/components/hookform/RHFTextField';
import { yupResolver } from '@hookform/resolvers/yup';
import { Lock, Mail, Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment, Typography, Link as MuiLink, Button, Alert } from '@mui/material';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

const LoginForm = () => {

    const { enqueueSnackbar } = useSnackbar();
    const { replace } = useRouter();

    const [showPassword, setShowPassword] = useState<boolean>(false);

    const LoginSchema = Yup.object().shape({
        email: Yup.string().required('Enter your email address'),
        password: Yup.string().required('Enter your password'),
        // agree: Yup.boolean().oneOf([true], 'You must agree to the terms and conditions')
    });

    type LoginFormType = Yup.InferType<typeof LoginSchema>;

    const initialValues: LoginFormType = {
        email: '',
        password: '',
        // agree: false
    }

    const methods = useForm({ resolver: yupResolver(LoginSchema), defaultValues: initialValues });

    const { handleSubmit, setError, formState: { errors, isSubmitting } } = methods;

    const onSubmit = async (data: LoginFormType) => {
        try {
            const response = await signIn('credentials', {
                email: data.email,
                password: data.password,
                redirect: false,
            });
            
            // Check for authentication failure from NextAuth (response.error will exist)
            if (response?.error) {
                setError('root', { 
                    type: 'manual',
                    message: response.error || 'Invalid credentials. Please try again.'
                });
            } else if (response?.ok) {
                enqueueSnackbar('Login Successful', { variant: 'success' });
                replace('/dashboard');
            }
        } catch (err: any) {
            // This catches network errors or other exceptions
            const errorMessage = err?.message || 'An unexpected error occurred';
            setError('root', { 
                type: 'manual',
                message: errorMessage 
            });
        }
    }
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col gap-4'>
            <div>
                <Typography variant='h5' fontWeight={600} gutterBottom>Login</Typography>
                <Typography color='textSecondary'>Enter your credentials to access your account.</Typography>
            </div>
            {!!errors.root && <Alert severity="error">{errors.root.message}</Alert>}
            <RHFTextField
                name='email'
                label='Email Address'
                placeholder='Email Address'
                type='email'
                required
                size='small'
                startAdornment={<InputAdornment position='start'><Mail fontSize='small' /></InputAdornment>}
            />
            <RHFTextField
                required
                name="password"
                label="Password"
                placeholder='Password'
                type={showPassword ? 'text' : 'password'}
                size='small'
                startAdornment={<InputAdornment position='start'><Lock fontSize='small' /></InputAdornment>}
                endAdornment={<InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        {showPassword ? <VisibilityOff fontSize='small' /> : <Visibility fontSize='small' />}
                    </IconButton>
                </InputAdornment>}
            />
            {/* <RHFCheckbox
                name='agree'
                color='primary'
                label={<Typography variant='body2'>I agree to the <MuiLink component={Link} href='/terms-and-conditions'>Terms & Conditions</MuiLink></Typography>}
            /> */}
            <Button type='submit' variant='contained' loading={isSubmitting} sx={{ color: 'white' }}>Login</Button>
            <Typography textAlign='center' variant='caption' color='textSecondary'>
                Don't have an account?
                {' '}
                <MuiLink underline='none' component={Link} href='/auth/register'>Create Account</MuiLink>
            </Typography>
        </div>
    </FormProvider>
  )
}

export default LoginForm