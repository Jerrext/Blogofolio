import React, { FC } from "react";

import { CardListType, CardSize } from "../../utils/@globalTypes";
import Card from "../../components/Card";
import EmptyState from "../../components/EmptyState";
import styles from "./SearchCardList.module.scss";

type SearchCardListProps = {
  cardsList: CardListType;
};
const SearchCardList: FC<SearchCardListProps> = ({ cardsList }) => {
  return cardsList.length > 0 ? (
    <div className={styles.container}>
      {cardsList.map((item, index) => {
        return (
          <Card
            key={`searchItem_${item.id}_${index}`}
            card={item}
            size={CardSize.Search}
          />
        );
      })}
    </div>
  ) : (
    <EmptyState
      title="Sorry, there's no posts"
      description="Try to use another search request"
    />
  );
};
export default SearchCardList;
