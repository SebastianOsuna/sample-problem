const Actions = Reflux.createActions({
  getSubItems: { asyncResult: true }
});

Actions.getSubItems.listen(function (catId) {
  if (process.env.NODE_ENV === 'production') {
    // Asuming the same json is sent as response...
    fetch(ENDPOINT)
    .then(response => response.json())
    .then(json => this.completed(catId, json.products.filter(c => ~c.categories.indexOf(catId))));
  }

  if (process.env.NODE_ENV !== 'production') {
    const items = DATA.products.filter(c => ~c.categories.indexOf(catId));
    setTimeout(() => {
      this.completed(catId, items);  
    }, 1000);
  }
  
});

export default Actions;