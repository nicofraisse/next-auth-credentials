import axios from 'axios'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import toast from 'react-hot-toast'
import Spinner from 'components/Spinner'
import RatingPill from 'components/RatingPill'

import Map from 'components/Map'

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios
      .get('/api/restaurants')
      .then(({ data }) => {
        setLoading(false)
        setRestaurants(data)
      })
      .catch((err) => toast.error(err))
  }, [])

  if (loading) return <Spinner />

  if (!restaurants) return 'no restaurants'

  return (
    <div className='flex w-full h-screen-minus-navbar'>
      <div className='grow overflow-x-scroll pt-6 w-1/2'>
        {restaurants.map((r) => (
          <Link
            key={r._id}
            className='px-3 pb-6'
            href={`/restaurants/${r._id}`}
            target='_blank'
            passHref
          >
            <a target='_blank' rel='noopener noreferrer' className='px-4 pb-6 block'>
              <div className='pb-6 border-b flex justify-between items-start'>
                <div
                  className='bg-gray-200 rounded-lg w-1/4 h-24 mr-3'
                  style={{ minWidth: '20%' }}
                ></div>
                <div style={{ minWidth: '75%' }}>
                  <div className='flex justify-between items-center mb-2'>
                    <div className='font-bold text-lg'>{r.name}</div>
                    <RatingPill avgRating={r.avgRating} reviewCount={r.reviewCount} />
                  </div>

                  <div className='text-sm text-gray-500'>
                    {r.addresses.length === 1
                      ? r.addresses[0].label
                      : `${r.addresses.length} adresses au Québec`}
                  </div>
                  <div className='text-ellipsis text-xs text-gray-500 mt-3'>
                    &quot;...la poutine était vraiment excellente, miam. Les frites un peu sèches
                    mais quand même bonnes. Les frites un peu sèches mais quand...&quot;{' '}
                    <span className='font-bold underline'>lire la suite</span>
                  </div>
                </div>
              </div>
            </a>
          </Link>
        ))}
      </div>
      <div className='w-1/2'>
        <Map restaurants={restaurants} />
      </div>
    </div>
  )
}

export default Restaurants
