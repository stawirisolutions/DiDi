import React from 'react'
import { Link as MuiLink } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';

const Logo = ({ size = 60 }: { size?: number }) => {
  return (
    <MuiLink component={Link} href='/' variant='h5' underline='none' fontWeight={600}>
      <Image
        src='/logo.png'
        alt='Logo'
        height={size}
        width={size}
      />
    </MuiLink>
  )
}

export default Logo