import React, { useState } from 'react';
import style from './style.scss';
import { connect } from 'react-redux';
import { addNewPost } from '../../../services/redux-store/actions/index';
import { v4 as uuidv4 } from 'uuid';

const mapStateToProps = state => {
    return {
        state
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addNewPost: (id, userId, titleForm, bodyForm) => dispatch(addNewPost(id, userId, titleForm, bodyForm))
    };
};

const CreatePost = (props) => {
    const [ titleForm, setTitleForm] = useState('');
    const [ bodyForm, setBodyForm] = useState('');

    const handleNewPost = (e) => {
        let id = uuidv4();
        let userId = 15;

        props.addNewPost({id: id, title: titleForm, body: bodyForm, userId: userId});

        if (props.callback) {
            props.callback()
        };
        
        e.preventDefault();
    };

    return (
            <form className={style.newPostForm} onSubmit={handleNewPost}>
                <a onClick={props.cancelCreate} className={style.closeCreating} href="#">&times;</a>
                <input
                    onChange={e => setTitleForm(e.target.value)}
                    type="text"
                    placeholder="Введите тему поста (10 - 100 символов)"
                    pattern=".{10,100}"
                    required
                />
                <textarea
                    onChange={e => setBodyForm(e.target.value)}
                    name="text"
                    placeholder="Введите содержание поста (до 200 символов)"
                    maxLength={200}
                    rows="5"
                    required
                >
                </textarea>
                <button type="submit">Сохранить</button>
            </form>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost);