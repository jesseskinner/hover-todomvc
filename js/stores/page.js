// keep track of the current page
PageStore = Hoverboard({
	load: function (state, page) {
		return {
			page: page
		};
	}
});

// start off on 'all' page
PageStore.load('all');
