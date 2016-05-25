function updateItem(list, id, props) {
	var item = _.find(list, { id: id }),
		key;

	if (item) {
		for (key in props) {
			item[key] = props[key];
		}
	}

	return list;
}

// create a store to manage the full list of todos
var actions = {
	init: function (state, list) {
		// TodoStore.init(list) initialize the state with a todo list (ie. from storage)
		if (list && list.length) {
			return {
				// get the id counter to point at one more than the max id
				nextId: Math.max.apply(Math, _.pluck(list, 'id')) + 1,

				// start off with a provided list
				list: list
			};
		}

		// otherwise, use an empty list
		return {
			nextId: 0,
			list: []
		};
	},

	// TodoStore.add('hello') - add an item to the top of the list
	add: function (state, text) {
		var list = [
				{
					id: state.nextId,
					text: text,
					completed: false,
					editing: false
				}
			];

		return {
			nextId: state.nextId + 1,
			list: list.concat(state.list)
		};
	},

	// TodoStore.edit(id) - turn on "editing" for an item
	edit: function (state, id) {
		return {
			list: updateItem(state.list, id, { editing: true })
		};
	},

	// TodoStore.cancelEdit(id) - turn off "editing" for an item
	cancelEdit: function (state, id) {
		return {
			list: updateItem(state.list, id, { editing: false })
		};
	},

	// TodoStore.save(id, text) - change the text and turn off "editing" for an item
	save: function (state, id, text) {
		return {
			list: updateItem(state.list, id, {
				editing: false,
				text: text
			})
		};
	},

	// TodoStore.remove(id) - remove an item from the list
	remove: function (state, id) {
		return {
			list: _.reject(state.list, { id: id })
		};
	},

	// TodoStore.toggleCompleted(id) - toggle the "completed" flag on an item
	toggleCompleted: function (state, id) {
		var item = _.find(state.list, { id: id });

		if (item) {
			item.completed = !item.completed;
		}

		return {
			list: state.list
		};
	},

	// TodoStore.clearCompleted() - remove all completed items from the list
	clearCompleted: function (state) {
		return {
			list: _.filter(state.list, { completed: false })
		};
	},

	// TodoStore.toggleAllCompleted() - toggle the "completed" flag on all items
	toggleAllCompleted: function (state) {
		// if any active items, set all to complete. otherwise, set all active.
		var anyActive = !!_.find(state.list, { completed: false });

		_.each(state.list, function (item) {
			item.completed = anyActive;
		});

		return {
			list: state.list
		};
	}
};

TodoStore = Hover(actions, []);

// start off with default state
TodoStore.init();
