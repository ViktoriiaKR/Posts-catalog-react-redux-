import React from 'react';
import style from './style.scss';

const Posts = (props) => {
  
    return (
        <div className={style.postsWrap}>
            { props.posts && props.posts.length && props.posts.map(post => (
                <div className={style.post} id={post.id} key={post.id}>
                    <p>{post.title}</p>
                    <p>{post.body}</p>
                    <a onClick={props.onClick.bind(null, post.id, post.userId)}>Подробнее...</a>
                </div>
            ))}
        </div>  
    );
};

export default Posts;