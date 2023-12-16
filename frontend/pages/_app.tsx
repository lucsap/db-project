import { Lexend } from 'next/font/google'
import Header from '../components/Header'
import Footer from '../components/Footer'
import styles from './globals.module.css'
import * as React from 'react'

const lexend = Lexend({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
})

export default function MyApp({ Component, pageProps, router }: any) {
  
  const excludedPaths = ['/', '/login', '/signup'];

  const shouldExcludeHeaderFooter = excludedPaths.includes(router.pathname)

  return (
      <main className={lexend.className}>
        <GlobalStyles />
        {!shouldExcludeHeaderFooter && <Header />}
            <Component {...pageProps} />
        {!shouldExcludeHeaderFooter && <Footer />}
      </main>
  )
}

function GlobalStyles() {
    React.useEffect(() => {
      if (typeof document !== 'undefined') {
        document.body.classList.add(styles.globalStyles);
      } 

    return () => {
      if (typeof document !== 'undefined') {
        document.body.classList.remove(styles.globalStyles);
      }
    };
  }, [])

  return null;
}
