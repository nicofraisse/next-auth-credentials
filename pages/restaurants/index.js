import axios from 'axios'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import toast from 'react-hot-toast'
import Spinner from 'components/Spinner'
import Map from 'components/Map'
import RestaurantCard from '../../components/RestaurantCard'
import { useRestaurantSearch } from 'components/context/RestaurantSearchProvider'
import { useGet } from 'lib/useAxios'
import { RestaurantCardHoverProvider } from 'components/context/RestaurantCardHoverProvider'
import ReactSelect from 'react-select'
import { Sliders } from 'react-feather'
import Button from 'components/Button'
import useClickOutside from '../../lib/useClickOutside'
import classNames from 'classnames'

const sortTypes = [
  { label: 'Nom', value: 'name' },
  { label: 'Note moyenne', value: 'avgRating' },
  // { label: 'Date de création', value: 'createdAt' },
  { label: "Nombre d'avis", value: 'reviewCount' },
  // { label: 'Proximité', value: 'proximity' },
]

const sortOrders = [
  { label: 'Croissant', value: 1 },
  { label: 'Décroissant', value: -1 },
]

const Restaurants = () => {
  const { searchValue, nonDebouncedValue } = useRestaurantSearch()
  const [sortType, setSortType] = useState('reviewCount')
  const [sortOrder, setSortOrder] = useState(-1)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const filtersRef = useClickOutside(() => setFiltersOpen(false))

  const trimmedSearchValue = searchValue?.trim()
  const searchQuery = trimmedSearchValue ? `?search=${trimmedSearchValue}` : ''
  const sortTypeQuery = sortType ? `?sort=${sortType}` : ''
  const sortOrderQuery = sortOrder ? `&order=${sortOrder}` : ''

  const { data: restaurants, loading: restaurantsLoading } = useGet(
    `/api/restaurants${searchQuery}${sortTypeQuery}${sortOrderQuery}`
  )

  if (!restaurants) return <Spinner />

  const loading = searchValue !== nonDebouncedValue || restaurantsLoading

  return (
    <RestaurantCardHoverProvider>
      <div className='flex w-full flex-col md:flex-row-reverse h-screen-minus-navbar overflow-y-auto'>
        <div className='grow w-screen md:w-1/2 min-h-2/3vh max-h-2/3vh md:min-h-screen-minus-navbar md:max-h-screen-minus-navbar'>
          <Map restaurants={restaurants} />
        </div>
        <div className='pt-5 w-screen md:w-1/2 md:max-w-[560px] md:overflow-y-auto'>
          <div className='min-h-12'>
            <div className='lg:pl-6 lg:pr-5 px-2 m b-3 lg:mb-0 flex justify-between items-start'>
              {loading ? (
                <div className='h-12 flex items-center '>
                  <Spinner />
                </div>
              ) : (
                <h2 className='font-bold text-gray-500 text-xl flex items-center h-12 mr-2'>
                  {restaurants.length} résultat{restaurants.length > 1 && 's'}{' '}
                  {searchValue && `pour "${searchValue}"`}
                </h2>
              )}

              <div className='relative' ref={filtersRef}>
                <Button
                  variant='light'
                  height='sm'
                  className='w-[40px]'
                  onClick={() => setFiltersOpen(!filtersOpen)}
                >
                  <Sliders />
                </Button>

                <div
                  className={classNames(
                    'flex items-center absolute top-[48px] right-0 w-[375px] bg-white transition-opacity duration-300 p-3 rounded border',
                    {
                      'shadow-lg opacity-100': filtersOpen,
                      'shadow-none opacity-0 pointer-events-none': !filtersOpen,
                    }
                  )}
                >
                  <div className='text-sm font-bold text-gray-500 mr-2'>Tri par</div>
                  <ReactSelect
                    placeholder='Trier par...'
                    options={sortTypes}
                    className='mr-2 text-sm'
                    onChange={({ value }) => setSortType(value)}
                    defaultValue={{ label: "Nombre d'avis", value: 'avgRating' }}
                  />
                  <ReactSelect
                    placeholder='Ordre'
                    options={sortOrders}
                    className='text-sm'
                    onChange={({ value }) => setSortOrder(value)}
                    defaultValue={{ label: 'Décroissant', value: -1 }}
                  />
                </div>
              </div>
            </div>
          </div>
          {restaurants?.map((r) => (
            <div className='px-1 lg:px-4 block' key={r._id}>
              <RestaurantCard restaurant={r} />

              <div className='w-full border-b'></div>
            </div>
          ))}
        </div>
      </div>
    </RestaurantCardHoverProvider>
  )
}

export default Restaurants
