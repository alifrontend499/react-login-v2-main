import React from 'react';
import {
	BrowserRouter as Router
} from 'react-router-dom'

// ESSANTIALS
import Header from './components/common/Header';
import Routes from './routes/Common';


function App() {
	return (
		<div className="app-wrapper">
			<Router>
				{/* header */}
				<Header />
				
				{/* all routes */}
				<Routes />

			</Router>
		</div>
	);
};
export default App;
