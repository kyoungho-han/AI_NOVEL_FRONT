import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router';
import style from "../style/UserJoin.module.css"
import NavBarElements from "../components/NavBarElements";
import {useSelector} from "react-redux";

function UserJoin() {

  const navigate = useNavigate();

  //회원 가입정보
  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userName, setUserName] = useState("");

  //유효성 검사 t/f 여부
  const [isuserId, setIsUserId] = useState(false);
  const [isuserPw, setIsUserPw] = useState(false);
  const [isuserPhone, setIsUserPhone] = useState(false);
  const [isuserName, setIsUserName] = useState(false);

  //유효성 검사 후 보여질 메세지
  const [idMessage, setIdMessage] = useState("");
  const [pwMessage, setPwMessage] = useState("");
  const [phoneMessage, setPhoneMessage] = useState("");
  const [nameMessage, setNameMessage] = useState("");

  // 가입버튼 활성화 여부
  const [buttonUsed, setButtonUsed] = useState(false);

  // 아이디 중복 여부 메세지
  const [checkId, setChekId] = useState("");

  const accessToken = useSelector((state) => state.authToken);

  const [userJson, setUserJson] = useState({
    id: null,
    password: null,
    userName: null,
    tel: null,
  })

  // 유저정보를 전부 옳바르게 입력했는지 확인 후 가입버튼 활성화
  useEffect(() => {
    if(isuserId && isuserPw && isuserName){
      setButtonUsed(false)
    }
    else{
      setButtonUsed(true)
    }
  },[isuserId, isuserPw   , isuserName])

  
  // 유저정보 입력 후 유효성 검사 및 유저정보 저장
  const onChangeId = (e) =>{
    setChekId("")
    const id = e.target.value;
    const effectivenessId = /^[a-z0-9_-]{5,20}$/;

    if(!effectivenessId.test(id)){
      setIdMessage("5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.")
      setIsUserId(false)
    }else{
      setUserId(id);
      setIdMessage("")
      setIsUserId(true)
    }


  };

  const onChangePw = (e) =>{
    
    const pw = e.target.value;
    const effectivenessPW =  /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;

    if(!effectivenessPW.test(pw)){
      setPwMessage("숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!");
      setIsUserPw(false)
    }
    else{
      setUserPw(pw);
      setPwMessage("적합한 비밀번호 입니다.");
      setIsUserPw(true)
    }
  };

  const onChangeName = (e) =>{
    const name = e.target.value;
     const effectivenessName =  /^[가-힣]*$/;

     if((name.length < 2 || name.length > 5) || (!effectivenessName.test(name))){
      setNameMessage("한글로 입력해주세요 (2 ~ 5 글자)")
      setIsUserName(false);
     }
     else{
      setUserName(name);
      setNameMessage("")
      setIsUserName(true);
     }
  };

  // const onChangePhone = (e) =>{
  //   const phone = e.target.value;
  //   const effectivenessPhone = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;

  //   if(!effectivenessPhone.test(phone)){
  //     setPhoneMessage("010-xxxx-xxxx 형식으로 입력해 주세요");
  //     setIsUserPhone(false);
  //   }
  //   else{
  //     setUserPhone(phone);
  //     setPhoneMessage("올바른 형식입니다.");
  //     setIsUserPhone(true);
  //   }
  // };
  

  //서버로 값 보내는 메서드
  const dataPush = () =>{
    axios.post("http://localhost:8080/authors/join", {
      username: userId,
      password: userPw,
      name: userName,
  },
  {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  )
  .then(function (response) {
       return navigate("/main");
      
       
  }).catch(function (error) {
      // 오류발생시 실행
      setChekId("중복된 아이디입니다.")
  }).then(function() {
      // 항상 실행
  });
  }


  return(
    <div className="body">
      <h1>회원가입</h1>
      <form className={style.formStyle}>
        <div className={style.inputArea}>
          <input type="text" id="id" placeholder="User ID" onChange={onChangeId}/>
          <p>{idMessage}</p>
          <p className={style.errorMessage}>{checkId}</p>
        </div>
        <div className={style.inputArea}>
          <input type="password" id="passwd" placeholder="Password"  onChange={onChangePw}/>
          <p>{pwMessage}</p>
        </div>
        <div className={style.inputArea}> 
          <input type="text" id="name" placeholder="Name" maxLength="5" onChange={onChangeName}/>
          <p>{nameMessage}</p>
        </div>
         {/* <div className={style.inputArea}>
          <input type="tel" id="tel" placeholder="휴대폰 번호" maxLength="16"  onChange={onChangePhone}/>
          <p>{phoneMessage}</p>
        </div>  */}
       <div className={style.submitButton}>
          <button type="button" disabled={buttonUsed} onClick={dataPush}>가입하기</button>
          
       </div>
      </form>
    </div>
  );
}
export default UserJoin;