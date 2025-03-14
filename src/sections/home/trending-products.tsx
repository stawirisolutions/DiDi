import ContainerOverlay from '@/components/container-overlay'
import { PRODUCTS } from '@/utils/data'
import { Stack, Typography } from '@mui/material'
import React from 'react'
import ProductCard from '../components/product-card'

const TrendingProducts = () => {
  return (
    <ContainerOverlay paddingVertical={5}>
        <Stack gap={5}>
            <Typography variant='h5' fontWeight={600}>Trending Products</Typography>

            <div className='grid gap-8 md:grid-cols-3'>
                {PRODUCTS.map((each, index) => <ProductCard key={index} product={each} />)}
            </div>
        </Stack>
    </ContainerOverlay>
  )
}

export default TrendingProducts