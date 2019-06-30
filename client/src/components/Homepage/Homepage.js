import React, {useEffect} from 'react';
import {fetchBlogs, deleteBlog} from '../../store/actions/authTypes';
import { useDispatch, useSelector } from 'react-redux';
import WordLimit from 'react-word-limit';
import { NavLink } from 'react-router-dom';
import { Spin, Icon,Row,Col} from 'antd';
import Moment from 'react-moment';
import {CardPost} from './CardPost';
import Zoom from 'react-reveal/Zoom';
import styles from './Homepage.module.scss';

export const Homepage = () => {
    const dispatch = useDispatch()
    Moment.globalFormat = 'D MMM YYYY';
    const antIcon = <Icon type="loading" style={{ fontSize: 50 }} spin />

    const allBlogsPost = useSelector(state => state.allBlogs.data);
    const loadingBlog = useSelector(state => state.allBlogs.loading);
    const isAuthenticated = useSelector(state => state.authData.isAuthenticated);

    useEffect(()=>{
        dispatch(fetchBlogs())
    },[isAuthenticated])

    const deteteBlogPost = (data) => {
        dispatch(deleteBlog(data))
    }

    const allBlogs = (
        allBlogsPost.map(data =>(

            <Col style={{marginBottom:'30px'}} key={data._id} xs={24} sm={12} md={12} lg={8} xl={8}>
                <Zoom>
                <CardPost imageUrl={data.imageUrl} title={data.title} date={<Moment>{data.date}</Moment>} blogContent={<WordLimit limit={200}>{data.blogContent}</WordLimit>}>
                    {isAuthenticated ? (
                        <Icon className={styles.deleteBtn} type="delete" onClick={()=>deteteBlogPost(data._id)} />
                    ):(
                        <p style={{display:'inline', color:'red', fontSize:'10px'}}>LOGIN TO DELETE</p>
                    )}
                    <NavLink to={data._id}><p className={styles.nextBtn}>Show more <Icon type="double-right" /></p></NavLink>
                </CardPost>
                </Zoom>
            </Col>
        ))
    );

    return(
        <div>
            <Spin style={{position:'fixed',top:'20%'}} indicator={antIcon} spinning={loadingBlog}>
                <Row type="flex" justify="space-between">
                    {allBlogs}
                </Row>
            </Spin>
        </div>
    );
}
