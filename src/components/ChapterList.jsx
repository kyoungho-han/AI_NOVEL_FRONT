import React, { useContext, useState, useEffect } from "react";
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';
import { NovelContext } from '../context/NovelContext';
import axios from "axios";

function ChapterList({ novelId, chapterList })  {
    const { novelTitle, novelGenre, userName, setChapterId, prevChapterId, setPrevChapterId } = useContext(NovelContext);
    const [chapterCount, setChapterCount] = useState(Math.max(1, chapterList.length));
    const [chapterImages, setChapterImages] = useState([]);

    useEffect(() => {
        const fetchChapterImages = async () => {
            const images = await Promise.all(
                chapterList.map(async (chapter) => {
                    if (chapter) {
                        try {
                            const response = await axios.get(`http://localhost:3000/chapters/download/${chapter.chapterId}`);
                            return response.data.string;
                        } catch (error) {
                            console.log(error);
                            return '';
                        }
                    }
                    return '';
                })
            );
            setChapterImages(images);
        };

        fetchChapterImages();
    }, [chapterList]);

    const renderChapterItems = () => {
        const chapterItems = [];
        const totalChapters = chapterList.length ? chapterList.length + 1 : 1;
        setPrevChapterId(prevChapterId);

        for (let i = 0; i < totalChapters; i++) {
            const chapterImage = chapterImages[i];

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
                    className="d-flex justify-content-between align-items-center" // 이미지와 텍스트를 나란히 배치
                >
                    {/* 이미지 섹션 */}
                    {chapterImage && (
                        <img
                            src={chapterImage}
                            alt={`Chapter ${i + 1}`}
                            style={{ width: '50px', height: 'auto', marginRight: '15px', borderRadius: '5px' }}
                        />
                    )}
                    {/* 텍스트 섹션 */}
                    <div className="ms-2 me-auto">
                        <div className="fw-bold">Chapter {i+1}. {chapterTitle}</div>
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
                className="d-flex justify-content-between align-items-center"
            >
                <div className="ms-2 me-auto">
                    <div className="fw-bold"> {novelTitle} / {userName} / {novelGenre} </div>
                </div>
            </ListGroup.Item>
            {renderChapterItems()}
            {chapterCount < 10 && (
                <ListGroup.Item
                    as="li"
                    className="d-flex justify-content-between align-items-center"
                >
                    <div className="ms-2 me-auto">
                        {/* 챕터 추가 버튼 */}
                    </div>
                </ListGroup.Item>
            )}
        </ListGroup>
    );
}

export default ChapterList;
