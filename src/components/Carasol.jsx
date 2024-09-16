import React, { useState, useEffect } from 'react';
import cardData from '../dataFile/cardData.json';

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % cardData.length);
    }, 5000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-96 overflow-hidden">
      {cardData.map((card, index) => (
        <div
          key={card.id}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={card.Image}
            alt={card.Name}
            className="w-full h-full object-contain"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
            <h2 className="text-xl font-bold">{card.Name}</h2>
            <p>Price: ${card.Price}</p>
            <p>Rating: {card.Rating}/10</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Carousel;
