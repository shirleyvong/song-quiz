import React from 'react';
import styled from 'styled-components';

const ListItem = ({ image, name, handleItemSelect }) => {
  const imageUrl = (image && image.url) || '';

  return (
    <Container onClick={handleItemSelect}>
      <Name>{name}</Name>
      <ImageWrapper>
        {imageUrl && <Image src={imageUrl} />}
      </ImageWrapper>
    </Container>
  );
};

const Container = styled.button`
  display: flex;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.3);
  margin: 10px 0 10px 0;
  padding: 10px;
  width: 100%;
  max-width: 500px;
  border-radius: 20px;
  border: none;
  font-family: inherit;
  color: inherit;
  justify-content: space-between;

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

const ImageWrapper = styled.div`
  height: 80px;
`;

const Image = styled.img`
  height: 80px;
  width: 80px;
  border-radius: 20px;
  object-fit: cover;
`;

const Name = styled.span`
  font-size: 1.2rem;
  padding: 10px;
`;

export default ListItem;
