import Detail from "./components/Detail";
import Home from "./components/Home";
import QrcodeList from "./components/QrcodeList";
import ShowResult from "./components/ShowResult";
import ShowSlider from "./components/ShowSlider";

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
  {
    path: '/slider',
    element: <ShowSlider />
  },
  {
    path: '/qrcode',
    element: <QrcodeList />
  },

];

export default AppRoutes;
