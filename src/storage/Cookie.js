//Refresh Token 저장소
import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const setRefreshToken = (refreshToken) => { //Refresh Token을 Cookie에 저장하기 위한 함수
    const today = new Date();
    const expireDate = today.setDate(today.getDate() + 7);

    return cookies.set('refresh_token', refreshToken, { 
        sameSite: 'strict', 
        path: "/", 
        expires: new Date(expireDate)
    });
};


export const getCookieToken = () => { // Cookie에 저장된 Refresh Token 값을 갖고 오기 위한 함수.
    return cookies.get('refresh_token');
};

export const removeCookieToken = () => { //  Cookie 삭제를 위한 함수.
    return cookies.remove('refresh_token', { sameSite: 'strict', path: "/" })
}