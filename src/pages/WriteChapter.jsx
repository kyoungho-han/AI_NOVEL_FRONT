import React, { useState, useContext, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import styles from '../style/WriteChapter.module.css';
import Modals from '../components/Modals';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { NovelContext } from '../context/NovelContext';

const WriteChapter = () => {
    const { novelId, chapterId, setChapterId, prevChapterId } = useContext(NovelContext);
    const [chapterTitle, setChapterTitle] = useState('');
    const [textValue, setTextValue] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [prevChapterIdLocal, setPrevChapterIdLocal] = useState(null);
    const [selectedImage, setSelectedImage] = useState("");
    const navigate = useNavigate();

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const isNewChapter = queryParams.get('isNewChapter') === 'true';
    const currentChapterId = queryParams.get('chapterId');

    useEffect(() => {
        if (!isNewChapter && currentChapterId && currentChapterId !== prevChapterIdLocal) {
            setChapterId(currentChapterId);
            setPrevChapterIdLocal(currentChapterId);

            axios.get(`http://localhost:3000/chapters/${currentChapterId}`)
                .then(response => {
                    setChapterTitle(response.data.chapterName);
                    setTextValue(response.data.writing);
                })
                .catch(error => {
                    console.log(error);
                });
            axios.get(`http://localhost:3000/chapters/download/${currentChapterId}`)
                .then(response => {
                    setSelectedImage(response.data.string);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }, [prevChapterIdLocal]);

    const handleCloseModalWithImg = (selectedImage) => {
        setSelectedImage(selectedImage);
        setShowModal(false);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleCompleteWriting = () => {
        if (!selectedImage) {
            alert("챕터 그림을 먼저 선택해주세요.");
            return false;
        }

        const data = {
            chapterName: chapterTitle,
            writing: textValue,
            novelId: novelId,
            prevChapterId: prevChapterId
        };

        if (isNewChapter) {
            axios.post(`http://localhost:3000/chapters`, data)
                .then(response => {
                    const fileData = {
                        string: selectedImage
                    };
                    if (selectedImage) {
                        axios.post(`http://localhost:3000/chapters/upload/${response.data.chapterId}`, fileData)
                            .then(response => {

                            });
                    }
                    navigate(`/chapterListPage/${novelId}`);
                })
                .catch(error => {
                    console.log(error);
                });
        } else {
            axios.put(`http://localhost:3000/chapters/${chapterId}`, data)
                .then(response => {
                    const fileData = {
                        string: selectedImage
                    };
                    if (selectedImage) {
                        axios.put(`http://localhost:3000/chapters/updateFile/${chapterId}`, fileData)
                            .then(response => {

                            });
                    }
                    navigate(`/chapterListPage/${novelId}`);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    };

    const handleChangeTitle = (event) => {
        const newTitle1 = event.target.value;
        setChapterTitle(newTitle1);
    };

    const handleChangeWriting = (event) => {
        const newText1 = event.target.value;
        setTextValue(newText1);
    };

    const getByteCount = (text) => {
        const encoder = new TextEncoder();
        const encodedText = encoder.encode(text);

        return encodedText.length;
    };

    const handleSelectImg = () => {
        setShowModal(true);
    };

    const handleBackToList = () => {
        navigate(`/chapterListPage/${novelId}`);
    };

    return (
        <div className={styles.container}>
            <div className={styles.chapterTitle}>
                챕터 제목:
                <input
                    className={styles.txtareaName}
                    value={chapterTitle}
                    onChange={handleChangeTitle}
                />
            </div>
            <hr />
            <div className={styles.contentWrapper}>
                <textarea
                    className={styles.txtarea}
                    value={textValue}
                    onChange={handleChangeWriting}
                />
            </div>
            <p className={styles.byteCount}>
                {getByteCount(textValue)} bytes / {(5000 / 1024).toFixed(2)} KB
            </p>
            {selectedImage && (
                <div className={styles.imageWrapper}>
                    <img src={selectedImage} alt="Selected" />
                </div>
            )}
            <hr />
            <div className={styles.btn}>
                <Button variant="outline-warning" onClick={handleBackToList}>목록 가기</Button>
                <Button variant="outline-info" onClick={handleSelectImg}>그림 선택</Button>
                <Button variant="outline-success" onClick={handleCompleteWriting}>글 저장 완료</Button>
            </div>
            <Modals
                show={showModal}
                onCloseWithImg={handleCloseModalWithImg}
                onClose={handleCloseModal}
            />
        </div>
    );
};

export default WriteChapter;
