import { ClassNames } from '@emotion/react';
import { Container } from '@mui/material'
import React, { ReactNode } from 'react'

interface CONTAINER_OVERLAY_PROPS {
    children?: ReactNode;
    backgroundColor?: string;
    paddingVertical?: number;
    paddingHorizontal?: number; 
    className?: string;
    fullWidth?: boolean;
}

const ContainerOverlay = ({ 
    backgroundColor, 
    children, 
    paddingVertical, 
    paddingHorizontal,
    className,
    fullWidth = false, // Default false

}: CONTAINER_OVERLAY_PROPS) => {
  return (
    <Container
    maxWidth={fullWidth ? false : "lg"} // Set to false for full width
    className={className}
      sx={{ 
        backgroundColor, 
        height: '100%',
        py: paddingVertical,
        px: paddingHorizontal
      }}
    >
      {children}
    </Container>
  )
}

export default ContainerOverlay
