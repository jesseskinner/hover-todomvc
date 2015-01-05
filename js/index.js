// constants
var ENTER_KEY = 13;
var ESCAPE_KEY = 27;

// add listener to AppStore's state
AppStore.getState(function (appState) {
	// re-render whenever the app state changes
	React.render(
		React.createElement(TodoApp, appState),
		document.getElementById('todoapp')
	);

});
