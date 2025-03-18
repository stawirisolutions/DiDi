import { PROJECT_NAME } from '@/config'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: `Admin Dashboard | ${PROJECT_NAME}`
}

const AdminDashboardPage = () => {
  return (
    <div>AdminDashboardPage</div>
  )
}

export default AdminDashboardPage