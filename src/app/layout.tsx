import type { Metadata } from "next";
import { Providers } from "@/store/provider";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import "./globals.css";
import { theme } from "@/styles/theme";

export const metadata: Metadata = {
  title: "စာရိပ်မြိုင်",
  description: "မြိုင်မြိုင်ဆိုင်ဆိုင် စာရိပ်မြိုင်",
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <Providers>
              {children}
            </Providers>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
