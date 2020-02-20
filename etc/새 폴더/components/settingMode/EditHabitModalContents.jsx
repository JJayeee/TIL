import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import Button from './Button';
import { Modal, Row, Col, ButtonToolbar, Form } from 'react-bootstrap';

import '../../lib/styles/style.css';

const StyledInput = styled.input`
  font-size: 1rem;
  border: none;
  border-bottom: 1px solid ${palette.gray[5]};
  padding-bottom: 0.5rem;
  outline: none;
  width: 100%;
  &:focus {
    color: $oc-teal-7;
    border-bottom: 1px solid ${palette.gray[7]};
  }
  & + & {
    margin-top: 1rem;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  font-size: 0.875rem;
  margin-top: 1rem;
`;

const ModalTest = ({form, onChange, onSubmit, error, icon, habitName}) => {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <ButtonToolbar>
      <Button
        className="px-2 ml-2"
        style={{backgroundColor:'grey', borderRadius:15, fontSize:10}}
        onClick={() => setModalShow(true)}>수정</Button>
        {/* {modalShow ?  */}
          <Modal
            show={modalShow}
            onHide={() => setModalShow(false)}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                습관 수정하기
              </Modal.Title>
            </Modal.Header>
            <Form onSubmit={onSubmit}>
              <Modal.Body>
                <Row>
                  <Col>
                    <Form.Group>
                      <Form.Label>습관명</Form.Label>
                      <StyledInput
                        autoComplete="habitName"
                        name="habitName"
                        placeholder={habitName}
                        onChange={onChange}
                        value={form.habitName}
                        required/>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>아이콘</Form.Label>
                      <Form.Control
                        name="habitIconId"
                        selected=" "
                        as="select"
                        onChange={onChange}
                        value={form.habitIconId}
                        placeholder={icon}
                        required>
                        <option></option>
                        <option value='1'>Icon 1</option>
                        <option value='2'>Icon 2</option>
                        <option value='3'>Icon 3</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
                {error && <ErrorMessage>{error}</ErrorMessage>}
              </Modal.Body>
              <Modal.Footer>
                  <Button onClick={function() {setModalShow(false);}}>저장하기</Button>
              </Modal.Footer>
            </Form>
          </Modal>
          {/* </Modal> : ''} */}
    </ButtonToolbar>
  );
}

export default ModalTest;