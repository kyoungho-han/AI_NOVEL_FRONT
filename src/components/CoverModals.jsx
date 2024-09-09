import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Spinner } from 'react-bootstrap';
import { Configuration, OpenAIApi } from 'openai';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import "../style/Modals.css";

const CoverModals = ({ show, onClose, onCloseWithImg }) => {
  const [prompt, setPrompt] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const accessToken = useSelector((state) => state.authToken);
  const configuration = new Configuration({
    apiKey: "sk-o8z5Ao2cXHpHlYj0KQeDQyfjxQ4CNVKeaen2VF2rFGT3BlbkFJiYcBx5apHIxcIpw77d5xMQhuZTx9q_vCYKRUE28iMA",
  });
  const openai = new OpenAIApi(configuration);
  const navigate = useNavigate();

  const translateAndGenerateImages = async () => {
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

  return (
      <Modal show={show} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>책 표지 그림 선택하기</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>책 표지로 쓰고 싶은 문장을 입력해주세요.</Form.Label>
              <Form.Control
                  type="text"
                  onChange={(e) => setPrompt(e.target.value)}
                  autoFocus
              />
            </Form.Group>
            <Form.Group>
              <Button variant="primary" onClick={translateAndGenerateImages} disabled={isLoading}>
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
                    <div className='notion'>↑↑↑ 위의 그림 중에 하나를 클릭해주세요</div>
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
