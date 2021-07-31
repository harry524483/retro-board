import { FC, ReactChildren } from 'react';
import { Label, Header as SemanticHeader, Divider } from 'semantic-ui-react';

type Props = { title: string; children: ReactChildren; label: string };

const Header: FC<Props> = ({ title, children, label }): JSX.Element => {
  return (
    <>
      <SemanticHeader as="h2">
        {title}
        {label && <Label circular>{label}</Label>}
      </SemanticHeader>
      <Divider horizontal>
        <SemanticHeader as="h4" color="blue">
          {children}
        </SemanticHeader>
      </Divider>
    </>
  );
};

export default Header;
