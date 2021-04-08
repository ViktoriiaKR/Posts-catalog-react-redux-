import React from 'react';
import style from './style.scss';

const Pagination = (props) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(props.totalPosts / props.postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className={style.pagination}>
        {pageNumbers.map(number => (
          <li key={number} className={style.pageItem}>
            <a href='!#' onClick={() => props.paginate(number)} className='page-link'>
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;