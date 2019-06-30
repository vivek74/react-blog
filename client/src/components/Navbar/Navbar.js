import React, {useState,useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MaterialButton from '@material-ui/core/Button';
import {addBlogs,loginUser, logoutUser} from '../../store/actions/authTypes';
import { Form, Icon, Input, Drawer, Button,Modal,Row,Col,Spin } from 'antd';
import { withRouter } from 'react-router';
const { TextArea } = Input;

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
}));

const LandingNavbarWithForm = ({form})=> {

  const { getFieldDecorator } = form;
  const antIcon = <Icon type="loading" style={{ fontSize: 40 }} spin />;
  const classes = useStyles();
  const dispatch = useDispatch()

  const [state, setState] = useState({
    visible: false
  });
  
  const [loginPageLoading, setLoginPageLoading] = useState(false);

  const [ modal, setModal ] = useState(false);
  const [ errorData, setErrorData ] = useState({
    errors: {}
  })
  const addLoading = useSelector(state => state.allBlogs.addLoading);
  const loginLoading = useSelector(state => state.authData.loading);
  const isAuthenticated = useSelector(state => state.authData.isAuthenticated);
  const error = useSelector(state => state.error);

  useEffect(()=>{
    if(isAuthenticated){
      setState({
        ...state,
        visible: false,
      });
      setErrorData({
        ...errorData,
        errors: {}
      })
      setLoginPageLoading(false);
      form.resetFields()
    }
    if(error){
      setErrorData({
        ...errorData,
        errors: error
      })
      form.resetFields()
    }
  },[isAuthenticated, error])

  const showDrawer = () => {
    setState({
      ...state,
      visible: true,
    });
  };

  const onClose = () => {
    setState({
      ...state,
      visible: false,
    });
  };
  
  const handleSubmit = e => {
    e.preventDefault();
    form.validateFields(['email', 'password'],(err, values) => {
      if (!err) {
        let startlo = () => {
          return new Promise(resolve => {
            resolve(dispatch({type:'START_LOADING'}))
          })
        }
        let startloding = () => {
          return new Promise(resolve => {
            resolve(dispatch(loginUser(values)))
          })
        }
        let stoplo = () => {
          return new Promise(resolve => {
            resolve(dispatch({type:'STOP_LOADING'}))
          })
        }

        startlo().then(()=>{
          return startloding()
        }).then(()=>{
          return stoplo()
        })

      }
    });
  };

  const handleAddBlog = e => {
    e.preventDefault();
    form.validateFields(['title', 'imageUrl', 'blogContent'],(err, values) => {
      if (!err) {
        dispatch(addBlogs(values))
        form.resetFields()
        setModal(false);
      }
    });
  };

  const handelLogout = () => {
    dispatch({type:'START_LOADING'})
    dispatch(logoutUser());
    dispatch({type:'STOP_LOADING'})
  }

  const navItems =(
    <div>
      {isAuthenticated ? (
      <div>
        <MaterialButton onClick={()=>{setModal(true)}} color="inherit">ADD BLOG</MaterialButton>
        <MaterialButton onClick={()=>handelLogout()} color="inherit">LOGOUT</MaterialButton> 
      </div>
      ):(
        <MaterialButton onClick={showDrawer} color="inherit">LOGIN</MaterialButton>
      )}
    </div>
  )

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" style={{color:'white'}} className={classes.title}>
            <NavLink style={{color:'white'}} to='/'>TECH BLOG</NavLink>
          </Typography>
          {navItems}
        </Toolbar>
      </AppBar>
      {/* Adding Blog */}
      <Modal title="Add New Blog" visible={modal} onCancel={()=>{setModal(false)}} footer={null}>
      
        <Form onSubmit={handleAddBlog} className="login-form">
          <Row>
            <Col span={24}>
              <Form.Item label='Title'>
                  {getFieldDecorator('title', {
                      rules: [
                          { required: true, message: 'Please enter a Title' },
                      ],
                  })(
                      <Input placeholder="Title" />
                  )}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item label='Image url'>
                  {getFieldDecorator('imageUrl', {
                      rules: [
                          { required: true, message: 'Please enter image url' },
                      ],
                  })(
                      <Input placeholder="Image Url" />
                  )}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item label='Blog Content'>
                  {getFieldDecorator('blogContent', {
                      rules: [
                          { required: true, message: 'Please enter blog' },
                      ],
                  })(
                      <TextArea rows={4} placeholder="Blog content" />
                  )}
              </Form.Item>
            </Col>
          </Row>
          <Button type="primary" loading={addLoading} block htmlType="submit" className="login-form-button">
              Submit
          </Button>
        </Form>
      </Modal>
      {/* login drawer */}
      <Drawer style={{zIndex: '1200'}} title="LOGIN" width={'35%'} onClose={onClose} visible={state.visible} closable>
      <Spin spinning={loginPageLoading} indicator={antIcon} >
        <p style={{textAlign:'center', textTransform:'uppercase',color:'red'}}>{errorData.errors.passwordincorrect}</p>
        <p style={{textAlign:'center', textTransform:'uppercase',color:'red'}}>{errorData.errors.emailnotfound}</p>
        <Form onSubmit={handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator('email', {
              rules: [
                { required: true, message: 'Please input your email!' },
                {type: 'email', message: 'The input is not valid E-mail!'}
              ],
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Email"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Password"
              />,
            )}
          </Form.Item>
          <Button type="primary" onClick={()=>{setLoginPageLoading(true)}} loading={loginLoading} block htmlType="submit" className="login-form-button">
              Log in
          </Button>
          <div style={{padding:'2px'}}>
            Or <NavLink to='/register'>register now!</NavLink> 
          </div>
        </Form>
        </Spin>
      </Drawer>
    </div>
  );
}

export const LandingNavbar = withRouter(Form.create({name: 'login'})(LandingNavbarWithForm));