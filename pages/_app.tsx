import WindowsProvider from '@/context/WindowsProvider'
import useVHOverride from '@/hooks/useVHOverride'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  useVHOverride()
  return (
    <WindowsProvider>
      <Component {...pageProps} />
    </WindowsProvider>
  )
}
