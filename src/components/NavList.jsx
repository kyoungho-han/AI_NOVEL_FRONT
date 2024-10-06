import React from "react";
import Logo from "../images/logo.jpeg"
import { Link } from "react-router-dom";

function NavList(props) {

  const {token} = props;

  if(token){
    return(
      <nav>
          <img style={{width: 100}} src={Logo} alt=""></img>
          <div className="menu">
            <p>로그아웃</p>
          </div>
      </nav>
    )
  }
  else{
    return(
      <nav>
          <img style={{width: 100}} src={Logo} alt=""></img>
          <div className="menu">
            <Link className="menu-link" to='/login'>로그인</Link>
            <Link className="menu-link" to='/join'>회원가입</Link>
          </div>
      </nav>
    )
  }
    
  
}
export default NavList;