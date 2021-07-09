import Header from './Header'
import Footer from './Footer'

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col text-gray-700">
      <Header />
      {children}
      <Footer />
    </div>
  )
}

export default Layout
