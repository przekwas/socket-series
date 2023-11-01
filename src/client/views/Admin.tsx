import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');

interface Match {
	id: number;
	player1: string;
	player2: string;
	winner?: string;
	status: 'finished' | 'ongoing';
}

const Admin = () => {
	const [matches, setMatches] = useState<Match[]>([]);

	useEffect(() => {
		const fetchMatches = async () => {
			const response = await fetch('http://localhost:3000/api/matches');
			const data = await response.json();
			setMatches(data);
		};

		fetchMatches();
	}, []);

	const updateWinner = async (matchId: number, winner: string) => {
		try {
			// Assuming the server has a PUT endpoint to update the match winner
			const response = await fetch(`http://localhost:3000/api/matches/${matchId}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ winner })
			});

			const { updatedMatch } = await response.json();

			// Optimistically update the admin's state
			setMatches(prevMatches =>
				prevMatches.map(match =>
					match.id === matchId ? { ...match, winner, status: 'finished' } : match
				)
			);
		} catch (error) {
			console.error('Failed to update winner:', error);
		}
	};

	return (
		<main className="container mt-5">
			<section className="row justify-content-center">
				<div className="col-12 col-md-8">
					<h1 className="text-center mb-4">Admin Dashboard</h1>
					<div className="list-group">
						{matches.map(match => (
							<div
								key={match.id}
								className="list-group-item list-group-item-action flex-column align-items-start">
								<div className="d-flex w-100 justify-content-between">
									<h5 className="mb-1">
										{match.player1} vs {match.player2}
									</h5>
									<small className="text-muted">
										{match.status === 'ongoing' ? 'In Progress' : 'Completed'}
									</small>
								</div>
								{match.status === 'ongoing' && (
									<div className="btn-group mt-2">
										<button
											className="btn btn-outline-success btn-sm"
											onClick={() => updateWinner(match.id, match.player1)}>
											{match.player1} Wins
										</button>
										<button
											className="btn btn-outline-danger btn-sm"
											onClick={() => updateWinner(match.id, match.player2)}>
											{match.player2} Wins
										</button>
									</div>
								)}
							</div>
						))}
					</div>
				</div>
			</section>
		</main>
	);
};

export default Admin;
