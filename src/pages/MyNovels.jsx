import React, { useState, useEffect, useContext } from 'react';
import { Row, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { NovelContext } from '../context/NovelContext';
import style from '../style/MyNovels.module.css';
import FinishedCards from "../components/FinishedCards";
import UnfinishedCards from "../components/UnfinishedCards";

const MyNovels = () => {
    const { userName } = useContext(NovelContext);
    const [unfinishedNovels, setUnfinishedNovels] = useState([]);
    const [finishedNovels, setFinishedNovels] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUnfinishedNovels = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/novels`, {
                    params: {
                        name: userName,
                        isMine: true,
                        isPublic: false
                    }
                });
                setUnfinishedNovels(response.data.dtoList);
            } catch (error) {
                console.log(error);
            }
        };
        fetchUnfinishedNovels();
    }, [userName]);

    useEffect(() => {
        const fetchFinishedNovels = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/novels`, {
                    params: {
                        name: userName,
                        isMine: true,
                        isPublic: true
                    }
                });
                setFinishedNovels(response.data.dtoList);
            } catch (error) {
                console.log(error);
            }
        };
        fetchFinishedNovels();
    }, [userName]);

    const handleBtn = () => {
        navigate('/insertNovelData');
    };

    const handleEditClick = (novelId) => {
        navigate(`/chapterListPage/${novelId}`);
    };

    const handleCompleteClick = (novelId) => {
        navigate(`/detail/${novelId}`);
    };

    return (
        <Container className={style.container}>
            <div className={style.header}>
                <h4>{userName}님의 서재입니다!</h4>
                <button className={style.btnNew} onClick={handleBtn} style={{marginLeft: '20px'}}>+새 작품</button>
            </div>
            <section className={style.section}>
                <h4>작성 중인 작품</h4>
                <hr />
                <Row className={style.cardRow}>
                    <UnfinishedCards unfinishedNovels={unfinishedNovels} onClick={handleEditClick} />
                </Row>
            </section>
            <section className={style.section}>
                <h4>완성된 작품</h4>
                <hr />
                <Row className={style.cardRow}>
                    <FinishedCards finishedNovels={finishedNovels} onClick={handleCompleteClick} />
                </Row>
            </section>
        </Container>
    );
};

export default MyNovels;
