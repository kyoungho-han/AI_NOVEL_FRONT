import React, {useEffect, createContext, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';

// Create the context
const NovelContext = createContext();

// Create a provider component
const NovelProvider = ({ children }) => {
    const [novelTitle, setNovelTitle] = useState(() => {
        const savedNovelTitle = localStorage.getItem('novelTitle');
        return savedNovelTitle || "";
    });

    const [novelGenre, setNovelGenre] = useState(() => {
        const savedNovelGenre = localStorage.getItem('novelGenre');
        return savedNovelGenre || "추리";
    });

    const [userName, setUserName] = useState(() => {
        const savedUserName = localStorage.getItem('userName');
        return savedUserName || "";
    });

    const [at, setAt] = useState(() => {
        const savedAt = localStorage.getItem('at');
        return savedAt || "";
    });

    const [novelId, setNovelId] = useState(() => {
        const savedNovelId = localStorage.getItem('novelId');
        return savedNovelId || null;
    });

    const [chapterId, setChapterId] = useState(() => {
        const savedChapterId = localStorage.getItem('chapterId');
        return savedChapterId || null;
    });

    const [prevChapterId, setPrevChapterId] = useState(() => {
        const savedPrevChapterId = localStorage.getItem('prevChapterId');
        return savedPrevChapterId || null;
    });


    const accessToken = useSelector((state) => state.authToken);

    useEffect(() => {
        localStorage.setItem('novelTitle', novelTitle);
    }, [novelTitle]);

    useEffect(() => {
        localStorage.setItem('novelGenre', novelGenre);
    }, [novelGenre]);

    useEffect(() => {
        localStorage.setItem('userName', userName);
    }, [userName]);

    useEffect(() => {
        localStorage.setItem('at', at);
    }, [at]);

    useEffect(() => {
        localStorage.setItem('novelId', novelId);
    }, [novelId]);

    useEffect(() => {
        localStorage.setItem('chapterId', chapterId);
    }, [chapterId]);

    useEffect(() => {
        localStorage.setItem('prevChapterId', prevChapterId);
    }, [prevChapterId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken.accessToken}`;
        const response = await axios.get('http://localhost:3000/authors/name', {
        });
        setAt(accessToken.authenticated);
        return setUserName(response.data.name);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <NovelContext.Provider
      value={{
        novelTitle,
        setNovelTitle,
        novelGenre,
        setNovelGenre,
        userName,
        setUserName,
        at,
        setAt,
        novelId,
        setNovelId,
        chapterId,
        setChapterId,
        prevChapterId,
        setPrevChapterId
      }}
    >
      {children}
    </NovelContext.Provider>
  );
};

export { NovelContext, NovelProvider };