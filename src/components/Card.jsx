import Link from 'next/link'

const Card = ({ brewery }) => {
  const typeColors = {
    micro: 'bg-green-500',
    contract: 'bg-gray-800',
    brewpub: 'bg-yellow-500',
    regional: 'bg-blue-500',
    planning: 'bg-indigo-700',
  }

  return (
    <div className="shadow-lg border border-gray-100 rounded">
      <div className="p-4 sm:min-h-[18rem]">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold ">
          <Link href={`/breweries/${brewery.id}`}>
            <a>{brewery.name}</a>
          </Link>
        </h2>
        <address className="mt-8 not-italic">
          {brewery.street} <br />
          {brewery.city} {brewery.state} - {brewery.postal_code} <br />
          {brewery.country}
        </address>
      </div>
      <div className="px-5 py-2 border-t border-gray-100">
        <span className={`inline-block py-1 px-2 text-sm text-white ${typeColors[brewery.brewery_type]} rounded`}>
          {brewery.brewery_type}
        </span>
      </div>
    </div>
  )
}

export default Card
