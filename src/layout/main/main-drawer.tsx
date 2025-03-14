import { Drawer, Toolbar } from '@mui/material'
import React from 'react'

interface MAIN_DRAWER_PROPS {
    open: boolean
    onClose: () => void
}

const MainDrawer = ({ onClose, open }: MAIN_DRAWER_PROPS) => {
  return (
    <Drawer
        open={open}
        onClose={onClose}
        sx={{
            width: '60%',
            [`& .MuiDrawer-paper`]: { width: '60%' },
        }}
    >
        <Toolbar />
        
    </Drawer>
  )
}

export default MainDrawer