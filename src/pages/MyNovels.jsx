import React, { useState, useEffect, useContext } from 'react';
import { Row, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { NovelContext } from '../context/NovelContext';
import BestCards from '../components/BestCards';
import NewCard from '../components/NewCard';
import style from '../style/MyNovels.module.css';

const MyNovels = () => {
    const { userName } = useContext(NovelContext);
    const [bestData, setBestData] = useState([]);
    const [newData, setNewData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBestData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/novels`, {
                    params: {
                        name: userName,
                        isMine: true,
                        isPublic: false
                    }
                });
                setBestData(response.data.dtoList);
            } catch (error) {
                console.log(error);
            }
        };
        fetchBestData();
    }, [userName]);

    useEffect(() => {
        const fetchNewData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/novels`, {
                    params: {
                        name: userName,
                        isMine: true,
                        isPublic: true
                    }
                });
                setNewData(response.data.dtoList);
            } catch (error) {
                console.log(error);
            }
        };
        fetchNewData();
    }, [userName]);

    const handleBtn = () => {
        navigate('/insertNovelData');
    };

    const handleTitleClick = (novelId) => {
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
                    <BestCards bestData={bestData} onClick={handleTitleClick} />
                </Row>
            </section>
            <section className={style.section}>
                <h4>완성된 작품</h4>
                <hr />
                <Row className={style.cardRow}>
                    <NewCard newData={newData} onClick={handleTitleClick} />
                </Row>
            </section>
        </Container>
    );
};

export default MyNovels;
