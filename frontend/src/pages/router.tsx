import {Route, Switch} from 'react-router-dom';

import HomePage from './home';
import MoviePage from './movie';
import MyListPage from './mylistes';
import ListDetailsPage from './list';

const RouterWrapper = () => {
    return (
        <div style={{marginTop: '1em'}}>
            <Switch>
                <Route path={'/'} exact={true} component={HomePage} />
                <Route
                    path={'/movie/:mid'}
                    exact={true}
                    component={MoviePage}
                />
                <Route path={'/lists'} exact={true} component={MyListPage} />
                <Route
                    path={'/lists/:name'}
                    exact={true}
                    component={ListDetailsPage}
                />
            </Switch>
        </div>
    );
};

export {RouterWrapper};
