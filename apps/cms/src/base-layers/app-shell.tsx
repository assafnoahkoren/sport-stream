import React from 'react';
import { AppShell, Flex } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import SidebarItem, { SidebarItemProps } from './routing/sidebar-item';
import { IconHash, IconLayout, IconLayoutGrid, IconLayoutGridFilled, IconMenu2, IconVideo, IconX, IconGamepad } from '@tabler/icons-react';
import { Outlet } from 'react-router-dom';

const sidebarItems: SidebarItemProps[] = [
  {
    path: '/',
    label: 'Browse',
    icon: <IconLayoutGrid />
  },
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
    path: '/games',
    label: 'Games',
    icon: <IconGamepad />
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
      <Flex hiddenFrom='sm' className='fixed bottom-2 left-2 bg-primary-6 flex items-center justify-center p-2 rounded z-[9999]'
        onClick={toggle}>
        {opened ? <IconX /> : <IconMenu2 />}
      </Flex>
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
