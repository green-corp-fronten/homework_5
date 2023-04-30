import React, { useEffect, useState } from 'react';
import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';
import './App.css';
import { api } from '../../utils/api';
import { useDebounce } from '../../utils/utils';
import { Route, Routes } from 'react-router-dom';
import { ProductPage } from '../../pages/ProductPage/ProductPage';
import { CatalogPage } from '../../pages/CatalogPage/CatalogPage';

function App() {
  const [cards, setCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [parentCounter, setParentCounter] = useState(0);
  const [currentUser, setCurrentUser] = useState({});

  const handleSearch = (search) => {
    api.searchProducts(search).then((data) => setCards([...data]));
  };

  const debounceValueInApp = useDebounce(searchQuery, 500);

  function handleProductLike(product) {
    const isLiked = product.likes.some((el) => el === currentUser._id);
    isLiked
      ? api.deleteLike(product._id).then((newCard) => {
          const newCards = cards.map((e) =>
            e._id === newCard._id ? newCard : e
          );
          setCards([...newCards]);
        })
      : api.addLike(product._id).then((newCard) => {
          const newCards = cards.map((e) =>
            e._id === newCard._id ? newCard : e
          );
          setCards([...newCards]);
        });
  }

const clickMe = async () => {
  await api.addNewProduct()
};

  useEffect(() => {
    handleSearch(debounceValueInApp);
  }, [debounceValueInApp]);

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getProductList()]).then(
      ([userData, productData]) => {
        setCurrentUser(userData);
        setCards(productData.products);
      }
    );
  }, []);

  return (
    <>
      <Header
        user={currentUser}
        parentCounter={parentCounter}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <main className='content container'>
        <button onClick={ () => clickMe()}>Нажми</button>
        <Routes>
          <Route
            path='/'
            element={
              <CatalogPage
                searchQuery={searchQuery}
                cards={cards}
                currentUser={currentUser}
                handleProductLike={handleProductLike}
                setParentCounter={setParentCounter}
              />
            }
          ></Route>
          <Route path='/product/:productId' element={<ProductPage currentUser={currentUser} />}>
          </Route>
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
// useEffect - для побочных действий
// useEffect(()=>{}) - update на каждое изменение компонента.
// useEffect(()=>{},[state]) - update на каждое изменение конкретного state.
// useEffect(()=>{},[]) - update в самом начале

// Чистая функция - это функция , которая при одних и тех же входных параметрах возвращает одинаковый результат.

// <BrowserRouter>
//  <Routes>
//   <Route path="/" element={<Dashboard />}>
//   <Route path="product" element={<AboutPage />} />
// </Routes> 
// </BrowserRouter>
