import { Label, Header as SemanticHeader, Divider } from 'semantic-ui-react';

const Header = ({ title, children, label }) => {
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
