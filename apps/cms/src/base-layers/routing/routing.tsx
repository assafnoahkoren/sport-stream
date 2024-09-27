import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import AppShellComponent from '../app-shell';

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppShellComponent />,
    children: [
      {
        path: "/content",
        element: <div>Home</div>,
      },
      {
        path: "/tags",
        element: <div>Create</div>,
      },
      {
        path: "/home-layout",
        element: <div>Settings</div>,
      },
    ],
  },
]);

const Routing: React.FC = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default Routing;


