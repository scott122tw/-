import React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssessmentIcon from '@mui/icons-material/Assessment';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import TimelineIcon from '@mui/icons-material/Timeline';
import EditIcon from '@mui/icons-material/Edit';

function Navigation({ themeSelector }) {
  const location = useLocation();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          台灣財務報告系統
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button
            color="inherit"
            component={RouterLink}
            to="/"
            startIcon={<DashboardIcon />}
          >
            總覽
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/form"
            startIcon={<EditIcon />}
          >
            編輯資料
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/analysis"
            startIcon={<AssessmentIcon />}
          >
            財務分析
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/planning"
            startIcon={<AccountBalanceIcon />}
          >
            理財規劃
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/projection"
            startIcon={<TimelineIcon />}
          >
            現金流量預測
          </Button>
          {themeSelector}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navigation;
