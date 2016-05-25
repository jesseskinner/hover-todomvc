// create a store for managing the app state
// it will listen to other stores and assemble state data appropriately
AppStore = Hover.compose({
	page: PageStore,
	all: TodoStore,
	completed: CompletedStore,
	active: ActiveStore
}, function (state) {
	var todos;
console.log(state.page)
	// decide which todo list to show, depending on the page
	if (state.page === 'active') {
		todos = state.active;

	} else if (state.page === 'completed') {
		todos = state.completed;

	} else {
		todos = state.all.list;
	}

	// expose public state
	return {
		// which page we're currently on
		page: page,

		// list of todo items to display
		todos: todos,

		// counts of each list
		numTotal: state.all.list.length,
		numCompleted: state.completed.length,
		numActive: state.active.length
	};
});
