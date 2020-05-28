import React from 'react';
import styled from 'styled-components';

const ListItem = ({ id, images, name }) => {
  return (
    <div>
      <img src={images[2].url} />
      {name}
    </div>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const Image = styled.div`
  height: 150px;
  width: 150px;
`;

const Name = styled.div`
  
`;

export default ListItem;
