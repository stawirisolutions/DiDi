import ContainerOverlay from '@/components/container-overlay'
import Logo from '@/components/logo'
import { PROJECT_NAME } from '@/config'
import { AppBar, Stack, Toolbar, Typography, Link as MuiLink, Badge, IconButton, Divider } from '@mui/material'
import Link from 'next/link'
import React from 'react'
import { FavoriteBorder, PersonOutline, ShoppingCartOutlined } from '@mui/icons-material';
import TopBarSearch from './top-bar-search'
import { CATEGORIES } from '@/utils/data'

const TopBar = () => {
  return (
    <AppBar color='inherit' sx={{ py: 2 }}>
        <Toolbar>
            <ContainerOverlay>
                <Stack gap={3}>

                    <Stack gap={2} alignItems='center' direction='row' justifyContent='space-between'>
                        <Typography variant='body2' color='textSecondary'>Welcome to {PROJECT_NAME}!</Typography>
                        <Stack gap={2} alignItems='center' direction='row'>
                            <MuiLink color='textSecondary' variant='body2' underline='hover' component={Link} href='/'>Become a Vendor</MuiLink>
                            <MuiLink color='textSecondary' variant='body2' underline='hover' component={Link} href='/'>Help Center</MuiLink>
                        </Stack>
                    </Stack>

                    <Stack gap={2} alignItems='center' direction='row' justifyContent='space-between'>
                        <Logo />
                        <TopBarSearch />
                        <Stack gap={2} direction='row' alignItems='center'>
                            <Badge badgeContent={3} color='primary' >
                                <IconButton size='small'><FavoriteBorder fontSize='small' /></IconButton>
                            </Badge>
                            <Badge badgeContent={3} color='primary' >
                                <IconButton size='small'><ShoppingCartOutlined fontSize='small' /></IconButton>
                            </Badge>
                            <IconButton size='small'><PersonOutline fontSize='small' /></IconButton>
                        </Stack>
                    </Stack>

                </Stack>
            </ContainerOverlay>
        </Toolbar>
        <Divider sx={{ my: 2 }} />
        <ContainerOverlay>
            <Stack gap={2} alignItems='center' direction='row'>
                {CATEGORIES.map((cat, index) => <MuiLink key={index} variant='subtitle2' underline='none' color='textSecondary' component={Link} href={`/category/${cat.slug}`}>{cat.name}</MuiLink>)}
                <MuiLink variant='subtitle2' underline='none' color='textSecondary' component={Link} href='/services'>Services</MuiLink>
            </Stack>
        </ContainerOverlay>
    </AppBar>
  )
}

export default TopBar