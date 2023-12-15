import { Lexend } from 'next/font/google'
import Header from '../components/Header'
import Footer from '../components/Footer'

const lexend = Lexend({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
})

export default function MyApp({ Component, pageProps, router }: any) {
  
  const excludedPaths = ['/', '/login', '/signup'];

  const shouldExcludeHeaderFooter = excludedPaths.includes(router.pathname)

  return (
    <main className={lexend.className}>
      {!shouldExcludeHeaderFooter && <Header />}
          <Component {...pageProps} />
      {!shouldExcludeHeaderFooter && <Footer />}
    </main>
  )
}

