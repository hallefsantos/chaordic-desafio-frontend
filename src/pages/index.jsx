import Header from '../components/Header'
import Footer from '../components/Footer'
import Card from '../components/Card'

export default function Home({ data }) {
  return (
    <div className="text-gray-700">
      <Header />
      
      <main className="py-14">
        <div className="w-full max-w-7xl mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {data.map(brewery => (
              <Card key={brewery.id} brewery={brewery} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export async function getStaticProps() {
  const res = await fetch(`https://api.openbrewerydb.org/breweries`)
  const data = await res.json()

  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: { data },
  }
}
