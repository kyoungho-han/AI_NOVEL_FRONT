import React, { useContext, useState } from "react";
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';
import { NovelContext } from '../context/NovelContext';

function ChapterList({ novelId, chapterList })  {
  const { novelTitle, novelGenre, userName, setChapterId, prevChapterId, setPrevChapterId } = useContext(NovelContext);
  const [chapterCount, setChapterCount] = useState(Math.max(1, chapterList.length)); // chapterList의 길이 또는 1로 초기화

  console.log(chapterList);

  /*const handleAddChapter = () => {
    if (chapterCount < 10) {
      setChapterCount(prevCount => prevCount + 1); // 챕터 개수를 1 증가시킴
    }
  };*/

  const renderChapterItems = () => {
    const chapterItems = [];
    const totalChapters = chapterList.length ? chapterList.length + 1 : 1;
    setPrevChapterId(prevChapterId);
    for (let i = 0; i < totalChapters; i++) {
        const chapterTitle = (
            <Link
                to={`/writeChapter/${novelId}/${i + 1}?isNewChapter=${!chapterList[i]}&chapterId=${chapterList[i] ? chapterList[i].chapterId : ''}`}
            >
                {chapterList[i] ? chapterList[i].chapterName : `신규챕터작성`}
            </Link>
        );
      chapterItems.push(
          <ListGroup.Item
              key={i}
              as="li"
              className="d-flex justify-content-between align-items-start"
          >
            <div className="ms-2 me-auto">
                <div className="fw-bold">Chapter{i+1}. {chapterTitle}</div>
            </div>
          </ListGroup.Item>
      );
    }
    return chapterItems;
  };

  return (
      <ListGroup>
        <ListGroup.Item
            variant="primary"
            as="li"
            className="d-flex justify-content-between align-items-start"
        >
          <div className="ms-2 me-auto">
            <div className="fw-bold"> {novelTitle} / {userName} / {novelGenre} </div>
          </div>
        </ListGroup.Item>
        {renderChapterItems()}
        {chapterCount < 10 && (
            <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
            >
              <div className="ms-2 me-auto">
                {/*<button onClick={handleAddChapter} className="btn btn-outline-primary">
                  챕터 추가
                </button>*/}
              </div>
            </ListGroup.Item>
        )}
      </ListGroup>
  );
}

export default ChapterList;