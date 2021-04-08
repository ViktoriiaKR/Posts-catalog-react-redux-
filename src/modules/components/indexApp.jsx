import React, { lazy, Suspense } from 'react';
import { hot } from 'react-hot-loader';
import { Route, Switch, BrowserRouter } from "react-router-dom";

const PostsPage = lazy(() => import("./../screens/posts-page/index"));

function App() {
    return (
        <BrowserRouter>
            <Suspense fallback={<p>Загрузка...</p>}>
                <Switch>
                    <Route exact path="/" component={PostsPage}/>
                </Switch>
            </Suspense>
        </BrowserRouter>
    );
}

export default hot(module)(App);