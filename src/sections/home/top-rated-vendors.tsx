'use client'

import ContainerOverlay from '@/components/container-overlay'
import { VENDORS } from '@/utils/data'
import { Stack, Typography } from '@mui/material'
import React from 'react'
import VendorCard from '../components/vendor-card'

const TopRatedVendors = () => {
  return (
    <ContainerOverlay paddingVertical={5}>
        <Stack gap={5}>
            <Typography variant='h5' fontWeight={600}>Top-Rated Vendors</Typography>

            <div className='grid gap-8 grid-cols-3'>
                {VENDORS.map((each, index) => <VendorCard key={index} vendor={each} />)}
            </div>
        </Stack>
    </ContainerOverlay>
  )
}

export default TopRatedVendors