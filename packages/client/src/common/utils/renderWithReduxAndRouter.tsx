import { ReactElement } from 'react';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import { Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import { RenderOptions } from '../types';
import createStore from '../../store';

const renderWithReduxAndRouter = (
  ui: ReactElement,
  {
    route = '/',
    path = '/',
    history = createMemoryHistory({ initialEntries: [route] })
  }: RenderOptions
) =>
  render(
    <Router history={history}>
      <Provider store={createStore()}>
        <Route path={path}>{ui}</Route>
      </Provider>
    </Router>
  );

export default renderWithReduxAndRouter;
