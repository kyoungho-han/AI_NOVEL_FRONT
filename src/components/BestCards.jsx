import React from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import NewCardImage from "./NewCardImage";

function BestCards(props) {
  const { bestData , onClick} = props;

  if (!bestData) {
    // 로딩 상태를 표시하거나 플레이스홀더 컴포넌트를 반환합니다.
    return <div>Loading...</div>;
  }

  if (bestData.length === 0) {
    // bestData가 빈 배열인 경우를 처리합니다.
    return <div>베스트 데이터가 없습니다.</div>;
  }

  

  return (
    <>
      {bestData.map((data, index) => (
        <Card style={{ width: '13rem' }} key={index}>
          <NewCardImage novelId={data.novelId}></NewCardImage>
          <Card.Body>
            <Card.Title>{data.title}</Card.Title>
            <Card.Text>{data.name}</Card.Text>
            <Card.Text>{data.genre}</Card.Text>
            <Button onClick={() => onClick(data.novelId)} variant="dark">내용 보러 가기</Button>
          </Card.Body>
        </Card>
      ))}
    </>
  );
}

export default BestCards;