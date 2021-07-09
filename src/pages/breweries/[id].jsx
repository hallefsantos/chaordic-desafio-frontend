import Layout from '../../components/Layout'
import Link from 'next/link'

const Brewery = ({ brewery }) => {
  return (
    <Layout>
      <main className="flex-1 pb-2 flex items-center">
        <div className="w-full max-w-7xl mx-auto px-4">
          <div className="py-3">
            <Link href="/">
              <a className="flex items-center hover:text-blue-600">
                <svg className="h-6 w-6" stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g><path fill="none" d="M0 0h24v24H0z"></path><path d="M10.828 12l4.95 4.95-1.414 1.414L8 12l6.364-6.364 1.414 1.414z"></path></g></svg>
                <span>Back</span>
              </a>
            </Link>
          </div>
          {/* Card */}
          <div className="p-4 shadow-lg border border-gray-100 rounded">
            <h1 className="text-5xl font-bold">
              {brewery.name}
            </h1>

            <ul className="mt-5 space-y-1">
              {brewery.brewery_type && (
                <li>Type: {brewery.brewery_type}</li>
              )}
              {brewery.street && (
                <li>Street: {brewery.street}</li>
              )}
              {brewery.city && (
                <li>City: {brewery.city}</li>
              )}
          
              {brewery.state && (
                <li>State: {brewery.state}</li>
              )}
              {brewery.postal_code && (
                <li>Postal code: {brewery.postal_code}</li>
              )}
              {brewery.country && (
                <li>Country: {brewery.country}</li>
              )}
              {brewery.website_url && (
                <li>
                  Website: 
                  <a 
                    className="pl-1 text-blue-600" 
                    href={brewery.website_url}
                    target="_blank"
                    rel="noopener noreferrer"

                  >
                    {brewery.website_url}
                  </a>
                </li>
              )}
              {brewery.phone && (
                <li>Phone: {brewery.phone}</li>
              )}
              {(brewery.latitude && brewery.longitude) && (
                <li>Open in maps:
                  <a 
                    className="pl-1 text-blue-600 hover:text-blue-400" 
                    href={`http://maps.google.com/maps?q=${brewery.latitude},${brewery.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"

                  >
                    {brewery.latitude},{brewery.longitude}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </main>
    </Layout>
  )
}

export async function getStaticPaths() {
  const res = await fetch('https://api.openbrewerydb.org/breweries')
  const breweries = await res.json()

  const paths = breweries.map((brewery) => ({
    params: { id: `${brewery.id}` },
  }))
  return { paths, fallback: true }
}

export async function getStaticProps({ params }) {
  const res = await fetch(`https://api.openbrewerydb.org/breweries/${params.id}`)
  const brewery = await res.json()
  return { props: { brewery } }
}

export default Brewery
