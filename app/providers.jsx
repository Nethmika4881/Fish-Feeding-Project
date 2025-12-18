"use client";

import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";

export default function Providers({ children }) {
  return (
    <CssVarsProvider defaultMode="light">
      <CssBaseline />
      {children}
    </CssVarsProvider>
  );
}
