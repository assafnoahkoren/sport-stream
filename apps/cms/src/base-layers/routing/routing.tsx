import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import AppShellComponent from '../app-shell';
import BrowsePage from '../../pages/browse/browse-page';
import ContentPage from '../../pages/content/content-page';
import TagsPage from '../../pages/tags/tags-page';
import GamesPage from '../../pages/games/games-page';
import ViewerPage from '../../pages/viewer/viewer-page';

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
        path: "/content/:id?",
        element: <ContentPage />,
      },
      {
        path: "/tags/:id?",
        element: <TagsPage />,
      },
      {
        path: "/games/:id?",
        element: <GamesPage />,
      },
      {
        path: "/home-layout",
        element: <div>Settings</div>,
      },
    ],
  },
  {
    path: "viewer",
    element: <ViewerPage />,
  }
]);

const Routing: React.FC = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default Routing;


