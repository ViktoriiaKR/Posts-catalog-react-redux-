import React from 'react';
import ReactDOM from 'react-dom';
import App from './modules/components/indexApp';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './services/redux-store/reducers';
import { fetchData } from './services/redux-store/actions'

export const store = createStore(rootReducer, applyMiddleware(thunk));
store.dispatch(fetchData());

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
document.getElementById('root'));