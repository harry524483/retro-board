import io from 'socket.io-client';
import EventEmitter from 'events';

jest.mock('socket.io-client');

const emitter = new EventEmitter();

const mockSocketClient = () => {
  (io as jest.Mock).mockReturnValue(emitter);

  return emitter;
};

export default mockSocketClient;
