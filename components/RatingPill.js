import classNames from 'classnames'

const RatingPill = ({ avgRating, reviewCount }) => {
  return (
    <div
      className={classNames('px-2 py-[4px] text-sm rounded flex items-center bg-green-100', {
        'bg-gray-100': reviewCount === 0,
        'bg-yellow-100': avgRating < 7,
        'bg-red-100': avgRating < 4,
      })}
    >
      {reviewCount > 0 ? (
        <>
          <span className='font-bold mr-1'>{avgRating}/10</span>
          <span className='text-xs text-gray-600'> • {reviewCount} avis</span>
        </>
      ) : (
        <span className='text-xs text-gray-600'>Aucun avis</span>
      )}
    </div>
  )
}

export default RatingPill
