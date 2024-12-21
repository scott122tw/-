import React from 'react';
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import PaletteIcon from '@mui/icons-material/Palette';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import BusinessIcon from '@mui/icons-material/Business';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ComputerIcon from '@mui/icons-material/Computer';
import NatureIcon from '@mui/icons-material/Nature';

const themes = [
  { name: '預設主題', icon: <LightModeIcon />, value: 'default' },
  { name: '深色主題', icon: <DarkModeIcon />, value: 'dark' },
  { name: '溫暖主題', icon: <WbSunnyIcon />, value: 'warm' },
  { name: '專業主題', icon: <AccountBalanceIcon />, value: 'professional' },
  { name: '科技主題', icon: <ComputerIcon />, value: 'tech' },
  { name: '自然主題', icon: <NatureIcon />, value: 'nature' },
];

function ThemeSelector({ currentTheme, onThemeChange }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleThemeSelect = (theme) => {
    onThemeChange(theme);
    handleClose();
  };

  return (
    <Box>
      <Tooltip title="更換主題風格">
        <IconButton
          onClick={handleClick}
          size="large"
          sx={{ ml: 2 }}
          color="inherit"
        >
          <PaletteIcon />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
      >
        {themes.map((theme) => (
          <MenuItem
            key={theme.value}
            onClick={() => handleThemeSelect(theme.value)}
            selected={currentTheme === theme.value}
          >
            <ListItemIcon>
              {theme.icon}
            </ListItemIcon>
            <ListItemText>{theme.name}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}

export default ThemeSelector;
