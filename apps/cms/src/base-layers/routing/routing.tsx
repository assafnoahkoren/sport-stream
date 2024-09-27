import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import AppShellComponent from '../app-shell';
import BrowsePage from '../../pages/browse/browse-page';
import ContentPage from '../../pages/content/content-page';
import TagsPage from '../../pages/tags/tags-page';

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppShellComponent />,
    children: [
      {
        path: "/",
        element: <BrowsePage />,
      },
      {
        path: "/content",
        element: <ContentPage />,
      },
      {
        path: "/tags",
        element: <TagsPage />,
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


