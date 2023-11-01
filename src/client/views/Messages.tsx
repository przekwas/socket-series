import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');

interface Message {
	id: number;
	user_id: number;
	username: string;
	content: string;
	created_at: string;
}

interface MessagesProps {}

const Messages = (props: MessagesProps) => {
	const [messages, setMessages] = useState<Message[]>([]);
	const [newMessage, setNewMessage] = useState('');

	useEffect(() => {
		const fetchMessages = async () => {
			try {
				const response = await fetch('http://localhost:3000/api/messages');
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				const data = await response.json();
				setMessages(data);
			} catch (error) {
				console.error('Could not fetch messages:', error);
			}
		};

		fetchMessages();

		// Listen for 'new-message' event from server
		socket.on('new-message', (message: Message) => {
			// option 1:
			// re-fetch the entire list of messages
			// fetchMessages();

			// option 2:
			// update state based on the message received from socket
			setMessages(prevMessages => [message, ...prevMessages]);
		});

		// Clean up the effect
		return () => {
			socket.off('new-message');
		};
	}, []);

	// Function to post a new message
	const postMessage = async () => {
		try {
			const response = await fetch('http://localhost:3000/api/messages', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ username: 'Test', user_id: 123, content: newMessage })
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			await response.json();
			setNewMessage('');
		} catch (error) {
			console.error('Could not post new message:', error);
		}
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		postMessage();
	};

	return (
		<main className="container mt-5">
			<section className="row justify-content-center">
				<div className="col-12 col-md-6">
					<form onSubmit={handleSubmit}>
						<div className="input-group mb-3">
							<input
								type="text"
								className="form-control bg-white"
								placeholder="Type a new message"
								value={newMessage}
								onChange={e => setNewMessage(e.target.value)}
							/>
							<button className="btn btn-primary" type="submit">
								Send
							</button>
						</div>
					</form>
					{messages.map(message => (
						<div key={message.id} className="card mb-3">
							<div className="card-header">
								{message.username}{' '}
								<small className="text-muted">
									{new Date(message.created_at).toLocaleString()}
								</small>
							</div>
							<div className="card-body">
								<p className="card-text">{message.content}</p>
							</div>
						</div>
					))}
				</div>
			</section>
		</main>
	);
};

export default Messages;