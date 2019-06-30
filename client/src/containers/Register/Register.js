import React, {useState, useEffect} from 'react';
import { Form, Icon, Input, Button, Card, Row, Col, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../store/actions/authTypes';
import Container from '@material-ui/core/Container';
import { LandingNavbar } from '../../components/Navbar/Navbar';


const RegisterForm = ({form, history}) => {
  const dispatch = useDispatch()
    const { getFieldDecorator } = form;
    const [state, setState] = useState({
      confirmDirty: false
    });

    const signupLoading = useSelector(state => state.registerData.loading);
    const signupErrorData = useSelector(state => state.registerData.error.email);
    const signupUserData= useSelector(state => state.registerData.data.name);
    const errMsg= useSelector(state => state.registerData.errMsg);
    const successMsg= useSelector(state => state.registerData.successMsg);

    useEffect(()=>{
      if(errMsg){
        errormsg()
        dispatch({ type: 'MSG_STATE_ERROR' })
      } else if(successMsg){
        successmsg()
        dispatch({ type: 'MSG_STATE_SUCCESS' })
        form.resetFields()
        history.push('/')
      }
    },[signupLoading === true])

    const compareToFirstPassword = (rule, value, callback, props) => {
      if (value && value !== form.getFieldValue('password')) {
        callback('Two passwords that you enter is inconsistent!');
      } else {
        callback();
      }
    };
  
    const validateToNextPassword = (rule, value, callback, props) => {
      if (value && state.confirmDirty) {
        form.validateFields(['confirm'], { force: true });
      }
      callback();
    };

    const handleConfirmBlur = e => {
      const { value } = e.target;
      setState({ ...state, confirmDirty: state.confirmDirty || !!value });
    };

    const errormsg = () => {
      if(signupErrorData.length)
      message.error(`${signupErrorData}`);
    };

    const successmsg = () => {

      let showMsg = () => {
        return new Promise(resolve => {
          resolve(message.success(`Welcome ${signupUserData}, Please login to continue`,8))
        })
      }

      let enableLoading = () => {
        return new Promise(resolve => {
          resolve(dispatch({type:'COMP_LOADING_PENDING'}))
        })
      }

      let desableLoading = () => {
        return new Promise(resolve => {
          resolve(dispatch({type:'COMP_LOADING_FULFILLED'}))
        })
      }

      showMsg().then(()=>{
        return enableLoading()
      }).then(()=>{
        return desableLoading()
      })
    };

    const handleSubmit = e => {
      e.preventDefault();
      form.validateFields((err, values) => {
        if (!err) {
          dispatch(registerUser(values))       
        }
      });
    };

    return (
      <React.Fragment>
        <LandingNavbar />
        <Container>
          <Row type="flex" justify="center">
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Card>
                <h2 style={{textAlign:"center", fontWeight:"bold"}}>Welcome to 3D world</h2>
                <p>Please Register to continue</p>
                <Form onSubmit={handleSubmit} className="login-form">
                    <Form.Item label="Name" hasFeedback>
                      {getFieldDecorator('name', {
                        rules: [
                          {required: true, message: 'Please input your name!' },
                        ],
                      })(
                        <Input
                          prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                          placeholder="Name"
                        />,
                      )}
                    </Form.Item>
                    <Form.Item label="Email" hasFeedback>
                      {getFieldDecorator('email', {
                        rules: [
                          {required: true, message: 'Please input your email!' },
                          {type: 'email', message: 'The input is not valid E-mail!'}
                        ],
                      })(
                        <Input
                          prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                          placeholder="Email"
                        />,
                      )}
                    </Form.Item>
                    <Form.Item label="Password" hasFeedback>
                      {getFieldDecorator('password', {
                        rules: [
                          {
                            required: true,
                            message: 'Please input your password!',
                          },
                          {
                            validator: validateToNextPassword,
                          },
                          {
                            min:6,
                            message: 'Password must be of 6 letters',
                          },
                        ],
                      })(<Input.Password
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Password" 
                      />)}
                    </Form.Item>
                    <Form.Item label="Confirm Password" hasFeedback>
                      {getFieldDecorator('password2', {
                        rules: [
                          {
                            required: true,
                            message: 'Please confirm your password!',
                          },
                          {
                            validator: compareToFirstPassword,
                          },
                          {
                            min:6,
                            message: 'Password must be of 6 letters',
                          },
                        ],
                      })(<Input.Password onBlur={handleConfirmBlur} 
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Confirm password"/>)}
                    </Form.Item>
                    <Button type="primary" block loading={signupLoading} htmlType="submit" className="login-form-button">
                        Register
                    </Button>
                </Form>
              </Card>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    )
}

export const Register = Form.create({name: 'registration'})(RegisterForm);