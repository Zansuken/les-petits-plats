import routes from "../router/routes";

export let store = {
  route: routes.HOME,
  getRoute: () => store.route,
  setRoute: (newRoute) => {
    window.history.pushState(null, null, newRoute);
    store.route = newRoute;
  },
};
