import Detail from "./components/Detail";
import Home from "./components/Home";
import ShowResult from "./components/ShowResult";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/detail/:id',
    element: <Detail />
  },
  {
    path: '/result',
    element: <ShowResult />
  },

];

export default AppRoutes;
