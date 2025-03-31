import { PRIMARY_COLOR } from '@/config'
import { Search } from '@mui/icons-material'
import { Button, IconButton, styled, useMediaQuery, useTheme } from '@mui/material'
import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'

interface TopBarSearchProps {
    isWhiteBg?: boolean;
    showSearchText?: boolean;
}

const SearchContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    width: '50%',
    border: '1px solid #ccc',
    borderRadius: '5px',
    overflow: 'hidden',
    position: 'relative',
    color: 'white',
    [theme.breakpoints.down('md')]: {
        width: '100%',
    }
}));

const StyledMotionInput = styled(motion.input)<{ isWhiteBg: boolean }>(({ isWhiteBg }) => ({
    padding: '6px 12px',
    color: isWhiteBg ? '#000' : '#000', // Input text color
    width: '100%',
    border: 'none',
    outline: 'none',
    background: 'transparent',
    fontSize: '1rem',
    '&::placeholder': {
        color: isWhiteBg ? '#888' : '#000', // Lighter color for visibility
    },
}));

const searchSuggestions = [
    "Search for the latest sneakers...",
    "Find the best laptops for work...",
    "Discover unique handmade crafts...",
    "Explore top-rated restaurants...",
    "Book a professional service..."
];

const TopBarSearch: React.FC<TopBarSearchProps> = ({ isWhiteBg = false, showSearchText = false }) => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

    const [inputValue, setInputValue] = useState("");
    const [currentSuggestionIndex, setCurrentSuggestionIndex] = useState(0);
    const [showPlaceholder, setShowPlaceholder] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            if (!inputValue) { // Only change the placeholder if input is empty
                setShowPlaceholder(false);
                setTimeout(() => {
                    setCurrentSuggestionIndex((prevIndex) => (prevIndex + 1) % searchSuggestions.length);
                    setShowPlaceholder(true);
                }, 200);
            }
        }, 3000); // Change suggestion every 3 seconds

        return () => clearInterval(interval);
    }, [inputValue]);

    return (
        <SearchContainer
            sx={{
                backgroundColor: 'white',
                border: '2px solid #FF6700', // Neon orange border
                borderRadius: '5px',
                height: '50px', // Increased height for a larger search bar
                width: '700px',
                color: 'black',
            }}
        >
            <StyledMotionInput
                placeholder={showPlaceholder ? searchSuggestions[currentSuggestionIndex] : ""}
                isWhiteBg={isWhiteBg}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
            />
            <div style={{ backgroundColor: PRIMARY_COLOR.main, borderRadius: '0 5px 5px 0', padding: '8px 12px' }}>
  {(!showSearchText || isSmallScreen) ? (
    <span style={{ color: 'white', fontSize: '1.25rem', fontWeight: 'bold' }}>Search</span>
  ) : (
    <Button sx={{ color: 'white', fontSize: '0.75rem' }} variant="contained">
      Search
    </Button>
  )}
</div>

        </SearchContainer>
    );
};

export default TopBarSearch;
