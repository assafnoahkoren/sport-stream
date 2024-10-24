import React from 'react';
import { useParams } from 'react-router-dom';
import { Text } from '@mantine/core';

interface GamesPageProps {}

const GamesPage: React.FC<GamesPageProps> = () => {
  const { id: idStr } = useParams<{ id: string }>();
  const id = idStr ? parseInt(idStr, 10) : null;
  const isEditMode = !!id;

  return (
    <div className='flex flex-col gap-4'>
      <Text>
        {isEditMode ? 'Edit Game' : 'Create New Game'}
      </Text>
      {/* TODO: Implement GamesForm component */}
    </div>
  );
};

export default GamesPage;
