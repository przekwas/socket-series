import React from 'react';
import { NavLink } from 'react-router-dom'; // Assuming you are using 'react-router-dom' for routing

interface NavbarProps {}

const Navbar = (props: NavbarProps) => {
	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
			<div className="container-fluid">
				<NavLink className="navbar-brand" to="/">
					Socket Series
				</NavLink>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarNav"
					aria-controls="navbarNav"
					aria-expanded="false"
					aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav">
						<li className="nav-item">
							<NavLink
								className={({ isActive }) => `nav-link ${isActive && 'active'}`}
								to="/">
								Home
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink
								className={({ isActive }) => `nav-link ${isActive && 'active'}`}
								to="/messages">
								Messages
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink
								className={({ isActive }) => `nav-link ${isActive && 'active'}`}
								to="/match-results">
								Match Results
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink
								className={({ isActive }) => `nav-link ${isActive && 'active'}`}
								to="/admin">
								Admin
							</NavLink>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
