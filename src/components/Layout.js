import React from 'react';
import { Box, Container } from '@mui/material';
import Navigation from './Navigation';

function Layout({ children, themeSelector }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navigation themeSelector={themeSelector} />
      <Container component="main" sx={{ mt: 4, mb: 4, flex: 1 }}>
        {children}
      </Container>
    </Box>
  );
}

export default Layout;
