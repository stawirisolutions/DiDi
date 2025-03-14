import React from 'react'
import { Link as MuiLink } from '@mui/material';
import { PROJECT_NAME } from '@/config';
import Link from 'next/link';

const Logo = () => {
  return (
    <MuiLink component={Link} href='/' variant='h5' underline='none' fontWeight={600}>{PROJECT_NAME}</MuiLink>
  )
}

export default Logo