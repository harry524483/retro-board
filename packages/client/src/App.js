import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch, useHistory } from 'react-router-dom';

import Board from './features/board/containers/Board';
import Dashboard from './features/dashboard/containers/Dashboard';

const App = () => {
  const boardId = useSelector(({ board }) => board.id);
  const history = useHistory();

  useEffect(() => {
    if (boardId) {
      history.push(`/board/${boardId}`);
    }
  }, [boardId, history]);

  return (
    <Switch>
      <Route exact path="/" component={Dashboard} />
      <Route path="/board/:id" component={Board} />
    </Switch>
  );
};

export default App;
