const initialState = {
	loggedIn: false
};

export default function(state = initialState, action) {
	switch (action.type) {
		case "LOGIN":
			return {
				loggedIn: true
			};
		case "LOGOUT":
			return {
				loggedIn: false
			};
		default:
			return state;
	}
}
