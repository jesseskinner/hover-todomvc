// create a store class to provide filters on the TodoStore list
function FilterList() {}

FilterList.prototype.onInit = function (filter) {
	// update our state whenever the TodoStore changes state
	TodoStore.getState(function (state) {
		var all = state.list;

		this.setState({
			list: _.filter(all, filter)
		});
	}.bind(this));
};

// create a store to contain the active todos
ActiveStore = Hoverboard(FilterList);
ActiveStore.init({ completed: false });

// create a store to contain the completed todos
CompletedStore = Hoverboard(FilterList);
CompletedStore.init({ completed: true });
