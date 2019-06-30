import React, {useEffect, useState} from 'react';
import { LandingNavbar } from '../../components/Navbar/Navbar';
import Container from '@material-ui/core/Container';
import { useDispatch, useSelector } from 'react-redux';
import {fetchOneBlog} from '../../store/actions/authTypes';
import {editBlog} from '../../store/actions/authTypes';
import { Spin, Icon, Button, Modal, Input, Row, Col, Form } from 'antd';
import Fab from '@material-ui/core/Fab';
import Zoom from 'react-reveal/Zoom';
import {CardDetail} from '../../components/Homepage/Card';

import { makeStyles } from '@material-ui/core/styles';
import Moment from 'react-moment';

const { TextArea } = Input;
const useStyles = makeStyles(theme => ({
    fab: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
}));

const BlogContainer  = ({match, form}) => {
    const dispatch = useDispatch()
    const { getFieldDecorator } = form;
    const classes = useStyles();
    Moment.globalFormat = 'D MMM YYYY';
    const antIcon = <Icon type="loading" style={{ fontSize: 50 }} spin />
    const isAuthenticated = useSelector(state => state.authData.isAuthenticated);

    useEffect(()=>{
        const blogId = match.params.id;
        dispatch(fetchOneBlog(blogId))
    },[isAuthenticated])

    const data = useSelector(state => state.oneBlogData.data);
    const dateOrignal = useSelector(state => state.oneBlogData.data.date);
    const date = (
        <Moment>{dateOrignal}</Moment>
    )
    const loading = useSelector(state => state.oneBlogData.loading);

    const [ modal, setModal ] = useState(false);

    const handleEditBlog = e => {
        e.preventDefault();
        form.validateFields(['title', 'imageUrl', 'blogContent'],(err, values) => {
          if (!err) {
            dispatch(editBlog(values, match.params.id))
            setModal(false);
          }
        });
    };

    return(
        <div>
            <LandingNavbar />
            <Container style={{paddingBottom:'60px'}}>
                <Spin style={{position:'fixed',top:'20%'}} indicator={antIcon} spinning={loading}>
                    <Zoom>
                    <CardDetail imageUrl={data.imageUrl} title={data.title} blogContent={data.blogContent} date={date}>
                        {isAuthenticated ? (
                            <Fab onClick={()=>setModal(true)} color="secondary" aria-label="Edit" className={classes.fab}>
                                <Icon style={{fontSize:'20px'}} type="edit" />
                            </Fab>
                        ):(
                            <p style={{display:'inline', color:'red', fontSize:'10px'}}>LOGIN TO EDIT</p>
                        )}
                        
                    </CardDetail>
                    </Zoom>
                </Spin>
                {/* Adding Blog */}
                <Modal title="Add New Blog" visible={modal} onCancel={()=>{setModal(false)}} footer={null}>
                    <Form onSubmit={handleEditBlog} className="login-form">
                    <Row>
                        <Col span={24}>
                        <Form.Item label='Title'>
                            {getFieldDecorator('title', {
                                initialValue: data.title,
                                rules: [
                                    { required: true, message: 'Please enter a Title' },
                                ],
                            })(
                                <Input/>
                            )}
                        </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                        <Form.Item label='Image url'>
                            {getFieldDecorator('imageUrl', {
                                initialValue: data.imageUrl,
                                rules: [
                                    { required: true, message: 'Please enter image url' },
                                ],
                            })(
                                <Input/>
                            )}
                        </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                        <Form.Item label='Blog Content'>
                            {getFieldDecorator('blogContent', {
                                initialValue: data.blogContent,
                                rules: [
                                    { required: true, message: 'Please enter blog' },
                                ],
                            })(
                                <TextArea rows={4} />
                            )}
                        </Form.Item>
                        </Col>
                    </Row>
                    <Button type="primary" block htmlType="submit" className="login-form-button">
                        Submit
                    </Button>
                    </Form>
                </Modal>
            </Container> 
        </div>
    );
}

export const Blog = Form.create({name: 'editform'})(BlogContainer);

// {this.props.form.resetFields()}