import { io } from 'socket.io-client';
export const initSocket = async () => {
    const socket="http://localhost:5000"
    const options = {
        'force new connection': true,
        reconnectionAttempt: 'Infinity',
        timeout: 10000,
        transports: ['websocket'],
    };
    
    return io(socket, options);
};