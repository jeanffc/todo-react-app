import React, { useEffect, useState } from 'react';
import { auth } from '../services/auth';

const useUser = () => {
	const [user, setUser] = useState(null);

	useEffect(() => {
		auth.onAuthStateChanged(user => {
			setUser(user);
		})
	}, [])

	return user;
}

export default useUser
