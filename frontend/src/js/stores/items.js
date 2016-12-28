import Actions from '../actions';
export default Reflux.createStore({
  listenables: [Actions],
  init() {
    this.subItems = {};
  },

  onGetSubItems(catId) {
    this.trigger({ fetching: { [catId]: true } });
  },

  onGetSubItemsCompleted(catId, result) {
    this.subItems[catId] = result;
    this.trigger({ subItems: this.subItems, fetching: { [catId]: false } });
  },

});