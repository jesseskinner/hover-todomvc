// create a store for managing the app state
// it will listen to other stores and assemble state data appropriately
AppStore = Hoverboard(function () {
	var setState = this.setState;

	// every time these stores change, update the state
	TodoStore.getState(update);
	CompletedStore.getState(update);
	ActiveStore.getState(update);
	PageStore.getState(update);

	// update the state whenever any properties change
	function update() {
		var page = PageStore.getState().page,
			all = TodoStore.getState().list,
			completed = CompletedStore.getState().list,
			active = ActiveStore.getState().list,
			todos;

		// decide which todo list to show, depending on the page
		if (page === 'active') {
			todos = active;

		} else if (page === 'completed') {
			todos = completed;

		} else {
			todos = all;
		}

		// expose public state
		setState({
			// which page we're currently on
			page: page,

			// list of todo items to display
			todos: todos,

			// counts of each list
			numTotal: all ? all.length : 0,
			numCompleted: completed ? completed.length : 0,
			numActive: active ? active.length : 0
		});
	}
});