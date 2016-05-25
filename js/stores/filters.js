// create stores to contain the active and completed todos
var ActiveStore = Hover.compose(TodoStore, function (state) {
	return state.list.filter(function (item) {
		return item.completed === false;
	});
});

var CompletedStore = Hover.compose(TodoStore, function (state) {
	return state.list.filter(function (item) {
		return item.completed === true;
	});
});
