import Footer from "../components/Footer"
import Header from "../components/Header"
import styles from "./styles.module.css"

interface LayoutProps {
  children: React.ReactNode
}

function Layout({ children }: LayoutProps) {
  return (
    <html>
      <Header />
        <div className={styles.container}>{children}</div>
      <Footer />
    </html>
  )
}

export default Layout
