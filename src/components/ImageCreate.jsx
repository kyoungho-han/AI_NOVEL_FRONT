import {useState, React}from "react";


const API_KEK = ""

function ImageCreate(){

  const [imageTitle , setImageTitle ] = useState("");
  const [images, setImages] = useState("");

  const inputChange = (e) =>{
    setImageTitle(e.target.value)
  }

  const iamgecr = async() =>{
    const option = {
      method: "POST",
      headers : {
        "Authorization": `Bearer ${API_KEK}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        prompt: imageTitle,
        n: 1,
        size: "1024x1024",
      })
  }
  setImageTitle("")
  const respons = await fetch("https://api.openai.com/v1/images/generations", option)
  .then(response => response.json())
  .then(data => {
    // 비동기 작업의 결과(data)를 처리
    data.data.map( (iamgeObject) => {
      setImages(iamgeObject.url);
      // const iamgeContainer = document.createElement("div");
      // iamgeContainer.classList.add("iamge-container");
      // const iamgeElemnt = document.createElement("img");
      // iamgeElemnt.setAttribute("src", iamgeObject.url);
      // iamgeContainer.appendChild(iamgeElemnt);
      // imagesection.appendChild(iamgeContainer);
    })

  })
  .catch(error => {
    // 비동기 작업이 실패했을 때 에러 처리
    console.error(error);
  });
  

  
  }

  return(
    <div>
      <header>
        <h1>원하시는 키워드를 입력하시오</h1>
      </header>
      <div className="image-section"> 
        <img src={images} alt="" />
      </div>
      <div className="image-input">
        <input type="text" onChange={inputChange}/>
        <button onClick={iamgecr}>전송</button>
      </div>
    </div>
  );
}
export default ImageCreate;