import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { removeCookieToken } from '../storage/Cookie';
import { DELETE_TOKEN } from '../store/Auth';

const style = {
    marginLeft: "10px",
    backgroundColor: "white",
    border: "none"
}

function Logout(){
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