import Head from 'next/head'
import Header from './Header'
import Footer from './Footer'

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col text-gray-700">
      <Head>
        <title>Breweries | A breweries list by Open Brewery DB</title>
        <meta name="description" content="A breweries list by Open Brewery DB" />
      </Head>
      <Header />
      {children}
      <Footer />
    </div>
  )
}

export default Layout
