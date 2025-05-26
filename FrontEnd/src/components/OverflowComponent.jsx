import Card from './Card'
import cardData from '../dataFile/cardData.json'

const OverflowComponent = () => {
  return (
    <div className='relative w-full overflow-x-auto'>
      <div className='flex space-x-4 whitespace-nowrap pb-4 scrollbar-hide'>
        {cardData.map((card) => (
          <div key={card.id} className='flex-shrink-0'>
            <Card image={card.image} title={card.title} price={card.price} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default OverflowComponent
