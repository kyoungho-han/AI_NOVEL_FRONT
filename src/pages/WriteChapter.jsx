import React, {useState, useContext, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import styles from '../style/WriteChapter.module.css';
import Form from 'react-bootstrap/Form';
import Modals from '../components/Modals';
import axios from 'axios';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { NovelContext } from '../context/NovelContext';

const WriteChapter = () => {
    const { novelId, chapterId, setChapterId, prevChapterId } = useContext(NovelContext);
    const [ chapterTitle, setChapterTitle ] = useState('');
    const [ textValue, setTextValue ] = useState('');
    const [ showModal, setShowModal ] = useState(false);
    const [prevChapterIdLocal, setPrevChapterIdLocal] = useState(null); // 로컬 상태 추가
    const [selectedImage, setSelectedImage] = useState("");
    const [novelData, setNovelData] = useState({});
    const navigate = useNavigate();

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const isNewChapter = queryParams.get('isNewChapter') === 'true';
    const currentChapterId = queryParams.get('chapterId');

    useEffect(() => {
        if (!isNewChapter && currentChapterId && currentChapterId !== prevChapterIdLocal) {
            setChapterId(currentChapterId);
            setPrevChapterIdLocal(currentChapterId); // 현재 chapterId를 로컬 상태로 설정

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

    useEffect(() => {
        axios.get(`http://localhost:3000/novels/${novelId}`)
            .then(response => {
                setNovelData(response.data);
                console.log(response)
            })
            .catch(error => {
                console.log(error);
            });
    }, [novelId])

    // 모달 닫기
    const handleCloseModalWithImg = (selectedImage) => {
        setSelectedImage(selectedImage); // 선택된 이미지 업데이트
        setShowModal(false);
    };

    // 모달 닫기
    const handleCloseModal = () => {
        setShowModal(false);
    };

    // 현재 작성중인 소설 내용 전송
    const handleCompleteWriting = () => {

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

                            })
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

                            })
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
    }

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
    }

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
            <textarea
                className={styles.txtarea}
                value={textValue}
                onChange={handleChangeWriting}
            />
            <p className={styles.byteCount}>
                {getByteCount(textValue)} bytes / {(5000 / 1024).toFixed(2)} KB
            </p>
            {selectedImage && (
                <div>
                    <img src={selectedImage} alt="Selected" />
                </div>
            )}
            <hr />
            <div className={styles.btn}>
                <Button variant="outline-info" onClick={handleSelectImg}>그림 선택</Button>
                <Button variant="outline-warning">임시 저장</Button>
                <Button variant="outline-success" onClick={handleCompleteWriting}>글 작성 완료</Button>
            </div>
            <Modals
                show={showModal}
                onCloseWithImg={handleCloseModalWithImg}
                onClose={handleCloseModal}
            />
        </div>
    );
}

export default WriteChapter;