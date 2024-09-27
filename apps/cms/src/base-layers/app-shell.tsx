import React from 'react';
import { AppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import SidebarItem, { SidebarItemProps } from './routing/sidebar-item';
import { IconHash, IconLayout, IconVideo } from '@tabler/icons-react';
import { Outlet } from 'react-router-dom';

const sidebarItems: SidebarItemProps[] = [
  {
    path: '/content',
    label: 'Content',
    icon: <IconVideo />
  },
  {
    path: '/tags',
    label: 'Tags',
    icon: <IconHash />
  },
  {
    path: '/home-layout',
    label: 'Home Layout',
    disabled: true,
    icon: <IconLayout />
  }

];

const AppShellComponent: React.FC = () => {
  const [opened, { toggle }] = useDisclosure();
  return (
    
    <AppShell
      navbar={{ width: 240, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
    >

      <AppShell.Navbar p="md">
        <span className="text-xl font-700 text-primary rounded-md mb-4 flex items-center justify-center ">
          Sport Stream
        </span>
        {sidebarItems.map((item, index) => (
          <SidebarItem key={index} {...item} />
        ))}
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};

export default AppShellComponent;
