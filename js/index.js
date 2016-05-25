// constants
window.ENTER_KEY = 13;
window.ESCAPE_KEY = 27;

// add listener to AppStore's state
AppStore(function (appState) {
	// re-render whenever the app state changes
	ReactDOM.render(
		React.createElement(window.TodoApp, appState),
		document.getElementById('todoapp')
	);

});
