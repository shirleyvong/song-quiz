import React from 'react';
import styled from 'styled-components';

const ListItem = ({ image, name, handleItemSelect }) => {
  const imageUrl = image && image.url || '';

  return (
    <Container onClick={handleItemSelect}>
      <Image src={imageUrl} />
      <Name>{name}</Name>
    </Container>
  );
};

const Container = styled.button`
  display: flex;
  align-items: center;
  background-color: #333333;
  margin: 10px 0 10px 0;
  padding: 10px;
  width: 100%;
  max-width: 500px;
  border-radius: 20px;
  border: none;
  font-family: inherit;
  color: inherit;

  &:hover {
    font-weight: bold;
    background-color: #575757;
    transition: font-weight 0.2s;
    transition: background-color 0.2s;
    cursor: pointer;
  }

  &:focus {
    outline: none;
  }
`;

const Image = styled.img`
  height: 80px;
  width: 80px;
  border-radius: 20px;
`;

const Name = styled.span`
  font-size: 1.2rem;
  padding: 10px;
`;

export default ListItem;
