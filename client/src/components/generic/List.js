import React from 'react';
import ListItem from './ListItem';

const List = ({ items, handleItemSelect }) => (
  items.map((item) => (
    <ListItem
      id={item.id}
      image={item.images[0]}
      name={item.name}
      handleItemSelect={handleItemSelect(item.id)}
    />
  ))
);

export default List;
