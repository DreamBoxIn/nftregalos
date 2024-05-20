//_app.tsx//
import "@/styles/globals.css";
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';
import type { AppProps } from "next/app";
import '../i18n'; // Importa tu configuración de i18next

// Configurar el tema para soportar modos claro y oscuro
const theme = extendTheme({
  styles: {
    global: (props) => ({
      body: {
        bg: mode('white', 'gray.800')(props),
        color: mode('black', 'white')(props),
      },
    }),
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
