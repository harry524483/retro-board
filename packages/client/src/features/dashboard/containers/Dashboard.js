import { Label, Header, Divider, Icon, Grid } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';

import { AddBoard, BoardOverview } from '../components/';
import { Modal, Chart } from '../../../common/components/';
import BoardForm from './BoardForm';

import { displayModal } from '../dashboardSlice';

const { Column } = Grid;

const createChartLabels = (columns) => columns.map(({ name }) => name);
const createChartData = (columns) => columns.map(({ count }) => count);
const calcTotalCards = (columns) =>
  columns.reduce((total, { count }) => total + count, 0);

const Dashboard = () => {
  const dispatch = useDispatch();
  const isModalOpen = useSelector(({ dashboard }) => dashboard.isModalOpen);
  const boards = useSelector(({ dashboard }) => dashboard.boards);

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
        <Column>
          <AddBoard onModalOpen={onModalOpen} />
        </Column>
        {boards.map(({ name, date, columns }, index) => (
          <Column key={index}>
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
          </Column>
        ))}
      </Grid>
    </div>
  );
};

export default Dashboard;
