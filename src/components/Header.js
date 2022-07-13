import React from 'react'

import useUser from '../hooks/useUser';
import { auth, signInWithGoogle } from '../services/auth';

import './Header.css';

const Header = () => {
	const user = useUser();

	return (
		<header className='header'>
			{user
				? (
					<div className='authenticated'>
						<span className='welcome'>Hello, <span></span>{user.displayName}</span>
						<img src={user.providerData[0]?.photoURL} alt="Profile" className='avatar' />
						<button onClick={() => auth.signOut()} className="button signout">Sign out</button>
					</div>
				) : (
					<div className='unauthenticated'>
						<button className="button signin" onClick={signInWithGoogle}>
							<i className="fab fa-google"></i>
							<span>Sign in with Google</span>
						</button>
					</div>
				)}
		</header>
	)
}

export default Header
