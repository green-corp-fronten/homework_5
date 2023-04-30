import { CardList } from '../../components/CardList/CardList';
import { getIssues } from '../../utils/utils';

export const CatalogPage = ({searchQuery, cards, currentUser, handleProductLike, setParentCounter}) => {
  return <>
      {searchQuery && (
          <p>
            По запросу {searchQuery} найдено {cards.length}
            {getIssues(cards.length)}
          </p>
        )}
        <CardList
          currentUser={currentUser}
          handleProductLike={handleProductLike}
          setParentCounter={setParentCounter}
          cards={cards}
        />
  </>
};
