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

const MatchResults = () => {
	const [matches, setMatches] = useState<Match[]>([]);

	useEffect(() => {
		socket.on('match-update', (updatedMatch: Match) => {
			setMatches(prevMatches => {
				const index = prevMatches.findIndex(m => m.id === updatedMatch.id);
				const updatedMatches = [...prevMatches];
				updatedMatches[index] = updatedMatch;
				return updatedMatches;
			});
		});

		// Fetch initial match list
		const fetchMatches = async () => {
			const response = await fetch('http://localhost:3000/api/matches');
			const data = await response.json();
			setMatches(data);
		};

		fetchMatches();

		return () => {
			socket.off('match-update');
		};
	}, []);

	const renderMatchResult = (match: Match) => {
		let resultDisplay;
		if (match.status === 'finished') {
			if (match.winner) {
				resultDisplay = (
					<span>
						Winner: <strong className="text-success">{match.winner}</strong>
					</span>
				);
			} else {
				resultDisplay = <span className="text-secondary">It's a tie!</span>;
			}
		} else {
			resultDisplay = <span className="text-primary">Ongoing</span>;
		}

		return (
			<li className="list-group-item" key={`match-id-${match.id}`}>
				{match.player1} vs {match.player2} — {resultDisplay}
			</li>
		);
	};

	return (
		<main className="container mt-5">
			<section className="row justify-content-center">
				<div className="col-12 col-md-6 text-center">
					<h1>Rock, Paper, Scissors - The Classic Showdown</h1>
					<p className="lead">
						Throw your hand, and let's see if you can outsmart your opponent in this
						timeless game!
					</p>

					<div className="my-4">
						<h2>Recent Matches</h2>
						<ul className="list-group">{matches.map(renderMatchResult)}</ul>
					</div>
				</div>
			</section>
		</main>
	);
};

export default MatchResults;
