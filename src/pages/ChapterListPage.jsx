import React, { useState, useContext, useEffect } from 'react';
import { NovelContext } from '../context/NovelContext';
import ChapterList from '../components/ChapterList';
import styles from '../style/ChapterListPage.module.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import CoverModals from '../components/CoverModals';
import axios from 'axios';
import { useSelector } from 'react-redux';
import {useNavigate, useParams} from "react-router-dom";

const ChapterListPage = () => {
    const { novelTitle } = useContext(NovelContext);
    const [showModal, setShowModal] = useState(false);
    const [chapterData, setChapterData] = useState([]);
    const [selectedImage, setSelectedImage] = useState("");
    const [novelData, setNovelData] = useState({});
    const { novelId } = useParams();
    const navigate = useNavigate();

    const accessToken = useSelector((state) => state.authToken);

    useEffect(() => {
        const fetchData = async () => {
            try {
                axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken.accessToken}`;
                const response = await axios.get('http://localhost:3000/chapters', {
                    params: { novelId }
                });
                if (response.data && response.data.dtoList.length > 0) {
                    setChapterData(response.data.dtoList);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [accessToken.accessToken, novelId]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/novels/${novelId}`, {
                    headers: { Authorization: `Bearer ${accessToken.accessToken}` }
                });
                setNovelData(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [accessToken.accessToken, novelId]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken.accessToken}`;
                const response = await axios.get(`http://localhost:3000/novels/download/${novelId}`, {
                    responseType: 'arraybuffer', // 바이너리 데이터로 응답받기
                });

                // base64로 인코딩
                const base64 = btoa(
                    new Uint8Array(response.data).reduce(
                        (data, byte) => data + String.fromCharCode(byte),
                        ''
                    )
                );

                // data URL 형식으로 이미지 설정
                setSelectedImage(`data:image/png;base64,${base64}`);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [novelId, accessToken]);


    const handleCloseModalWithImg = async (selectedImage) => {
        setSelectedImage(selectedImage); // 선택된 이미지 업데이트
        try {
            const response = await fetch(selectedImage);
            const blob = await response.blob();

            const formData = new FormData();
            formData.append('file', blob, `novel_${novelId}.png`);
            formData.append('uuid', selectedImage);

            if (selectedImage) {
                await axios.post(`http://localhost:3000/novels/upload/${novelId}`, formData, {
                    'Content-Type': 'multipart/form-data'
                });
            }
        } catch (error) {
            console.log(error);
        }
        setShowModal(false);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleSelectImg = () => {
        setShowModal(true);
    };

    const handleSubmit = () => {
        if (!selectedImage) {
            alert("소설 표지를 먼저 선택해주세요.");
            return false;
        }

        const confirmPublish = window.confirm("소설이 출판되면 다시 수정할 수 없습니다. 정말 출판 하시겠습니까?");

        if (confirmPublish) {
            const data = {
                title: novelTitle,
                isPublic: true
            };

            axios.put(`http://localhost:3000/novels/${novelId}`, data)
                .then(response => {
                    alert("소설이 성공적으로 출판 되었습니다.");
                    navigate('/main');
                })
                .catch(error => {
                    console.log(error);
                });
        } else {
            alert("출판이 취소되었습니다.");
        }
    };

    const handleTempSave = () => {
        alert("소설이 임시 저장되었습니다. 내 서제에서 확인해주세요.");
        navigate('/main');
    }

    return (
        <div className={styles.section}>
            <Container>
                <Row>
                    <Col xs={12} md={6}>
                        <div className={styles.imgContainer}>
                            <div className={styles.titleContainer}>
                                <h4 className={styles.novelTitle}>{novelData.title}</h4>
                            </div>
                            <img
                                src={selectedImage || "../img/bookImg.png"}
                                alt="책 표지"
                                className={styles.bookCover}
                            />
                        </div>
                    </Col>
                    <Col xs={12} md={6}>
                        <div className={styles.chapter}>
                            <ChapterList novelId={novelId} chapterList={chapterData} novelData={novelData} />
                        </div>
                        <div className={styles.button}>
                            <Button variant="outline-warning" onClick={handleTempSave}>임시 저장</Button>
                            <Button variant="outline-info" onClick={handleSelectImg} style={{marginLeft: '10px'}}>
                                소설 표지 선택
                            </Button>
                            <Button variant="outline-success" onClick={handleSubmit} style={{marginLeft: '10px'}}>
                                소설 출판
                            </Button>
                        </div>
                        <CoverModals
                            show={showModal}
                            onCloseWithImg={handleCloseModalWithImg}
                            onClose={handleCloseModal}
                        />
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default ChapterListPage;
