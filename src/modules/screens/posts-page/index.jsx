import React, { useEffect, useState } from 'react';
import style from './style.scss';
import Searchbar from './../../components/search-bar/index';
import { connect } from 'react-redux';
import { store } from './../../../index';
import ModalPost from './../../components/modal-post/index';
import CreatePost from '../../components/create-post/index'
import Posts from './../../../modules/components/data-post/index';
import PaginationOwn from './../../components/pagination/index';

const mapStateToProps = state => {
    return {
        state
    };
};

const PostsPage = (props) => {
    let posts = props.state.postsReducer.filteredPosts;

    const [ isOpenModal, setIsOpenModal ] = useState(false);
    const [ isOpenCreating, setIsOpenCreating ] = useState(false);

    const [ idModal, setIdModal ] = useState('');
    const [ userIdModal, setUserIdModal ] = useState('');

    const [ currentPage, setCurrentPage ] = useState(1);
    const [ postsPerPage ] = useState(6);
 
    useEffect(() => {
        store.subscribe(() => { 
            console.log('subscribe', store.getState())
        });
    }, []);


    const onOpenPost = (id, userId) => {
        setIdModal(id);
        setUserIdModal(userId);
        setIsOpenModal(true);
    };

    const onCancelModal = () => {
        setIsOpenModal(!isOpenModal)
    };

    const routeToNewPost = () => {
        setIsOpenCreating(!isOpenCreating)
    };

    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;

    // Change page
    const pagChangePage = pageNumber => setCurrentPage(pageNumber);

    return (
        <>
            { posts !== undefined ?
                <div className={style.postsPage}>
                    <div className={style.toolsbar}>
                    <Searchbar />
                        <button onClick={routeToNewPost} className={style.transOnCreate}>+</button>
                    </div>
                    {
                        posts.length !== 0 ?
                        <Posts
                            posts={posts.slice(indexOfFirstPost, indexOfLastPost)}
                            onClick={onOpenPost}
                        />
                        : 
                        <div className={style.recommendation}>
                            <h2>???? ?????????????? ???????????? ???? ??????????????...</h2>
                            <p>????????????????????????:</p>
                            <p>???????????????????? ???????????????????????? ???????????? ???????????????? ??????????.</p>
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
                                    close={onCancelModal}
                                    id={idModal}
                                    userId={userIdModal}
                                    show={isOpenModal}
                                    backAfterDelete={onCancelModal}
                                />
                            </div>
                        : null
                    }
                    <PaginationOwn 
                        postsPerPage={postsPerPage}
                        totalPosts={posts.length}
                        paginate={pagChangePage}
                    />
                </div>
                : null
            }
        </>
    );
};

export default connect(mapStateToProps, null)(PostsPage);