import Config from 'app/config';
import { io } from 'socket.io-client';

const socket = io(Config.API_URL);
export default socket;
