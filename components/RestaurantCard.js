import RatingPill from 'components/RatingPill'
import ReadMore from 'components/ReadMore'
import { Image } from 'react-feather'
import { repeat } from 'lodash'
import { useRestaurantCardHover } from './context/RestaurantCardHoverProvider'
import classNames from 'classnames'

const LastComment = ({ comment }) => {
  if (!comment) return null
  return (
    <div className='text-ellipsis text-xs text-gray-500 mt-3'>
      <ReadMore text={comment} withQuotes />
    </div>
  )
}

const RestaurantCard = ({ restaurant }) => {
  const { avgRating, name, reviewCount, succursales, reviews } = restaurant
  const { setHoveredId, hoveredId } = useRestaurantCardHover()
  const lastComment = reviews[0]?.comment

  return (
    <div
      className={classNames('py-3 lg:py-6 px-1 lg:px-2 flex justify-between items-start', {
        'bg-slate-50': hoveredId === restaurant._id,
      })}
      onMouseEnter={() => setHoveredId(restaurant._id)}
      onMouseLeave={() => setHoveredId(null)}
    >
      <div
        className='bg-gray-100 rounded w-1/4 h-24 mr-2 lg:mr-3 flex items-center justify-center'
        style={{ minWidth: '23%' }}
      >
        <Image className='text-gray-300' size={48} alt='placeholder' />
      </div>
      <div style={{ minWidth: '75%' }}>
        <div className='flex justify-between items-center mb-1 lg:mb-2'>
          <div className='font-bold text-base lg:text-lg'>{name}</div>
          <RatingPill avgRating={avgRating} reviewCount={reviewCount} />
        </div>
        <div className='text-xs text-gray-500'>
          <span className='font-bold'>
            {restaurant.priceRange && `${repeat('$', restaurant.priceRange)}	• `}
          </span>
          {succursales.length === 1
            ? succursales[0].address.label
            : `${succursales.length} adresses au Québec`}
        </div>
        <LastComment comment={lastComment} />
      </div>
    </div>
  )
}

export default RestaurantCard
