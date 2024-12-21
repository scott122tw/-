import { createTheme } from '@mui/material/styles';

// 現代簡約風格
export const defaultTheme = createTheme({
  palette: {
    primary: {
      main: '#2196f3',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  shape: {
    borderRadius: 4,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 4,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        },
      },
    },
  },
  typography: {
    fontFamily: '"Roboto", "Noto Sans TC", sans-serif',
    h4: {
      fontWeight: 500,
    },
  },
});

// 商務專業風格
export const professionalTheme = createTheme({
  palette: {
    primary: {
      main: '#1a237e',
    },
    background: {
      default: '#ffffff',
    },
  },
  shape: {
    borderRadius: 0,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 0,
          fontWeight: 500,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
          border: '1px solid #e0e0e0',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          borderBottom: '1px solid #e0e0e0',
        },
      },
    },
  },
  typography: {
    fontFamily: '"Times New Roman", "Noto Serif TC", serif',
    h4: {
      fontWeight: 600,
    },
  },
});

// 科技感風格
export const techTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00ff00',
    },
    background: {
      default: '#0a192f',
      paper: '#112240',
    },
    text: {
      primary: '#e6f1ff',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          background: 'rgba(0,255,0,0.1)',
          '&:hover': {
            background: 'rgba(0,255,0,0.2)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          background: 'rgba(17, 34, 64, 0.8)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(0,255,0,0.1)',
        },
      },
    },
  },
  typography: {
    fontFamily: '"Space Mono", monospace',
    h4: {
      fontWeight: 700,
    },
  },
});

// 溫暖傳統風格
export const warmTheme = createTheme({
  palette: {
    primary: {
      main: '#d32f2f',
    },
    background: {
      default: '#fff8e1',
      paper: '#ffffff',
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 16,
          padding: '8px 24px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          boxShadow: '0 4px 12px rgba(211,47,47,0.1)',
          border: '1px solid #ffe0e0',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.8), rgba(255,255,255,0.8))',
        },
      },
    },
  },
  typography: {
    fontFamily: '"Noto Serif TC", serif',
    h4: {
      fontWeight: 500,
    },
  },
});

// 自然風格
export const natureTheme = createTheme({
  palette: {
    primary: {
      main: '#388e3c',
    },
    background: {
      default: '#f1f8e9',
      paper: '#ffffff',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 20,
          padding: '6px 20px',
          background: 'linear-gradient(45deg, #388e3c 30%, #4caf50 90%)',
          color: 'white',
          '&:hover': {
            background: 'linear-gradient(45deg, #2e7d32 30%, #388e3c 90%)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 12px rgba(76,175,80,0.1)',
          border: '1px solid #c8e6c9',
        },
      },
    },
  },
  typography: {
    fontFamily: '"Noto Sans TC", sans-serif',
    h4: {
      fontWeight: 500,
      color: '#1b5e20',
    },
  },
});

// 深色主題
export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backgroundColor: '#1e1e1e',
          border: '1px solid #333333',
        },
      },
    },
  },
  typography: {
    fontFamily: '"Roboto", "Noto Sans TC", sans-serif',
    h4: {
      fontWeight: 500,
    },
  },
});
