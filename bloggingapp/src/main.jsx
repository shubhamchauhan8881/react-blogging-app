import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter,RouterProvider,}
from "react-router-dom";
import Layout from './Layout';
import Home from './pages/Home';
import User from './pages/User';
import CreateBlog from './pages/CreateBlog';
import Notifications from './pages/Notifications';
import Register from './pages/Register';
import Login from './pages/Login';
import { AuthProvider } from './utils/AuthProvider';
import PrivateRoutes from './utils/PrivateRoutes';
import LatestArticle from './components/LatestArticle'
import UserFavorites from './components/UserFavorites';

const router = createBrowserRouter(
  [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element:<Home />,
        children:[
          {
            path: '',
            element:<LatestArticle />
          },
          {
            path: 'most-liked/',
            element:<LatestArticle filter="most-liked" />
          },
          {
            path: 'favorites/',
            element:<UserFavorites />
          }
        ]
      },
      {
        path: 'notifications/',
        element:<PrivateRoutes><Notifications /></PrivateRoutes>,
      },
      {
        path: 'user/',
        element:<PrivateRoutes><User /></PrivateRoutes>,
      },
      {
        path: 'blog/create/',
        element:<PrivateRoutes><CreateBlog /></PrivateRoutes>,
      }
    ]
  },
  {
    path: 'login/',
    element:<Login />,
  },
  {
    path: 'register/',
    element:<Register />,
  },

]
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
