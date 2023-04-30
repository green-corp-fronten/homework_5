import React, { useEffect, useState } from 'react';
import { Logo } from '../Logo/Logo';
import { Search } from '../Search/Search';
import './style.css';

import { ReactComponent as Basket } from './images/Basket.svg';
import IconBasket from './basketMaterial/BasketMaterial';

export const Header = ({ setSearchQuery, searchQuery, parentCounter = 0, user }) => {
  // start here
  // useState
  // useEffect

  const [counter, setCounter] = useState(parentCounter);

  useEffect(() => {
    setCounter((st) => st + 1);
  }, [parentCounter]);

  // state.push(); deprecated!!!
  return (
    <div className='header' id='head'>
      <div className='container'>
        <div className='header__wrapper'>
          <div className='header__left'>
            <Logo />
            <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          </div>
          <div>
            {/* <Basket /> */}
            <IconBasket count={counter} />
          </div>
          <div>
          <span>{user.email} {' '}</span>
          <span>{user.about}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// useEffect(()=>{}) - update на каждое изменение компонента.
// useEffect(()=>{},[state]) - update на каждое изменение конкретного state.
// useEffect(()=>{},[]) - update в самом начале
