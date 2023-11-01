interface Match {
	id: number;
	player1: string;
	player2: string;
	winner?: string;
	status: 'finished' | 'ongoing';
}

// Mock matches data
const MOCK_MATCHES: Match[] = [
	{
		id: 1,
		player1: 'Vax',
		player2: 'Vex',
		winner: 'Vex',
		status: 'finished'
	},
	{
		id: 2,
		player1: 'Percy',
		player2: 'Grog',
		winner: 'Percy',
		status: 'finished'
	},
	{
		id: 3,
		player1: 'Keyleth',
		player2: 'Pike',
		winner: 'Keyleth',
		status: 'finished'
	},
	{
		id: 4,
		player1: 'Tiberius',
		player2: 'Scanlan',
		status: 'ongoing'
	},
	{
		id: 5,
		player1: 'Gilmore',
		player2: 'Allura',
		status: 'ongoing'
	}
];

export const matches = {
	getAll: function (): Promise<Match[]> {
		return new Promise(resolve => {
			setTimeout(() => {
				resolve(MOCK_MATCHES);
			}, 750);
		});
	},
	insert: function (newMatch: Omit<Match, 'id'>): Promise<Match> {
		return new Promise(resolve => {
			setTimeout(() => {
				// Create a new id for the new match, it's just the next number in the sequence
				const newId =
					MOCK_MATCHES.length > 0 ? Math.max(...MOCK_MATCHES.map(m => m.id)) + 1 : 1;

				// Create a new match object with the new id
				const insertedMatch: Match = {
					id: newId,
					...newMatch
				};

				// "Insert" the match by pushing it to the mock array
				MOCK_MATCHES.push(insertedMatch);
				resolve(insertedMatch);
			}, 750);
		});
	},
	update: function (id: number, updates: Partial<Omit<Match, 'id'>>): Promise<Match> {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				const matchIndex = MOCK_MATCHES.findIndex(match => match.id === id);
				if (matchIndex !== -1) {
					// Update the match with the new data
					const updatedMatch = { ...MOCK_MATCHES[matchIndex], ...updates };
					MOCK_MATCHES[matchIndex] = updatedMatch;
					resolve(updatedMatch);
				} else {
					reject(new Error(`Match with id ${id} not found`));
				}
			}, 750);
		});
	}
};
