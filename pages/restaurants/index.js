import axios from 'axios'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import toast from 'react-hot-toast'
import Spinner from 'components/Spinner'
import Map from 'components/Map'
import RestaurantCard from '../../components/RestaurantCard'
import { useRestaurantSearch } from 'components/context/RestaurantSearchProvider'

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([])
  const [loading, setLoading] = useState(true)
  const { searchValue } = useRestaurantSearch()

  useEffect(() => {
    console.log({ searchValue })
    const trimmedSearchValue = searchValue?.trim()
    axios
      .get(`/api/restaurants${trimmedSearchValue ? `?search=${trimmedSearchValue}` : ''}`)
      .then(({ data }) => {
        setLoading(false)
        setRestaurants(data)
      })
      .catch((err) => toast.error(err.message))
  }, [searchValue])

  if (loading) return <Spinner />

  // if (!restaurants) return 'no restaurants'

  return (
    <div className='flex w-full h-screen-minus-navbar'>
      <div className='pt-6 w-1/2 overflow-y-auto'>
        <h2 className='font-bold text-gray-500 pl-6 text-xl'>{restaurants.length} résultats</h2>
        {restaurants?.map((r) => (
          <div className='px-1 lg:px-4 block' key={r._id}>
            <Link href={`/restaurants/${r._id}`} target='_blank' passHref>
              <a target='_blank' rel='noopener noreferrer'>
                <RestaurantCard restaurant={r} />
              </a>
            </Link>
            <div className='w-full border-b'></div>
          </div>
        ))}
      </div>
      <div className='w-1/2'>
        <Map restaurants={restaurants} />
      </div>
    </div>
  )
}

export default Restaurants
