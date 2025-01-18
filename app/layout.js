'use client'

import {Inter} from "next/font/google";
import "./globals.css";
import MainLayout from "@/layouts/mainLayout";
import ClientLayout from "@/components/LayoutClient";
import CssBaseline from "@mui/material/CssBaseline";
import {ThemeProvider} from "@mui/material/styles";
import {theme} from '@/styles/theme';

const font = Inter({subsets: ["latin"]});

export default function RootLayout({children}) {
  return (
      <html
          lang="en"
          className={font.className}
      >
      <body>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <ClientLayout>
          <MainLayout>
            {children}
          </MainLayout>
        </ClientLayout>
      </ThemeProvider>
      </body>
      </html>
  );
}
