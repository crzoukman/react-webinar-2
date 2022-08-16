import React, {useCallback} from "react";
import useSelector from "../../utils/use-selector";
import useStore from "../../utils/use-store";
import List from "../../components/list";
import Pagination from "../../components/pagination";
import Spinner from "../../components/spinner";
import Item from "../../components/item";

function CatalogList() {

  const store = useStore();

  const select = useSelector(state => ({
    items: state.catalog.items,
    page: state.catalog.params.page,
    limit: state.catalog.params.limit,
    count: state.catalog.count,
    waiting: state.catalog.waiting
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    // Пагианция
    onPaginate: useCallback(page => store.get('catalog').setParams({page}), []),
  };

  const renders = {
    item: useCallback(item => (
      <Item item={item} onAdd={callbacks.addToBasket} link={`/articles/${item._id}`}/>
    ), []),
  }

  return (
    <Spinner active={select.waiting}>
      <List items={select.items} renderItem={renders.item}/>
      <Pagination count={select.count} page={select.page} limit={select.limit} onChange={callbacks.onPaginate}/>
    </Spinner>
  );
}

export default React.memo(CatalogList);