// create a store to manage the full list of todos
TodoStore = Hoverboard({
	// private variable we'll increment to generate IDs
	_nextId: 0,

	// return the initial (empty) list of todos
	getInitialState: function () {
		return {
			list: []
		};
	},

	// private method to find an item with its id
	getItem: function (id) {
		return _.find(this.state.list, { id: id });
	},

	// private method to update properties on an item in the list
	updateItem: function (id, props) {
		var item = this.getItem(id),
			key;

		if (item) {
			for (key in props) {
				item[key] = props[key];
			}

			this.setState({
				list: this.state.list
			});
		}
	},

	// TodoStore.init(list) initialize the state with a todo list (ie. from storage)
	onInit: function (list) {
		if (list && list.length) {
			// get the id counter to point at one more than the max id
			this._nextId = Math.max.apply(Math, _.pluck(list, 'id')) + 1;

			// start off with a provided list
			this.setState({ list: list });
		}
	},

	// TodoStore.add('hello') - add an item to the top of the list
	onAdd: function (text) {
		this.state.list.unshift({
			id: this._nextId++,
			text: text,
			completed: false,
			editing: false
		});

		this.setState({
			list: this.state.list
		});
	},

	// TodoStore.edit(id) - turn on "editing" for an item
	onEdit: function (id) {
		this.updateItem(id, { editing: true });
	},

	// TodoStore.cancelEdit(id) - turn off "editing" for an item
	onCancelEdit: function (id) {
		this.updateItem(id, { editing: false });
	},

	// TodoStore.save(id, text) - change the text and turn off "editing" for an item
	onSave: function (id, text) {
		this.updateItem(id, {
			editing: false,
			text: text
		});
	},

	// TodoStore.remove(id) - remove an item from the list
	onRemove: function (id) {
		this.setState({
			list: _.reject(this.state.list, { id: id })
		});
	},

	// TodoStore.toggleCompleted(id) - toggle the "completed" flag on an item
	onToggleCompleted: function (id) {
		var item = this.getItem(id);

		item.completed = !item.completed;

		this.setState({
			list: this.state.list
		});
	},

	// TodoStore.clearCompleted() - remove all completed items from the list
	onClearCompleted: function () {
		this.setState({
			list: _.filter(this.state.list, { completed: false })
		});
	},

	// TodoStore.toggleAllCompleted() - toggle the "completed" flag on all items
	onToggleAllCompleted: function () {
		// if any active items, set all to complete. otherwise, set all active.
		var anyActive = !!_.find(this.state.list, { completed: false });

		_.each(this.state.list, function (item) {
			item.completed = anyActive;
		});

		this.setState({
			list: this.state.list
		});
	}
});