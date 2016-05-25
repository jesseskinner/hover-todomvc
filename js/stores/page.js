// keep track of the current page
var PageStore = Hover({
	load: function (state, page) {
		return page;
	}
});

// start off on 'all' page
PageStore.load('all');
