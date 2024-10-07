import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import axios from "axios";
import Tabs from "react-bootstrap/Tabs";
import { Tab, Container, Row, TabContent } from "react-bootstrap";
import style from "../style/CardTabs.module.css";
import FinishedCards from "./FinishedCards";

function CardTabs() {
  const accessToken = useSelector((state) => state.authToken);
  const navigate = useNavigate();
  const [finishedNovels, setFinishedNovels] = useState([]);

  useEffect(() => {
    const fetchFinishedNovels = async () => {
      try {
        const response = await axios.get('http://localhost:3000/novels', {
          params: { isBest: false, size: 4 }
        });
        setFinishedNovels(response.data.dtoList);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFinishedNovels();
  }, []);

  const handleTitleClick = (novelId) => {
    if (accessToken.authenticated) {
      navigate(`/detail/${novelId}`);
    } else {
      alert("로그인을 해주세요");
      navigate("/login");
    }
  };

  return (
      <Container className={style.cardTabs}>
        <Tabs defaultActiveKey="latest" id="card-tabs">
          <Tab eventKey="latest" title="신작 소설">
            <TabContent>
              <Row>
                <FinishedCards finishedNovels={finishedNovels} onClick={handleTitleClick} />
              </Row>
            </TabContent>
          </Tab>
        </Tabs>
      </Container>
  );
}

export default CardTabs;
