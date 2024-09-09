import {useState, React} from "react";
import { Link } from "react-router-dom";
import NavBarElements from "../components/NavBarElements";
import style from "../style/Login.module.css"

import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

import { HiLockClosed } from 'react-icons/hi'
import { ErrorMessage } from '@hookform/error-message';

import { loginUser } from '../api/Users';
import { setRefreshToken } from '../storage/Cookie';
import { SET_TOKEN } from '../store/Auth';



function Login(props) {
  // 1. 로그인시 서버측에 토큰 요청
  // 2. 만약에 맞다면 메인 페이지로 이동
  // 3. 만약에 틀리면 입력창 밑에 메세지 출력 
  // 4. 

  //입력한 유저정보
  const [username, setUserId] = useState("");
  const [password, setUserPw] = useState("");

  //토큰 여부
  const [isToken, setIsToken] = useState(false);

  const onChange1 = (e)=>{
    setUserId(e.target.value)
  }
  const onChange2 = (e)=>{
    setUserPw(e.target.value)
  }

  //오류 메세지
  const [loginMessage, setLoginMessage] = useState("")

  const navigate = useNavigate();
  const dispatch = useDispatch();

   // useForm 사용을 위한 선언
   const { register, setValue, formState: { errors }, handleSubmit } = useForm();

 // submit 이후 동작할 코드
    // 백으로 유저 정보 전달
    const onValid = async ({ username, password }) => {
      
      // 백으로부터 받은 응답
      const response = await loginUser({ username, password });
      
      if (response.status) {
          // 쿠키에 Refresh Token, store에 Access Token 저장
          setRefreshToken(response.json.refresh_token);
          dispatch(SET_TOKEN(response.json.access_token));
          return navigate("/main");
          
      } else {
      }
       // input 태그 값 비워주는 코드
       setValue("password", "");
  };
 


  return(
    <div>
      
    <h1>로그인</h1>
    <form onSubmit={handleSubmit(onValid)} className={style.formStyle}>
        <div className={style.username}>
          <label htmlFor="username"></label>
          <input {...register("username", {required: "Please Enter Your ID"})} id="username" type="text" placeholder="User ID" />
        </div>
        <div className={style.password}>
          <label htmlFor="password"></label>
          <input {...register("password", {required: "Please Enter Your Password"})} id="password" type="password" placeholder="Password"/>
        </div>
        <div className={style.submitButton}>
          <button type="submit">로그인</button>
          <Link className={style.linkButton} to="/join">회원가입</Link>
        </div>
    </form>
  </div>
  );
}
export default Login;