import { FC } from 'react';
import { Label, Header, Divider, Icon, Grid } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';

import { AddBoard, BoardOverview } from '../components';
import { Modal, Chart } from '../../../common/components';
import BoardForm from './BoardForm';
import { displayModal } from '../dashboardSlice';
import { DashboardColumn } from '../types';
import { GlobalState } from '../../../common/types';

const createChartLabels = (columns: Array<DashboardColumn>) =>
  columns.map(({ name }) => name);
const createChartData = (columns: Array<DashboardColumn>) =>
  columns.map(({ count }) => count);
const calcTotalCards = (columns: Array<DashboardColumn>) =>
  columns.reduce((total, { count }) => total + count, 0);

const Dashboard: FC = () => {
  const dispatch = useDispatch();
  const isModalOpen = useSelector(
    ({ dashboard }: GlobalState) => dashboard.isModalOpen
  );
  const boards = useSelector(({ dashboard }: GlobalState) => dashboard.boards);

  const onModalOpen = () => dispatch(displayModal(true));
  const onModalClose = () => dispatch(displayModal(false));

  return (
    <div className="dashboard">
      <Modal isOpen={isModalOpen} onClose={onModalClose} title="Create Board">
        <BoardForm />
      </Modal>
      <Header as="h2">
        Dashboard
        <Label circular>2 Boards</Label>
      </Header>
      <Divider horizontal>
        <Header as="h4" color="blue">
          <Icon name="clipboard outline" />
          Boards
        </Header>
      </Divider>
      <Grid columns={5}>
        <Grid.Column>
          <AddBoard onModalOpen={onModalOpen} />
        </Grid.Column>
        {boards.map(({ name, date, columns }, index) => (
          <Grid.Column key={index}>
            <BoardOverview
              name={name}
              date={date}
              totalCards={calcTotalCards(columns)}
            >
              <Chart
                type="bar"
                labels={createChartLabels(columns)}
                data={createChartData(columns)}
              />
            </BoardOverview>
          </Grid.Column>
        ))}
      </Grid>
    </div>
  );
};

export default Dashboard;
