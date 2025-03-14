'use client'

import ContainerOverlay from '@/components/container-overlay'
import { PRIMARY_COLOR } from '@/config'
import { CATEGORIES } from '@/utils/data'
import { Button, Stack, styled, Typography } from '@mui/material'
import React from 'react'

const SingleCategoryContainer = styled('div')(() => ({
    padding: '24px 6px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    cursor: 'pointer',
    transition: 'all 0.5s',
    backgroundColor: '#F9FAFB',
    borderRadius: '12px',
    textAlign: 'center',
    ['&:hover']: {
        boxShadow: '0 8px 10px rgba(0, 0, 0, 0.3)'
    },

}))

const CategorySection = () => {
  return (
    <ContainerOverlay paddingVertical={5}>
        <Stack gap={5}>
            <Typography variant='h5' fontWeight={600}>Shop By Category</Typography>

            <div className='grid gap-8 grid-cols-6'>
                {CATEGORIES.map((cat, index) => <SingleCategoryContainer key={index}>
                    <img src={cat.image} alt={cat.name} style={{ width: '50px', height: '50px' }} />
                    <Typography variant='body2'>{cat.name}</Typography>
                </SingleCategoryContainer>)}
            </div>

            <Stack
                direction='row'
                sx={{
                    borderRadius: '12px',
                }}
            >
                <Stack 
                    sx={{ 
                        flex: 5, 
                        color: 'white', 
                        backgroundColor: PRIMARY_COLOR.main, 
                        px: 6, 
                        py: 4, 
                        borderTopLeftRadius: '12px', 
                        borderBottomLeftRadius: '12px' 
                    }} 
                    justifyContent='center' 
                    gap={2}
                >
                    <Typography variant='h5' fontWeight={800}>Summer Sale is Live!</Typography>
                    <Typography sx={{ width: '60%' }}>
                        Enjoy up to 50% off on thousands of products across all categories. Limited time offer, show now before stock runs out!
                    </Typography>
                    <Button sx={{ backgroundColor: 'white', width: 'fit-content', px: 2 }}>Show Now</Button>
                </Stack>
                <div style={{ flex: 3, height: '50vh' }}>
                    <img
                        src='/images/banner-one.jpg'
                        style={{ height: '100%', objectFit: 'cover', objectPosition: 'center' }}
                    />
                </div>
            </Stack>
        </Stack>
    </ContainerOverlay>
  )
}

export default CategorySection