import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCookieToken, removeCookieToken } from '../storage/Cookie';
import { DELETE_TOKEN } from '../store/Auth';
import { logoutUser } from '../api/Users';
import styled from "styled-components";

const style = {
    marginLeft: "10px",
    backgroundColor: "white",
    border: "none"
}



function Logout(){
    // store에 저장된 Access Token 정보를 받아 온다
    const accessToken  = useSelector(state => state.token);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    

    function deleteToken(){
        dispatch(DELETE_TOKEN())
        removeCookieToken();
        navigate("/login")
    }

    return (
         <button style={style} onClick={deleteToken}>
            로그아웃
         </button>
    );
}

export default Logout;