'use client'

import { useState, MouseEvent } from 'react';
import { useRouter } from 'next/navigation';
import { AppBar, Toolbar, Stack, Divider, IconButton, Badge, Typography, useTheme, useMediaQuery, Link as MuiLink } from '@mui/material';
import { PersonOutline, ShoppingCartOutlined, FavoriteBorder, Menu } from '@mui/icons-material';
import Link from 'next/link';
import ContainerOverlay from '@/app/components/container-overlay';
import TopBarSearch from '@/app/layout/main/top-bar-search';
import Logo from '@/app/components/logo';
import MainDrawer from '@/app/layout/main/main-drawer';
import AccountMenu from '@/app/layout/components/account-menu';
import CartDrawer from './cart-drawer';
import useBoolean from '@/app/hooks/useBoolean'
import useMainStore from '@/app/store/main-store'
import useCartStore from '@/app/store/cart-store'
import { PROJECT_NAME } from '@/config'
import { Box } from "@mui/material";
import NavbarWishlistButton from '@/app/sections/wishlist/navbarWishlist';
import { notifyWishlistUpdated } from '@/app/utils/browser-events';




const TopBar = () => {
    const { cart } = useCartStore();
    const [accountAnchorEl, setAccountAnchorEl] = useState<null | HTMLElement>(null);
    const accountMenuOpen = Boolean(accountAnchorEl);
    const cartDrawerOpen = useBoolean();

    const openAccountMenu = (event: MouseEvent<HTMLElement>) => {
        setAccountAnchorEl(event.currentTarget);
    };

    const closeAccountMenu = () => {
        setAccountAnchorEl(null);
    };

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
    const drawerOpen = useBoolean();
    const { categories } = useMainStore();
    const cartTotal = cart.reduce((acc, curr) => acc + curr.quantity, 0);
    const router = useRouter();

    const dispatchWishlistUpdated = () => {
        if (typeof window !== 'undefined') {
          notifyWishlistUpdated();
        }
      };




    return (
        <>
            {isSmallScreen && <MainDrawer 
                onClose={drawerOpen.onFalse} 
                open={drawerOpen.value} 
            />}
            <AccountMenu
                anchorEl={accountAnchorEl}
                closeMenu={closeAccountMenu}
                open={accountMenuOpen}
            />
            <CartDrawer
                open={cartDrawerOpen.value}
                onClose={cartDrawerOpen.onFalse}
            />
            {/* bg-gradient-to-b from-orange-600 via-orange-500 to-orange-300 */}

            <AppBar sx={{ 
            background: "linear-gradient(to bottom, #ff7f00, #ff9900, #ffcc66)", py: 2, mb: 4}}>             
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
    {/* Left side */}
    <Box>
        <Logo />
    </Box>
    
    {/* Middle - Search (only on larger screens) */}
    {!isSmallScreen && (
        <Box sx={{ flex: 1, mx: 4, maxWidth: '500px' }}>
            <TopBarSearch />
        </Box>
    )}
    
    {/* Right side - Icons */}
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        {/* Remove the outer Badge component and just use NavbarWishlistButton */}
        <NavbarWishlistButton/>
        
        <Badge badgeContent={cartTotal ? <Typography variant='caption' color='white'>{cartTotal}</Typography> : 0} color='primary'>
            <IconButton onClick={cartDrawerOpen.onTrue} size='small'><ShoppingCartOutlined fontSize='large' />My Cart</IconButton>
        </Badge>
        <IconButton
            onClick={openAccountMenu}
            size='small'
        >
            <PersonOutline fontSize='large' />My Profile
        </IconButton>
        {isSmallScreen && <IconButton size='small' onClick={drawerOpen.onTrue}><Menu fontSize='large' /></IconButton>}
    </Box>
</Toolbar>
                
                {!isSmallScreen && (
                    <ContainerOverlay>
                        <Stack gap={2} alignItems='center' direction='row'>
                            {categories && categories.filter(each => each.featured).map((cat, index) => (
                                <MuiLink 
                                    key={index} 
                                    variant='subtitle2' 
                                    underline='none' 
                                    color='textSecondary' 
                                    component={Link} 
                                    href={`/category/${cat.slug}`}
                                >
                                    {cat.name}
                                </MuiLink>
                            ))}
                            <MuiLink 
                                variant='subtitle2' 
                                underline='none' 
                                color='textSecondary' 
                                component={Link} 
                                href='/services'
                            >
                            </MuiLink>
                        </Stack>
                    </ContainerOverlay>
                )}
            </AppBar>
        </>
    );
};

export default TopBar;