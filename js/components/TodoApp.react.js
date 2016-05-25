window.TodoApp = React.createClass({
	onAddKeyPress: function (event) {
		// when enter key is pressed
		if (event.which === ENTER_KEY) {
			// add new item
			TodoStore.add(event.target.value);

			// reset input
			event.target.value = '';
		}
	},

	onToggleAllClick: function (event) {
		TodoStore.toggleAllCompleted();

		event.preventDefault();
	},

	render: function() {
		return (
			<div>
				<header id="header">
					<h1>todos</h1>
					<input onKeyPress={this.onAddKeyPress} id="new-todo" placeholder="What needs to be done?" autoFocus/>
				</header>

				{/* This section should be hidden by default and shown when there are todos */}
				{this.props.numTotal > 0 && (
					<section id="main">
						<input onClick={this.onToggleAllClick}
							id="toggle-all" type="checkbox"/>

						<label htmlFor="toggle-all">Mark all as complete</label>

						<ul id="todo-list">
						{this.props.todos.map(function (item, i) {
							return <TodoItem key={item.id} item={item} />
						})}
						</ul>
					</section>
				)}

				{/* This footer should hidden by default and shown when there are todos */}
				{this.props.numTotal > 0 && (
					<footer id="footer">
						{/* This should be `0 items left` by default */}
						<span id="todo-count">
							<strong>{this.props.numActive}</strong> {
								this.props.numActive !== 1 ? 'items' : 'item'
							} left
						</span>

						<ul id="filters">
							<li>
								<a className={this.props.page === 'all' && 'selected'}
									href="/">All</a>
							</li>
							<li>
								<a className={this.props.page === 'active' && 'selected'}
									href="/active">Active</a>
							</li>
							<li>
								<a className={this.props.page === 'completed' && 'selected'}
									href="/completed">Completed</a>
							</li>
						</ul>

						{/* Hidden if no completed items are left ↓ */}
						{this.props.numCompleted > 0 && (
							<button onClick={TodoStore.clearCompleted} id="clear-completed">
								Clear completed ({this.props.numCompleted})
							</button>
						)}
					</footer>
				)}
			</div>
		);
	}

});
