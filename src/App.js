import React from "react";
import Navbar from "./components/Navbar";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { Timeline, Subscribe } from "./routes";

const App = () => (
	<Router>
		<React.Fragment>
			<Navbar />
			<Switch>
				<Route exact path="/" component={Timeline} />
				<Route exact path="/subscribe" component={Subscribe} />
			</Switch>
		</React.Fragment>
	</Router>
);

export default App;
