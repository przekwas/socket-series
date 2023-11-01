// Example message interface to define the structure of a message
interface Message {
	id: number;
	user_id: number;
	username: string;
	content: string;
	created_at: string;
}

// Mock messages data
const MOCK_MESSAGES: Message[] = [
	{
		id: 1,
		user_id: 101,
		username: 'Percival',
		content: 'I have an idea for a new invention.',
		created_at: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString() // 6 days ago
	},
	{
		id: 2,
		user_id: 102,
		username: "Vex'ahlia",
		content: 'Trinket, stay!',
		created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() // 5 days ago
	},
	{
		id: 3,
		user_id: 103,
		username: 'Grog Strongjaw',
		content: 'I would like to rage!',
		created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString() // 4 days ago
	},
	{
		id: 4,
		user_id: 104,
		username: 'Keyleth',
		content: 'May the change guide you.',
		created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() // 2 days ago
	},
	{
		id: 5,
		user_id: 105,
		username: 'Scanlan',
		content: 'You know what they say: When you lie, you make Pelor cry.',
		created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() // 1 day ago
	}
];

export const messages = {
	getAll: function (): Promise<Message[]> {
		return new Promise(resolve => {
			setTimeout(() => {
				resolve(MOCK_MESSAGES);
			}, 750);
		});
	},
	insert: function (newMessage: Omit<Message, 'id' | 'created_at'>): Promise<Message> {
		return new Promise(resolve => {
			setTimeout(() => {
				// Create a new id for the new message, it's just the next number in the sequence
				const newId =
					MOCK_MESSAGES.length > 0 ? Math.max(...MOCK_MESSAGES.map(m => m.id)) + 1 : 1;

				// Create a new message object with the new id and current timestamp
				const insertedMessage: Message = {
					id: newId,
					...newMessage,
					created_at: new Date().toISOString()
				};

				// "Insert" the message by pushing it to the mock array
				MOCK_MESSAGES.push(insertedMessage);
				resolve(insertedMessage);
			}, 750);
		});
	}
};
