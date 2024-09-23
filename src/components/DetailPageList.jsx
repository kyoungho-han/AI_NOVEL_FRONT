import React from "react";
import style from "../style/DetailPageList.module.css"; // 스타일 파일 경로에 맞게 조정

function DetailPageList(props) {
    const { datas, onClick } = props;

    return (
        <div className={style.chapterListContainer}>
            {datas.map((chapter, index) => (
                <div
                    key={index}
                    className={style.chapterItem}
                    onClick={() => onClick(chapter.chapterId)}
                >
                    <div className={style.chapterDetails}>
                        <p className={style.chapterIndex}>{index + 1}화</p>
                        <p className={style.chapterName}>{chapter.chapterName}</p>
                    </div>
                    <button className={style.readButton}>보기</button>
                </div>
            ))}
        </div>
    );
}

export default DetailPageList;
