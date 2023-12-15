import Footer from "../components/Footer"
import Header from "../components/Header"
import styles from './index.module.css'

interface LayoutProps {
  children: React.ReactNode
}

function Layout({ children }: LayoutProps) {
  return (
    <div>
      <Header />
      <div className={styles.pageContainer}>{children}</div>
      <Footer />
    </div>
  )
}

export default Layout
