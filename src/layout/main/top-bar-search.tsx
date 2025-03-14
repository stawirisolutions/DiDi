import { PRIMARY_COLOR } from '@/config'
import { Search } from '@mui/icons-material'
import { Button, IconButton, styled, Typography } from '@mui/material'
import React from 'react'

const SearchContainer = styled('div')(() => ({
    display: 'flex',
    alignItems: 'center',
    width: '50%',
    border: '1px solid #ccc',
    borderRadius: '5px',
}))

const TopBarSearch = ({ isWhiteBg, showSearchText }: { isWhiteBg?: boolean, showSearchText?: boolean }) => {
  return (
    <SearchContainer sx={{ ...(isWhiteBg && { backgroundColor: 'white' }) }}>
        <input
            placeholder='Search for products, services or vendors...'
            className='flex-1 outline-0'
            style={{ padding: '6px 12px', ...(isWhiteBg && { color: '#000' }) }}
        />
        <div style={{ backgroundColor: PRIMARY_COLOR.main, borderRadius: '0 5px 5px 0' }}>
            {!showSearchText && <IconButton><Search sx={{ color: 'white' }} /></IconButton>}
            {showSearchText && <Button sx={{ color: 'white' }} variant='contained' startIcon={<Search />}>Search</Button>}
        </div>
    </SearchContainer>
  )
}

export default TopBarSearch