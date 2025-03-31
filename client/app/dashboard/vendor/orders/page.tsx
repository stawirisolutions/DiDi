import { PROJECT_NAME } from '@/config'
import { getServerToken } from '@/app/hooks/useServerToken'
import OrdersList from '@/app/sections/dashboard/vendor/orders/orders-list'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
    title: `Orders | ${PROJECT_NAME}`,
}

const VendorOrdersPage = async () => {

    const token = await getServerToken();

  return (
    <OrdersList token={token} />
  )
}

export default VendorOrdersPage