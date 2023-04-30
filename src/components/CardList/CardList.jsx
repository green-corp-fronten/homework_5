import { Card } from '../Card/Card';
import './index.css';
import { useEffect, useState } from 'react';

export const CardList = ({
  currentUser,
  cards,
  setParentCounter,
  handleProductLike,
}) => {

  return (
    <div className='cards'>
      {cards.map((item) => {
        // console.log({ item });
        return (
          <Card
            currentUser={currentUser}
            product={item}
            onProductLike={handleProductLike}
            setParentCounter={setParentCounter}
            {...item}
            key={item._id}
          />
        ); // rest operator
      })}
    </div>
  );
};
