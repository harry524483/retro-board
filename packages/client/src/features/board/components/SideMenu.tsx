import { FC } from 'react';
import { Checkbox, Icon, Form, Divider, Button } from 'semantic-ui-react';
import { Options } from '@retro-board/common';

const { Field } = Form;

type Props = {
  innerRef: any;
  hideCards: Options;
  disableVoting: Options;
  hideCount: Options;
  maxVotes: number;
  onClose: Function;
  onOptionChange: Function;
  onIncrementVote: () => void;
  onDecrementVote: Function;
};

const SideMenu: FC<Props> = ({
  innerRef,
  hideCards,
  disableVoting,
  hideCount,
  maxVotes = 0,
  onClose,
  onOptionChange,
  onIncrementVote,
  onDecrementVote
}): JSX.Element => {
  const renderedOptions = () => {
    const options = { hideCards, disableVoting, hideCount };

    return Object.entries(options).map(([key, { label, checked }], index) => (
      <Field key={index}>
        <Checkbox
          toggle
          label={label}
          checked={checked}
          name={`${key}.checked`}
          onChange={() => onOptionChange(key)}
        />
      </Field>
    ));
  };

  return (
    <>
      <div className="overlay"></div>
      <div className="side-menu" ref={innerRef}>
        <div className="side-menu__close">
          <Icon name="close" size="large" onClick={onClose} />
        </div>
        <div className="side-menu__form">
          <h3>Retro controls</h3>
          <Divider />
          <Form>
            {renderedOptions()}
            <Field>
              <label>Max votes</label>
              <div className="side-menu__votes">
                <input disabled value={maxVotes} />
                <Button icon color="facebook" onClick={onIncrementVote}>
                  <Icon name="plus" />
                </Button>
                <Button
                  icon
                  color="facebook"
                  onClick={() => maxVotes > 1 && onDecrementVote()}
                >
                  <Icon name="minus" />
                </Button>
              </div>
            </Field>
          </Form>
        </div>
      </div>
    </>
  );
};

export default SideMenu;
