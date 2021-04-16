import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import style from './style.scss';
import { fetchDataDetails } from '../../../services/redux-store/actions';
import { DeletePostIcon, EditPostIcon } from './../../../const/img';
import { removePost, updateExistPost } from './../../../services/redux-store/actions/index';

const mapStateToProps = state => {
    return {
        state
    };
};

const mapDispatchToProps = {
    fetchDataDetails,
    updateExistPost,
    removePost
};

const ModalPost = (props) => {
    let aboutPost = props.state.postsReducer.filteredPosts;
    let postComments = props.state.postDetails;

    const title = React.createRef();
    const body = React.createRef();

    const [ infoPost, setInfoPost ] = useState([]);
    const [ clickInput, setClickInput ] = useState(false);

    useEffect(() => {
        props.fetchDataDetails(props.id);
        async function searchItem() {
            let item = aboutPost.find(item => item.id === props.id);
            setInfoPost(item);
        };
        searchItem();
    }, []);

    const editPost = () => {
        setClickInput(true);
    };

    const deletePost = () => {
        props.removePost({id: props.id});
        if (props.backAfterDelete) {
            props.backAfterDelete()
        };
    };

    const handleSubmit = (e) => {
        props.updateExistPost({title: title.current.value, body: body.current.value, id: props.id});
        setClickInput(false);
        e.preventDefault();
    };

    return (
           <div className={style.popup}>
                <a onClick={props.close} className={style.close} href="#">&times;</a>
                <div className={style.controlPost}>
                    <button onClick={editPost}>
                        <img src={EditPostIcon} alt="edit-post-icon" />
                    </button>
                    <button onClick={deletePost}>
                        <img src={DeletePostIcon} alt="delete-post-icon" />
                    </button>
                </div>
                {
                    !clickInput ? 
                        <div id={infoPost.id} className={style.infoPost}>
                            <p>{infoPost.title}</p>
                            <p>{infoPost.body}</p>
                        </div> :
                        <form
                            id={infoPost.id}
                            className={style.infoPost}
                            onSubmit={handleSubmit}
                        >
                            <input
                                defaultValue={infoPost.title}
                                placeholder='Заголовок товара (10 - 100 символов)'
                                pattern=".{10,100}"
                                required
                                ref={title}
                            />
                            <input
                                defaultValue={infoPost.body}
                                placeholder='Описание (до 200 символов)'
                                pattern=".{1,200}"
                                required
                                ref={body}
                            />
                            <button type={"submit"}>Сохранить</button>
                        </form>
                }
                <div className={style.comments}>
                    {
                        postComments.length !== 0 ?
                        <>
                        { postComments.map((el, i) => (
                            <div id={el.id} key={i} className={style.comment}>
                                <p>{el.email}</p>
                                <p>{el.name}</p>
                                <p>{el.body}</p>
                            </div> 
                        ))}
                    </>
                        : <h2>Комментарии пока отсуютсвуют...</h2>
                    }
                </div>
            </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalPost);