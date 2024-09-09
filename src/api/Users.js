// promise 요청 타임아웃 시간 선언
const TIME_OUT = 300*1000;

// 에러 처리를 위한 status 선언
const statusError = {
    status: false,
    json: {
        error: ["연결이 원활하지 않습니다. 잠시 후 다시 시도해 주세요"]
    }
};

// 백으로 요청할 promis
const requestPromise = (url, option) => { 
    return fetch(url, option);
};

// promise 타임아웃 처리
const timeoutPromise = () => {
    return new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), TIME_OUT));
};

// promise 요청
const getPromise = async (url, option) => { //실질적으로 백으로 로그인 요청을 보내는 함수
    return await Promise.race([
    requestPromise(url, option), 
    timeoutPromise()
  ]);
};
// 백으로 로그인 요청
export const loginUser = async (credentials) => { 
  // 백으로 유저 정보와 함께 로그인 요청을 보낸다. 
  // 받은 응답 코드에 따라 에러 또는 응답 받은 json 정보를 리턴한다.
    let strURL = 'http://localhost:3000/authors/login'
    let form = new FormData();
    form.append("username", credentials.username);
    form.append("password", credentials.password);
    let url_form_data = new URLSearchParams(form);

  const option = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
      body: url_form_data
  };

  const data = await getPromise(strURL, option)
  .then((response) => {
    return response
  })
  .catch(() => { //보내줄 주소와 보낼 옵션 정의 
      return statusError;
  });


  if (parseInt(Number(data.status)/100)===2) {
      const status = data.ok;
      const code = data.status;
      const text = await data.text();
      const json = text.length ? JSON.parse(text) : "";

      return {
          status,
          code,
          json
      };
  } else {
      return statusError;
  }
};

//로그아웃 기능
// export const logoutUser = async (credentials, accessToken) => {
//     const option = {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',

//         },
//         body: JSON.stringify(credentials)
//     };

//     const data = await getPromise('/logout-url', option).catch(() => {
//         return statusError;
//     });

//     if (parseInt(Number(data.status)/100)===2) {
//         const status = data.ok;
//         const code = data.status;
//         const text = await data.text();
//         const json = text.length ? JSON.parse(text) : "";

//         return {
//             status,
//             code,
//             json
//         };
//     } else {
//         return statusError;
//     }
// };

//토큰 다시 받아오기
export const requestToken = async (refreshToken) => {
    let strURL = 'http://localhost:3000/authors/token/refresh'
    const option = {
        method: 'GET',
        headers: {
            'Authorization': "Bearer " + refreshToken.refresh_token
        },
    }

    const response = await getPromise(strURL, option)
    const data = await response.json();

  // 처리 완료 후 데이터 반환
    return data
    

    if (parseInt(Number(data.status)/100)===2) {
        const status = data.ok;
        const code = data.status;
        const text = await data.text();
        const json = text.length ? JSON.parse(text) : "";

        return {
            status,
            code,
            json
        };
    } else {
        return statusError;
    }
};