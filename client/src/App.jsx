import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  Landing,
  Root,
  Login,
  Register,
  Error,
  Dashboard,
  Home,
  Order,
  Profile,
  Holdings,
} from "./pages";

// ACTIONS
import { action as registerAction } from "./pages/Register";
import { action as loginAction } from "./pages/Login";
import { action as orderAction } from "./pages/Order";

// LOADERS
import { loader as dashboardLoader } from "./pages/Dashboard";
import { loader as holdingsLoader } from "./pages/Holdings";

// ROUTES
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "login",
        element: <Login />,
        action: loginAction,
      },
      {
        path: "register",
        element: <Register />,
        action: registerAction,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
        loader: dashboardLoader,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "holdings",
            element: <Holdings />,
            loader: holdingsLoader,
          },
          {
            path: "order",
            element: <Order />,
            action: orderAction,
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
