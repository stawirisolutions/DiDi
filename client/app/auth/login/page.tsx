import { PROJECT_NAME } from '@/config'
import { getServerToken } from '@/app/hooks/useServerToken'
import GuestGuard from '@/app/layout/components/guest-guard'
import LoginForm from '@/app/sections/auth/login-form'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: `Login | ${PROJECT_NAME}`
}

const LoginPage = async () => {

  let token = await getServerToken()

  return (
    <GuestGuard token={token}>
      <LoginForm />
    </GuestGuard>
  )
}

export default LoginPage