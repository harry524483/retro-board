import { screen, fireEvent } from '@testing-library/react';
import { actionTypes, Board } from '@retro-board/common';
import { EventEmitter } from 'events';

import mockSocketClient from '../../../common/utils/mockSocketClient';
import renderWithReduxAndRouter from '../../../common/utils/renderWithReduxAndRouter';
import BoardComponent from './Board';

const getAllCheckboxes = () =>
  screen.getAllByRole('checkbox') as Array<HTMLInputElement>;

const getCheckboxByName = (name: string) => {
  const checkboxes = getAllCheckboxes();

  return checkboxes.find((checkbox) => checkbox.name === name);
};

const board: Omit<Board, 'createdAt' | 'updatedAt'> = {
  id: 'board-uuid',
  name: 'dummy board',
  columns: [
    { id: 'column-uuid-1', name: 'foo', color: '', cards: [] },
    { id: 'column-uuid-2', name: 'bar', color: '', cards: [] }
  ],
  disableVoting: { checked: false, label: 'disableVoting' },
  hideCards: { checked: true, label: 'hideCards' },
  hideCount: { checked: false, label: 'hideCount' },
  maxVotes: 3
};

describe('Board', () => {
  let socketClient: EventEmitter;

  beforeEach(() => {
    socketClient = mockSocketClient();

    renderWithReduxAndRouter(<BoardComponent />, {
      route: '/board/uuid',
      path: '/board/:id'
    });

    socketClient.emit('connect');
  });

  afterEach(() => {
    socketClient.removeAllListeners();
  });

  describe('SideMenu', () => {
    beforeEach(() => {
      // Act
      socketClient.emit(actionTypes.BOARD_CREATED, board);

      fireEvent.click(screen.getByTestId('setting-icon'));
    });

    it('opens side menu when its icon is clicked', () => {
      // Assert
      expect(screen.getByTestId('side-menu')).toBeInTheDocument();
    });

    it('closes side menu when its close icon is clicked', () => {
      // Act
      fireEvent.click(screen.getByTestId('sm-close-icon'));

      // Assert
      expect(screen.queryByTestId('side-menu')).toBeNull();
    });

    it('closes side menu when clicked outside', () => {
      // Act
      fireEvent.click(document);

      // Assert
      expect(screen.queryByTestId('side-menu')).toBeNull();
    });

    it('renders side menu with given header', () => {
      // Assert
      expect(
        screen.getByRole('heading', { name: /retro controls/i })
      ).toBeInTheDocument();
    });

    it('renders all checkboxes with given values', () => {
      // Arrange
      const checkboxValues = {
        hideCards: board.hideCards,
        disableVoting: board.disableVoting,
        hideCount: board.hideCount
      };

      // Assert
      Object.entries(checkboxValues).forEach(([key, { checked }]) => {
        const checkbox = getCheckboxByName(`${key}.checked`);

        expect(checkbox?.checked).toBe(checked);
      });
    });

    it('renders max votes section', () => {
      // Assert
      const inputElement = screen.getByRole('textbox') as HTMLInputElement;

      expect(screen.getByText(/max votes/i)).toBeInTheDocument();

      expect(inputElement.disabled).toBeTruthy();
      expect(inputElement.value).toBe(board.maxVotes.toString());

      expect(screen.getByTestId('plus-button')).toBeInTheDocument();
      expect(screen.getByTestId('minus-button')).toBeInTheDocument();
    });

    describe('toggles checkboxes', () => {
      it.each(['hideCards', 'disableVoting', 'hideCount'])(
        `when %s checkbox is clicked`,
        (name: string) => {
          // Arrange
          const checkbox = getCheckboxByName(`${name}.checked`);

          const checkboxValue = checkbox?.checked;

          // Act
          fireEvent.click(checkbox!);

          // Assert
          expect(checkbox?.checked).toBe(!checkboxValue);
        }
      );
    });

    describe('max votes section', () => {
      it('increments max votes count when plus button is clicked', () => {
        // Arrange
        const plusButton = screen.getByTestId('plus-button');

        // Act
        fireEvent.click(plusButton);

        // Assert
        expect((screen.getByRole('textbox') as HTMLInputElement).value).toBe(
          (board.maxVotes + 1).toString()
        );
      });

      it('decrements max votes count when minus button is clicked', () => {
        // Arrange
        const minusButton = screen.getByTestId('minus-button');

        // Act
        fireEvent.click(minusButton);

        // Assert
        expect((screen.getByRole('textbox') as HTMLInputElement).value).toBe(
          (board.maxVotes - 1).toString()
        );
      });

      it('does not decrement max votes count less than 1', () => {
        // Act
        [1, 2, 3].forEach(() => {
          fireEvent.click(screen.getByTestId('minus-button'));
        });

        // Assert
        expect((screen.getByRole('textbox') as HTMLInputElement).value).toBe(
          '1'
        );
      });
    });
  });
});
