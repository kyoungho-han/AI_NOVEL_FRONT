import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Spinner } from 'react-bootstrap';
import { Configuration, OpenAIApi } from 'openai';
import "../style/Modals.css";

const CoverModals = ({ show, onClose, onCloseWithImg }) => {
  const [prompt, setPrompt] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_DALL_E_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const handleCreateImages = async () => {
    try {
      setIsLoading(true);
      const imageResponse = await openai.createImage({
        prompt: prompt,
        n: 1,
        size: "1024x1024",
        model: "dall-e-3",
      });
      const generatedImages = imageResponse.data.data.map(item => item.url);
      setResults(generatedImages);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
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
      <Modal show={show} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>책 표지 그림 선택하기</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>책 표지로 쓰고 싶은 문장을 입력해주세요.</Form.Label>
              <Form.Control
                  type="text"
                  onChange={(e) => setPrompt(e.target.value)}
                  value={prompt}
                  autoFocus
              />
            </Form.Group>
            <Form.Group>
              <Button variant="primary" onClick={handleCreateImages} disabled={isLoading}>
                {isLoading ? '생성 중...' : '완료'}
              </Button>
            </Form.Group>
            <Form.Group className="mb-3">
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
                            style={{ cursor: 'pointer', margin: '10px', maxWidth: '100px' }}
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
          <Button variant="secondary" onClick={handleModalClose}>
            닫기
          </Button>
        </Modal.Footer>
      </Modal>
  );
};

export default CoverModals;
