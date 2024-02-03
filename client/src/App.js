import { createBrowserRouter, RouterProvider, Outlet, Navigate } from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Topbar from "./components/topbar/Topbar";
import Leftbar from "./components/leftbar/Leftbar";
import Rightbar from "./components/rightbar/Rightbar";
import Profile from "./pages/profile/Profile";
import Home from "./pages/home/Home";
import Events from "./pages/events/Events";
import Friends from "./pages/friends/Friends";
import Messages from "./pages/messages/Messages";
import Gallery from "./pages/gallery/Gallery";
import Settings from "./pages/settings/Settings";
import Watch from "./pages/watch/Watch";
import Groups from "./pages/groups/Groups";
import Marketplace from "./pages/marketplace/Marketplace";
import React from "react";
import "./style.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeAPI";
import { AuthContext } from "./context/authAPI";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function App() {
  const {currentUser} = useContext(AuthContext);

  const {darkMode} = useContext(DarkModeContext);

  const queryClient = new QueryClient();

  const Layout = () => {
    return (
      <QueryClientProvider client={queryClient}>
        <div className={`theme-${darkMode ? "dark" : "light"}`}>
          <Topbar/>
          <div style={{display: "flex"}}>
            <Leftbar/>
            <div style={{flex: 6}}>
              <Outlet/>
            </div>
            <Rightbar/>
          </div>
        </div>
      </QueryClientProvider>
    );
  };

  const ProtectedRoute = ({ children }) => {
    if (currentUser) {
      return children;
    } else {
      return <Navigate to="/login"/>
    }
  };

  const router = createBrowserRouter(
    {
      path: "/",
      element: (<ProtectedRoute><Layout/></ProtectedRoute>),
      children: [
        { path: "/", element: <Home/> },
        { path: "/profile/:id", element: <Profile/> },
        { path: "/events", element: <Events/> },
        { path: "/friends", element: <Friends/> },
        { path: "/messages", element: <Messages/> },
        { path: "/gallery", element: <Gallery/> },
        { path: "/settings", element: <Settings/> },
        { path: "/watch", element: <Watch/> },
        { path: "/groups", element: <Groups/> },
        { path: "/marketplace", element: <Marketplace/> },
      ],
    },
    { path: "/login", element: <Login/> },
    { path: "/register", element: <Register/> },
  );

  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
