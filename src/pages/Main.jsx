import React, { useEffect, useContext } from "react";
import { useSelector } from 'react-redux';
import axios from "axios";
import { NovelContext } from '../context/NovelContext';
import Slides from "../components/Slides";
import CardTabs from "../components/CardTabs";
import style from "../style/Main.module.css";

function Main() {
  const accessToken = useSelector((state) => state.authToken);
  const { setUserName } = useContext(NovelContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if(accessToken.accessToken !== null) {
          const response = await axios.get('http://localhost:3000/authors/name', {
            headers: {
              Authorization: `Bearer ${accessToken.accessToken}`
            }
          });
          setUserName(response.data.name);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [accessToken.accessToken, setUserName]);

  return (
      <div className={style.container}>
        <Slides />
        <div className={style.content}>
          <CardTabs />
        </div>
      </div>
  );
}

export default Main;
