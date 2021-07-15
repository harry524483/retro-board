import { Button, Icon, Modal as SematicModal } from 'semantic-ui-react';

const { Header, Content } = SematicModal;

const Modal = ({ children, isOpen, onClose, title }) => {
  return (
    <SematicModal onClose={onClose} open={isOpen} size="tiny" centered={false}>
      <Header>
        {title}
        <Button floated="right" icon size="mini" circular onClick={onClose}>
          <Icon name="cancel" />
        </Button>
      </Header>
      <Content>{children}</Content>
    </SematicModal>
  );
};

export default Modal;
