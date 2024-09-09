// createSlice를 이용하여 간단하게 redux 액션 생성자와 전체 슬라이스에 대한 reducer를 선언하여 사용할 수 있다.
import { createSlice } from '@reduxjs/toolkit';

export const TOKEN_TIME_OUT = 600 * 10000;

// 로컬 스토리지에서 토큰 정보 가져오기
const initialAccessToken = localStorage.getItem('accessToken');

export const tokenSlice = createSlice({
  name: 'authToken',
  initialState: {
    authenticated: !!initialAccessToken, // 토큰 존재 여부에 따라 초기값 설정
    accessToken: initialAccessToken,
    expireTime: null
  },
  reducers: {
    SET_TOKEN: (state, action) => {
      state.authenticated = true;
      state.accessToken = action.payload;
      state.expireTime = new Date().getTime() + TOKEN_TIME_OUT;

      // 토큰 정보 로컬 스토리지에 저장
      localStorage.setItem('accessToken', action.payload);
    },
    DELETE_TOKEN: (state) => {
      state.authenticated = false;
      state.accessToken = null;
      state.expireTime = null;

      // 토큰 정보 로컬 스토리지에서 제거
      localStorage.removeItem('accessToken');
    },
  }
});


export const { SET_TOKEN, DELETE_TOKEN } = tokenSlice.actions;

export default tokenSlice.reducer;