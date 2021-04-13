import React from 'react';
import style from './style.scss';

const PaginationOwn = (props) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(props.totalPosts / props.postsPerPage); i++) {
        pageNumbers.push(i);
    };

    return (
        <nav>
            <ul className={style.pagination}>
                {pageNumbers.map(number => (
                    <li key={number} className={style.pageItem}>
                        <a href='#' onClick={() => props.paginate(number)} className={style.pageref}>
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default PaginationOwn;