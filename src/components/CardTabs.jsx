import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import axios from "axios";
import Tabs from "react-bootstrap/Tabs";
import { Tab, Container, Row, TabContent } from "react-bootstrap";
import NewCard from "./NewCard";
import BestCards from "./BestCards";
import style from "../style/CardTabs.module.css";

function CardTabs() {
  const accessToken = useSelector((state) => state.authToken);
  const navigate = useNavigate();
  const [bestData, setBestData] = useState([]);
  const [newData, setNewData] = useState([]);

  useEffect(() => {
    const fetchBestData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/novels', {
          params: { isBest: true, size: 4 }
        });
        setBestData(response.data.dtoList);
      } catch (error) {
        console.log(error);
        alert("로그인을 해주세요");
        navigate("/login");
      }
    };
    fetchBestData();
  }, [navigate]);

  useEffect(() => {
    const fetchNewData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/novels', {
          params: { isBest: false, size: 4 }
        });
        setNewData(response.data.dtoList);
      } catch (error) {
        console.log(error);
        alert("로그인을 해주세요");
        navigate("/login");
      }
    };
    fetchNewData();
  }, [navigate]);

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
        <Tabs defaultActiveKey="best" id="card-tabs">
          <Tab eventKey="best" title="베스트 소설">
            <TabContent>
              <Row>
                <BestCards bestData={bestData} onClick={handleTitleClick} />
              </Row>
            </TabContent>
          </Tab>
          <Tab eventKey="latest" title="신작 소설">
            <TabContent>
              <Row>
                <NewCard newData={newData} onClick={handleTitleClick} />
              </Row>
            </TabContent>
          </Tab>
        </Tabs>
      </Container>
  );
}

export default CardTabs;
