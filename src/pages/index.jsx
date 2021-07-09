import Layout from '../components/Layout'
import Card from '../components/Card'
import Button from '../components/Button'
import { useRouter } from 'next/router'

export default function Home({ breweries, type, page }) {
  const router = useRouter()
  const breweriesTypes = ['planning', 'regional', 'contract', 'micro', 'brewpub']
  const numberOfPages = 3
  const numberOfPagesArr = []

  const setNewTypeUrl = (type) => {
    router.push(`/?type=${type}&page=1`)
  }

  const generateButtons = () => {
    for (let i = 0; i < numberOfPages; i++) {
      numberOfPagesArr.push(i + 1)
    }
  }

  generateButtons()

  return (
    <Layout>
      <main className="flex-1 pb-14">
        <div className="w-full max-w-7xl mx-auto px-4">
          <div className="flex items-center py-4">
            <span>Filter: </span>

            <div className="relative table w-32 ml-2">
              <select
                className="w-full py-1 px-2 capitalize cursor-pointer appearance-none bg-white border border-gray-100"
                onChange={(e) => setNewTypeUrl(e.target.value)}
              >
                <option>All</option>
                {breweriesTypes.map(type => (
                  <option key={type}>{type}</option>
                ))}
              </select>

              <svg className="absolute right-1 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-500 pointer-events-none" stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M256 294.1L383 167c9.4-9.4 24.6-9.4 33.9 0s9.3 24.6 0 34L273 345c-9.1 9.1-23.7 9.3-33.1.7L95 201.1c-4.7-4.7-7-10.9-7-17s2.3-12.3 7-17c9.4-9.4 24.6-9.4 33.9 0l127.1 127z"></path></svg>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {breweries.map(brewery => (
              <Card key={brewery.id} brewery={brewery} />
            ))}
          </div>

          <div className="flex items-center justify-center mt-10 space-x-2">            
            {numberOfPagesArr.map((n, key) => (
              <Button 
                key={key} 
                customClickEvent={() => router.push(`/?type=${type ?? ''}&page=${n}`)}
                isActive={n == page}
              >
                {n}
              </Button>
            ))}
          </div>
        </div>
      </main>
    </Layout>
  )
}

export async function getServerSideProps({ query: {type = '', page = 1} }) {
  const res = await fetch(`https://api.openbrewerydb.org/breweries?by_type=${type}&page=${page}`)
  const breweries = await res.json()

  if (!breweries) {
    return {
      notFound: true,
    }
  }

  return {
    props: { 
      breweries,
      type,
      page
    },
  }
}
