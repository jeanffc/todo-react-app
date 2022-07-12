import React from 'react'

import Header from './components/Header';
import TodoList from './components/TodoList';

const App = () => {
	return (
		<main className='main'>
			<Header />
			<TodoList />
		</main>
	)
}

export default App
