import React, {
  useState,
  useRef,
} from 'react';
import axios from 'axios';
import { Button, Col, Form, Input, message, Row } from 'antd';
import './Login.css'
import { useNavigate } from 'react-router-dom';

const Prepare = () => {
  return (
    <div id="load">
      <div>G</div>
      <div>N</div>
      <div>I</div>
      <div>D</div>
      <div>A</div>
      <div>O</div>
      <div>L</div>
    </div>
  )

}

const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 18,
  },
};
function showMessage(type, content) {
  switch (type) {
    case 'success':
      message.success(content);
      break;
    case 'error':
      message.error(content);
      break;
    case 'warning':
      message.warning(content);
      break;
    case 'info':
      message.info(content);
      break;
    default:
      break;
  }


}
const loginn = async () => {
  return
}
const LoginForm = (props) => {

  const [preparing, setPreparing] = useState(false);
  // const API_URL = "${Config.Host}";

  let navigate = useNavigate();



  const mailInput = useRef();
  const passInput = useRef();
  const focusMailInput = () => mailInput.current.focus();
  const focusPassInput = () => passInput.current.focus();

  async function loginHandler(formValues) {
    loginn().then(() => {
      localStorage.setItem('token', "ABCDEF");
      localStorage.setItem('user', formValues.username);
      navigate('/');
    }).catch(errLogin => {
      console.log('errLogin :>> ', errLogin);
      showMessage('error', errLogin.response.data.message);
      showMessage('error', 'Đăng nhập thất bại, vui lòng kiểm tra lại thông tin đăng nhập');
    })



  }
  const onFinishFailed = (data) => {
    showMessage('error', 'Vui lòng nhập đầy đủ thông tin đăng nhập');
  }

  const submitHandler = (data) => {
    console.log('formValues :>> ', data);
    loginHandler(data)
  }

  const preparation = async () => {
    setPreparing(true);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setPreparing(false);


  };


  return (
    preparing ?
      <Prepare />
      :
      <Row style={{ maxWidth: '100vw' }}>
        <Col span={16}  >
          <Row>
            <p> *** use github username to see your public Repositories </p>
          </Row>
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            initialValues={{
              remember: true,
            }}
            className="form-login"
            onFinish={submitHandler}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >

            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >

              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
        {/* <CustomSnackbar data={snackBar} handleClose={handleClose} handleCloseSnackbar={handleClose} /> */}

      </Row>



  )
};

export default LoginForm;
