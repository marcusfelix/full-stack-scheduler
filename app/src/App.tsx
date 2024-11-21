import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useUserContext } from "./context/user";
import Auth from "./pages/auth";
import New from "./pages/new";
import Done from "./pages/done";

const router = createBrowserRouter([
  {
    path: "/",
    element: <New />,
  },
  {
    path: "/done",
    element: <Done />
  }
]);

const App = () => {
  const { user } = useUserContext();

  if (!user) {
    return <Auth />
  }

  return <RouterProvider router={router} />
}

export default App;