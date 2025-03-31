import { PROJECT_NAME } from '@/config'
import { getServerToken } from '@/app/hooks/useServerToken'
import ProductsList from '@/app/sections/dashboard/vendor/products/products-list'
import { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'

export const metadata: Metadata = {
    title: `Vendor Products | ${PROJECT_NAME}`
}

const VendorProductsPage = async () => {
    const token = await getServerToken();

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Your Products</h1>
                <Link 
                    href="/dashboard/vendor/products/new" 
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                    Add New Product
                </Link>
            </div>
            
            <ProductsList token={token} />
        </div>
    )
}

export default VendorProductsPage