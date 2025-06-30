import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import Courses from "../Page/Courses/Courses";
import Admin_Dashboard from "../Admin_Dashboard/Admin_Dashboard";
import General_Setting from "../Admin_Dashboard/General_Setting/General_Setting";
import User_List from "../Admin_Dashboard/User_List/User_List";
import User_Role from "../Admin_Dashboard/User_Role/User_Role";
import Cart from "../Page/Cart/Cart";
import OrderDetails from "../Page/OrderDetails/OrderDetails";
import Checkout from "../Page/Checkout/Checkout";
import Search from "../Page/Search/Search";
import Login from "../Page/Login/Login";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

const Router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/",
    element: (
      <PrivateRoute>
        <Layout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "course",
        element: <Courses />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "checkout",
        element: <Checkout />,
      },
      {
        path: "search",
        element: <Search />,
      },
      {
        path: "order-details",
        element: <OrderDetails />,
      },
    ],
  },

  {
    path: "admin-dashboard",
    element: (
      <PrivateRoute>
        <Admin_Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "general-setting",
        element: <General_Setting />,
      },
      {
        path: "user-list",
        element: <User_List />,
      },
      {
        path: "user-role",
        element: <User_Role />,
      },
    ],
  },
]);

export default Router;
