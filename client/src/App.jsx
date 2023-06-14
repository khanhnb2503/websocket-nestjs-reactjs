import { io, Socket } from 'socket.io-client';
import { useEffect, useState } from 'react';

function App() {
	const [title, setTitle] = useState('');
	const [message, setMessage] = useState('');
	var socket = io('ws://localhost:3000/', 
	{ transports : ['websocket', 'polling', 'flashsocket'] });

	const handleSendMessage = () => {
		const data = {
			chatId: '6489737366aee776cc869c75',
			senderId: '64896ca74bac77b0c2b595a4',
			message: title
		};
		socket.emit('create_message', data);
	};

	useEffect(() => {
		socket.on('response_message',(payload) => {
			setMessage(payload);
		});
	},[]);

	useEffect(() => {
		console.log(message);
	},[message])


  return (
    <>
      <h2>Nhập tin nhắn</h2>
			<input type="text" value={title} onChange={(e) => setTitle(e.target.value) } />
			<button onClick={handleSendMessage}>Gửi tin nhắn</button>
    </>	
  )
}

export default App
