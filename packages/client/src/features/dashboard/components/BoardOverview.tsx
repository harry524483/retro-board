import { FC, ReactNode } from 'react';
import { Card, Icon } from 'semantic-ui-react';

type Props = {
  name: string;
  date: string;
  children: ReactNode;
  totalCards: number;
};

const BoardOverview: FC<Props> = ({ name, date, children, totalCards }) => {
  return (
    <Card link>
      <Card.Content>
        <Card.Header>{name}</Card.Header>
        <Card.Meta>
          <Icon name="clock outline" />
          <span>{date}</span>
        </Card.Meta>
      </Card.Content>
      <Card.Content>
        <Card.Description>{children}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Icon name="list layout" />
        <span>{totalCards} cards</span>
      </Card.Content>
    </Card>
  );
};

export default BoardOverview;
