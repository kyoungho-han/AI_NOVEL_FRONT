import React, { useEffect, useState } from "react";
import style from "../style/DetailPageList.module.css";
import axios from "axios";

function DetailPageList(props) {
    const { datas, onClick } = props;
    const [chapterImages, setChapterImages] = useState([]);

    useEffect(() => {
        const fetchChapterImages = async () => {
            const images = await Promise.all(
                datas.map(async (chapter) => {
                    if (chapter) {
                        try {
                            const response = await axios.get(`http://localhost:3000/chapters/download/${chapter.chapterId}`);
                            return response.data.string;
                        } catch (error) {
                            console.log(error);
                            return ''; // 이미지가 없을 경우 빈 문자열로 반환
                        }
                    }
                    return '';
                })
            );
            setChapterImages(images);
        };

        fetchChapterImages();
    }, [datas]);

    return (
        <div className={style.chapterListContainer}>
            {datas.map((chapter, index) => (
                <div
                    key={index}
                    className={style.chapterItem}
                    onClick={() => onClick(chapter.chapterId)}
                >
                    <div className={style.chapterInfo}>
                        {/* 챕터 그림 (이미지가 있을 경우에만 표시) */}
                        {chapterImages[index] && (
                            <img
                                src={chapterImages[index]}
                                alt={`Chapter ${index + 1} 이미지`}
                                className={style.chapterImage}
                            />
                        )}

                        {/* 챕터 인덱스 및 이름 */}
                        <p className={style.chapterIndex}>{index + 1}. {chapter.chapterName}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default DetailPageList;
