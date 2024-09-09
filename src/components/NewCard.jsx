import React, { useState } from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import NewCardImage from "./NewCardImage";


function NewCard(props) {
  const { newData, onClick } = props;


  if (!newData) {
    // 로딩 상태를 표시하거나 플레이스홀더 컴포넌트를 반환합니다.
    return <div>Loading...</div>;
  }

  if (newData.length === 0) {
    // newData가 빈 배열인 경우를 처리합니다.
    return <div>데이터가 없습니다.</div>;
  }
  

  return (
    <>
      {newData.map((data, index) => (
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

export default NewCard;