import { PROJECT_NAME } from '@/config';
import { getServerToken } from '@/app/hooks/useServerToken'
import GuestGuard from '@/app/layout/components/guest-guard';
import RegisterForm from '@/app/sections/auth/register-form';
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: `Register | ${PROJECT_NAME}`
}

const RegisterPage = async () => {

    const token = await getServerToken();

  return (
    <GuestGuard token={token}>
        <RegisterForm />
    </GuestGuard>
  )
}

export default RegisterPage