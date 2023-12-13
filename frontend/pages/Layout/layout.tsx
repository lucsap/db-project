import Footer from "../../components/Footer"
import Header from "../../components/Header"
import styles from "./styles.module.css"

function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            <main className={styles.pageContainer}>
                {children}
            </main>
            <Footer />
        </>
    )
}

export default Layout
