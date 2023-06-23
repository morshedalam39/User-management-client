import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home";
import CreateUser from "../pages/CreateUser/CreateUser";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
        {
            path:'/',
            element:<Home></Home>,
          
        },
        {
            path:'/createUser',
            element:<CreateUser></CreateUser>

        },
    ],
  },
]);

export default router;
