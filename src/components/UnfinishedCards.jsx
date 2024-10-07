import React from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import NewCardImage from "./NewCardImage";

function UnfinishedCards(props) {
  const { unfinishedNovels , onClick} = props;

  if (!unfinishedNovels) {
    return <div>작성중인 소설이 없습니다.</div>;
  }
  
  return (
    <>
      {unfinishedNovels.map((data, index) => (
        <Card style={{ width: '13rem' }} key={index}>
          <NewCardImage novelId={data.novelId}></NewCardImage>
          <Card.Body>
            <Card.Title>{data.title}</Card.Title>
            <Card.Text>{data.name}</Card.Text>
            <Card.Text>{data.genre}</Card.Text>
            <Button onClick={() => onClick(data.novelId)} variant="dark">작성 하러 가기</Button>
          </Card.Body>
        </Card>
      ))}
    </>
  );
}

export default UnfinishedCards;