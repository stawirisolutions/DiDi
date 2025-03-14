import { SERVICE } from '@/utils/types'
import { CalendarMonthOutlined, FavoriteBorder, FavoriteOutlined, PinDrop, PinDropOutlined, ShoppingCartOutlined } from '@mui/icons-material'
import { Button, Card, CardActions, CardContent, CardMedia, Chip, IconButton, Stack, Link as MuiLink, Rating, Typography } from '@mui/material'
import Link from 'next/link'
import React from 'react'

interface SERVICE_CARD_PROPS {
    service: SERVICE
}

const ServiceCard = ({ service }: SERVICE_CARD_PROPS) => {

    const discountPercentage = service.discountPrice === 0 ? 0 : Math.round((service.discountPrice / service.price) * 100);

    const displayPrice = service.discountPrice === 0 ? service.price : service.discountPrice;
    const lineThroughPrice = service.discountPrice === 0 ? 0 : service.price;

  return (
    <Card variant='outlined'>
        <CardMedia
            component='div'
            sx={{ 
                height: '300px', 
                backgroundImage: `url('${service.image}')`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                padding: '12px',
                display: 'flex',
                justifyContent: 'space-between',
            }}
        >
            {service.discountPrice !== 0 && <Chip sx={{ color: 'white' }} label={`${discountPercentage}% OFF`} variant='filled' size='small' color='secondary' />}
            {service.discountPrice === 0 && <div />}
            <IconButton color='secondary' sx={{ height: 'fit-content', backgroundColor: 'white' }} size='small'><FavoriteBorder fontSize='small' /></IconButton>
        </CardMedia>
        <CardContent>
            <Stack gap={1}>
                <MuiLink noWrap variant='h6' color='textPrimary' component={Link} href={`/service/${service.slug}`} underline='hover' fontWeight={600}>{service.name}</MuiLink>
                <Stack direction='row' gap={1} alignItems='center'>
                    <Rating size='small' readOnly value={service.rating} precision={0.1} />
                    <Typography variant='body2' color='textSecondary'>({service.reviews})</Typography>
                </Stack>
                <div className='flex items-center gap-3'>
                    <PinDropOutlined fontSize='small' />
                    <Typography variant='caption' color='textSecondary'>{service.location}</Typography>
                </div>
                <Typography color='textSecondary'>{service.vendor.name}</Typography>
                <Stack direction='row' gap={1} alignItems='center'>
                    <Typography variant='subtitle1' fontWeight={600} color='secondary'>Ksh {displayPrice.toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 0 })}/{service.priceFrequency}</Typography>
                    {service.discountPrice !== 0 && <Typography variant='body2' sx={{ textDecoration: 'line-through' }} color='textSecondary'>Ksh {lineThroughPrice.toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 0 })}/{service.priceFrequency}</Typography>}
                </Stack>
            </Stack>
        </CardContent>
        <CardActions>
            <Button sx={{ width: '100%', color: 'white' }} color='secondary' startIcon={<CalendarMonthOutlined />} variant='contained'>Book now</Button>
        </CardActions>
    </Card>
  )
}

export default ServiceCard