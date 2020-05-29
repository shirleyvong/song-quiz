import React from 'react';
import styled from 'styled-components';

const SearchResultItem = ({ id, images, name }) => {
  const imageUrl = images && images[0] && images[0].url || '';

  return (
    <Container>
      <Image src={imageUrl} />
      <Name>{name}</Name>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  background-color: #333333;
  margin: 10px 0 10px 0;
  padding: 10px;
  width: 100%;
  max-width: 500px;
`;

const Image = styled.img`
  height: 80px;
  width: 80px;
`;

const Name = styled.span`
  font-size: 1.2rem;
  padding: 10px;
`;

export default SearchResultItem;
