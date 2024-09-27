import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@mantine/core';

export interface SidebarItemProps {
  path: string;
  label: React.ReactNode;
  icon: React.ReactNode;
  disabled?: boolean;
}
const SidebarItem: React.FC<SidebarItemProps> = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = location.pathname === props.path;
  const handleClick = () => {
    if (isActive) { return; }
    navigate(props.path);
  };

  return (
    <Button 
      onClick={handleClick}
      disabled={props.disabled}
      className={`
        flex items-center gap-2 p-2 rounded-md
        ${props.disabled ? '' : 'hover:bg-primary'}
        ${isActive ? 'border-primary-1' : ''}
      `}
    >
      {props.icon}
      &nbsp;&nbsp;
      {props.label}
    </Button>
  );
};

export default SidebarItem;
