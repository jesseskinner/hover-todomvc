// keep track of the current page
PageStore = Hoverboard({
	onLoad: function (page) {
		this.setState({
			page: page
		});
	}
});
