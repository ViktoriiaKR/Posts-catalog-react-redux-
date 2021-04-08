import React, { useEffect, useState } from 'react';
import style from './style.scss';
import Post from './../../components/data-post/index';
import Searchbar from './../../components/search-bar/index';
import { Pagination } from 'antd';
import 'antd/dist/antd.css';
import { connect } from 'react-redux';
import { store } from './../../../index';
import ModalPost from './../../components/modal-post/index';
import CreatePost from '../../components/create-post/index'

const mapStateToProps = state => {
    return {
        state
    };
};

const PostsPage = (props) => {
    let posts = props.state.postsReducer.filteredPosts;
    const pageSize = 5;

    const [ isOpenModal, setIsOpenModal ] = useState(false);
    const [ isOpenCreating, setIsOpenCreating ] = useState(false);

    const [ idModal, setIdModal ] = useState('');
    const [ userIdModal, setUserIdModal ] = useState('');
 
useEffect(() => {
    store.subscribe(() => { 
        console.log('subscribe', store.getState())
    });

}, []);


const onOpen = (id, userId) => {
    setIdModal(id);
    setUserIdModal(userId);
    setIsOpenModal(true);
}

const onCancel = () => {
    setIsOpenModal(!isOpenModal)
}

const routeToNewPost = () => {
    setIsOpenCreating(!isOpenCreating)
}

    return (

        <div className={style.postsPage}>
            <div className={style.toolsbar}>
               <Searchbar />
                <button onClick={routeToNewPost} className={style.transOnCreate}>+</button>
            </div>
            {
                posts.length && posts.length !== 0 ?
                <div className={style.postsWrap}>
                    { posts && posts.length && posts.map(
                        (data, index) =>
                            (
                                <React.Fragment key={index}>
                                    <Post
                                        id={data.id}
                                        title={data.title}
                                        body={data.body}
                                        onClick={onOpen.bind(null,data.id, data.userId)}
                                    />
                                </React.Fragment>
                            )
                    )}
                </div>
                : <div className={style.recommendation}>
                    <h2>По запросу ничего не найдено...</h2>
                    <p>Рекомендации:</p>
                    <p>Попробуйте использовать другие ключевые слова.</p>
                </div>
            }
            {
                isOpenCreating ? 
                    <div id="#popup2" className={style.creatingPost}>
                        <CreatePost 
                            cancelCreate={routeToNewPost}
                            callback={routeToNewPost}
                        />
                    </div> 
                : null   
            }
            {
                isOpenModal ? 
                    <div id="#popup1" className={style.overlay}>
                        <ModalPost
                            close={onCancel}
                            id={idModal}
                            userId={userIdModal}
                            show={isOpenModal}
                        />
                    </div>
                : null
            }
        </div>
    );
};

export default connect(mapStateToProps, null)(PostsPage);