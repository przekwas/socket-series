import React from 'react';

interface HomeProps {}

const Home = (props: HomeProps) => {
	return (
		<main className="container mt-5">
			<section className="row justify-content-center">
				<div className="col-12 col-md-8">
					<h1>Hey there! Welcome to Socket Series!</h1>
					<p className="lead">
						Ready to play with real-time communication? Let's get the ball rolling!
					</p>
					<hr />
					<p>
						I've set up this little sandbox for you to poke around and figure out how
						WebSocket communication works with socket.io. Imagine sending texts and
						getting replies instantly without refreshing your page - that's what we're
						talking about!
					</p>
					<p>
						The messaging bit is where it gets fun. You'll see firsthand how socket.io
						zips messages back and forth between users and servers. It's like magic, but
						for the web, enabling apps to chat up a storm or games to keep everyone in
						sync.
					</p>
					<p>
						If you're just starting out or you're a pro wanting a refresher, I've built
						this place for you. It's all about getting your hands dirty with socket.io
						and the cool real-time tech it brings to the table. So, let's jump in and
						see what's under the hood!
					</p>
				</div>
			</section>
		</main>
	);
};

export default Home;
