import { PROJECT_NAME } from '@/config'
import { getServerToken } from '@/app/hooks/useServerToken'
import ProductForm from '@/app/sections/dashboard/vendor/products/product-form'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
    title: `Edit Product | ${PROJECT_NAME}`
}

const EditProductPage = async ({ params }: { params: { id: string } }) => {
    const token = await getServerToken();
    
    // Fetch the product data using the ID
    // This depends on your API structure, but might look like:
    const response = await fetch(`${process.env.API_URL}/products/${params.id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    
    const product = await response.json();

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Edit Product</h1>
            <ProductForm token={token} product={product} />
        </div>
    )
}

export default EditProductPage