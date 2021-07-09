import Link from 'next/link'

const Header = () => {
  return (
    <header className="py-5 md:py-14 text-white bg-gradient-to-r from-gray-800 to-gray-600">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div>
          <Link href="/">
            <a className="text-2xl md:text-4xl font-bold">Breweries</a>
          </Link>
        </div>
        <div className="mt-0 md:mt-4 text-base md:text-xl">A breweries list by Open Brewery DB</div>
      </div>
      
    </header>
  )
}

export default Header
