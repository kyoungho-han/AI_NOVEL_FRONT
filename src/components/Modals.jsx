import React, {useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "../style/Modals.css";
import { Configuration, OpenAIApi } from "openai";
import {Spinner} from "react-bootstrap";

const Modals = ({ show, onClose, onCloseWithImg }) => {

  const [prompt, setPrompt] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가
  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_DALL_E_API_KEY,
  });

  const openai = new OpenAIApi(configuration);

  const handleCreateImages = async () => {
    try {
      setIsLoading(true); // 로딩 시작

      const imageResponse = await openai.createImage({
        prompt: prompt,
        n: 1,
        size: "1024x1024",
        model: "dall-e-3",
        quality: "standard",
      });
      const generatedImages = imageResponse.data.data.map(item => item.url);

      setResults(generatedImages);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false); // 로딩 종료
    }
  };

  const handleImageClick = (image) => {
    onCloseWithImg(image);
  };

  const handleModalClose = () => {
    onClose();
  };

  // 엔터 입력 시 새로고침 방지하고 완료 버튼 동작 수행
  const handleFormSubmit = (e) => {
    e.preventDefault(); // 기본 폼 제출 방지
    handleCreateImages(); // 완료 버튼 동작 실행
  };

  return (
      <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>그림 선택하기</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>문장을 입력해주세요.</Form.Label>
              <Form.Control
                  type="text"
                  onChange={(e) => setPrompt(e.target.value)}
                  autoFocus
              />
            </Form.Group>
            <Form.Group>
              <Button variant="primary" onClick={handleCreateImages} disabled={isLoading}>
                {isLoading ? '생성 중...' : '완료'}
              </Button>
            </Form.Group>
            <Form.Group
                className="mb-3"
            >
              {isLoading ? (
                  <div className="d-flex justify-content-center">
                    <Spinner animation="border" />
                  </div>
              ) : results.length > 0 ? (
                  <div>
                    {results.map((result, index) => (
                        <img
                            key={index}
                            className='resultImg'
                            src={result}
                            alt={`결과 ${index}`}
                            onClick={() => handleImageClick(result)}
                        />
                    ))}
                    <br /><br />
                    <div className='notion'>↑↑↑ 위의 그림을 클릭해주세요</div>
                  </div>
              ) : (
                  <></>
              )}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleModalClose()}>
            닫기
          </Button>
        </Modal.Footer>
      </Modal>
  );
};

export default Modals;