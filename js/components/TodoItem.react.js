window.TodoItem = React.createClass({
	onEdit: function () {
		TodoStore.edit(this.props.item.id);
	},

	onRemove: function () {
		TodoStore.remove(this.props.item.id);
	},

	onToggleComplete: function () {
		TodoStore.toggleCompleted(this.props.item.id);
	},

	onEditKeyDown: function (event) {
		if (event.which === ENTER_KEY) {
			// save when enter is pressed
			this.onSave(event);

		} else if (event.which === ESCAPE_KEY) {
			// allow escape to cancel editing
			TodoStore.cancelEdit(this.props.item.id);
		}
	},

	onSave: function (event) {
		TodoStore.save(this.props.item.id, event.target.value);
	},

	getClassName: function () {
		var item = this.props.item,
			classes = [];

		if (item.completed) {
			classes.push('completed');
		}

		if (item.editing) {
			classes.push('editing');
		}

		return classes.join(' ');
	},

	render: function() {
		var item = this.props.item,
			className = this.getClassName();

		return (
			<li className={className} key={item.id}>
				<div className="view">
					<input onChange={this.onToggleComplete} className="toggle"
						type="checkbox" checked={item.completed}/>

					<label onDoubleClick={this.onEdit}>{item.text}</label>

					<button onClick={this.onRemove} className="destroy"></button>
				</div>

				<input onBlur={this.onSave} onKeyDown={this.onEditKeyDown}
					className="edit" defaultValue={item.text} autoFocus/>
			</li>
		)
	}

});