'use client';
import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const theme = createTheme({
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  palette: {
    // primary: {
    //   main: '#ffffff'
    // },
    // secondary: {
    //   main: '#000000',
    // },
    // info: {
    //   main: '#0391D8',
    // }
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          fontSize: 12,
          backgroundColor: '#E6E6E6',
          color: '#fff',
          "& .MuiListItemIcon-root": {
            color: "inherit",
          },
          "& .MuiDivider-root": {
            backgroundColor: "currentColor",
            opacity: 0.3
          }
        }
      }
    },
  }
});
