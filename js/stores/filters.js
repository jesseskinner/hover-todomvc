// create a simple store definition that allows setting a single list property
var ListStore = {
	list: function (state, list) {
		return { list: list };
	}
};

// create stores to contain the active and completed todos
ActiveStore = Hoverboard(ListStore);
CompletedStore = Hoverboard(ListStore);

TodoStore.getState(function (state) {
	var all = state.list;

	// when the TodoStore changes, set the lists in these two stores with filtered lists
	ActiveStore.list(_.filter(all, { completed: false }));
	CompletedStore.list(_.filter(all, { completed: true }));
});
