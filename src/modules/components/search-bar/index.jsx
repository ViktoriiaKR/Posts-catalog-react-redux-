import React from 'react';
import style from './style.scss';
import { SearchIcon } from './../../../const/img';
import { connect } from 'react-redux';
import { filterByValue, sortByUser } from './../../../services/redux-store/actions/index';

const mapStateToProps = (state) => {
  return { state };
};

const mapDispatchToProps = dispatch => {
    return {
        filterByValue: (value) => dispatch(filterByValue(value)),
        sortByUser: (direction) => dispatch(sortByUser(direction))
    };
};

const Searchbar = (props) => {

    const searchByInput = (e) => {
        let input = e.target.value;
        props.filterByValue({value: input})
    }; 

    const sortingPosts = (e) => {
        let value = e.target.value;
        let direction = value.endsWith('asc') ? "asc" : "desc";
        props.sortByUser({direction})
    };

    const onSubmitSearch = (e) => {
        e.preventDefault();
    };

    return (
        <form className={style.searchbarForm} onSubmit={onSubmitSearch}>
            <div className={style.searchbar}>
                <img src={SearchIcon} className={style.searchIcon} alt="search-icon" />
                <input
                    type="text"
                    className={style.searchForm}
                    placeholder="Поле поиска..."
                    onChange={e => searchByInput(e)}
                />
            </div>
            <select
                className={style.btnSort}
                onChange={sortingPosts}
                defaultValue={'DEFAULT'}
            >
              <option disabled value='DEFAULT'>Сортировать...</option>
              <option value="user_asc">Автор - от 1-го до последнего</option>
              <option value="user_desc">Автор - от последнего к 1-му</option>
            </select>
        </form>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Searchbar);