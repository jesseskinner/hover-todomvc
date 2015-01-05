// use page library to trigger actions on PageStore when URL changes

// show only active items
page('/active', function () {
	PageStore.load('active');
});

// show only completed item
page('/completed', function () {
	PageStore.load('completed');
});

// show all by default
page('*', function () {
	PageStore.load('all');
});

// tell page library to use hashbangs for URL state
page({ hashbang: true });