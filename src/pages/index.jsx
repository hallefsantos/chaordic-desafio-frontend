import { useState } from 'react'
import Layout from '../components/Layout'
import Card from '../components/Card'
import { useRouter } from 'next/router'


export default function Home({ breweries }) {

  const router = useRouter()

  const breweriesTypes = [...new Set(breweries.map(brewery => brewery.brewery_type))]

  const [breweriesByTypes, setbreweriesByTypes] = useState(breweries)

  const handleBreweriesByTypes = (type) => {
    if (breweriesTypes.includes(type)) {
      setbreweriesByTypes(breweries.filter(brewery => type === brewery.brewery_type))
    } else {
      setbreweriesByTypes(breweries)
    }
  }

  return (
    <Layout>
      <main className="flex-1 pb-14">
        <div className="w-full max-w-7xl mx-auto px-4">
          <div className="flex items-center py-4">
            <span>Filter: </span>

            <select className="p-2 ml-2 capitalize cursor-pointer" onChange={(e) => handleBreweriesByTypes (e.target.value)}>
              <option>All</option>
              {breweriesTypes.map((type, key) => (
                <option key={key}>{type}</option>
              ))}
            </select>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {breweriesByTypes.map(brewery => (
              <Card key={brewery.id} brewery={brewery} />
            ))}
          </div>
          <button onClick={() => router.push(`/`)}>Page 1</button>
          <button onClick={() => router.push(`/?page=1`)}>Page 2</button>
          <button onClick={() => router.push(`/?page=3`)}>Page 3</button>
        </div>
      </main>
    </Layout>
  )
}

export async function getServerSideProps({ query: {page= 1} }) {
  console.log(page)
  const res = await fetch(`https://api.openbrewerydb.org/breweries`)
  const breweries = await res.json()

  if (!breweries) {
    return {
      notFound: true,
    }
  }

  return {
    props: { 
      breweries,
      page: page
    },
  }
}
