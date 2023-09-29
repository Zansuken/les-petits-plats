export let store = {
  count: 0,
  getCount: () => store.count,
  onUpdateCount: (newCount) => {
    store = { ...store, count: newCount };
  },
};
