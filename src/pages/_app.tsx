import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { Toaster } from 'react-hot-toast';
import TopNavigation from '@/components/navigation/top-navigation';

export default function App({ Component, pageProps }: AppProps) {
  return <ChakraProvider>
    <Toaster
        position="top-right"
    />

    <TopNavigation></TopNavigation>

    <Component {...pageProps} />
  </ChakraProvider>
}
