import ContainerOverlay from '@/components/container-overlay'
import { SERVICES } from '@/utils/data'
import { Stack, Typography } from '@mui/material'
import React from 'react'
import ServiceCard from '../components/service-card'

const PopularServices = () => {
  return (
    <ContainerOverlay paddingVertical={5}>
        <Stack gap={5}>
            <Typography variant='h5' fontWeight={600}>Popular Services</Typography>

            <div className='grid gap-8 md:grid-cols-3'>
                {SERVICES.map((each, index) => <ServiceCard key={index} service={each} />)}
            </div>
        </Stack>
    </ContainerOverlay>
  )
}

export default PopularServices