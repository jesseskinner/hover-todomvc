// create a store for managing the app state
// it will listen to other stores and assemble state data appropriately
AppStore = Hoverboard({
	update: function (state, page, all, completed, active) {
		var todos;

		// decide which todo list to show, depending on the page
		if (page === 'active') {
			todos = active;

		} else if (page === 'completed') {
			todos = completed;

		} else {
			todos = all;
		}

		// expose public state
		return {
			// which page we're currently on
			page: page,

			// list of todo items to display
			todos: todos,

			// counts of each list
			numTotal: all ? all.length : 0,
			numCompleted: completed ? completed.length : 0,
			numActive: active ? active.length : 0
		};
	}
});

// update the AppStore whenever any other stores change
function update() {
	var page = PageStore().page,
		all = TodoStore().list,
		completed = CompletedStore().list,
		active = ActiveStore().list;

	AppStore.update(page, all, completed, active);
}

// every time these stores change, update the state
TodoStore(update);
CompletedStore(update);
ActiveStore(update);
PageStore(update);
