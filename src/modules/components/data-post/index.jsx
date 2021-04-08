import React from 'react';
import style from './style.scss';

const Post = (props) => {

  return (
      <div className={style.post} id={props.id}>
        <p>{props.title}</p>
        <p>{props.body}</p>
        <a onClick={props.onClick}>Подробнее...</a>
      </div>
  );
};


export default Post;