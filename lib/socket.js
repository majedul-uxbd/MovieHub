import { io } from 'socket.io-client';
const socket = io('http://localhost:4560');
export default socket;
