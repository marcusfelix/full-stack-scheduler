import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useUserContext } from "./context/user";
import Auth from "./pages/auth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
  },
]);

const App = () => {
  const { user } = useUserContext();

  if (!user) {
    return <Auth />
  }

  return <RouterProvider router={router} />
}

export default App;