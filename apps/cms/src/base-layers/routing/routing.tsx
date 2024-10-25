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
    path: "/cms",
    element: <AppShellComponent />,
    children: [
      {
        path: "/cms",
        element: <BrowsePage />,
      },
      {
        path: "/cms/content/:id?",
        element: <ContentPage />,
      },
      {
        path: "/cms/tags/:id?",
        element: <TagsPage />,
      },
      {
        path: "/cms/games/:id?",
        element: <GamesPage />,
      },
      {
        path: "/cms/home-layout",
        element: <div>Settings</div>,
      },
    ],
  },
  {
    path: "/",
    element: <ViewerPage />,
  }
]);

const Routing: React.FC = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default Routing;


