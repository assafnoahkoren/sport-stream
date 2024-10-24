import React from 'react';
import { useParams } from 'react-router-dom';
import { Text } from '@mantine/core';
import GamesForm from './games-form';

interface GamesPageProps {}

const GamesPage: React.FC<GamesPageProps> = () => {
  const { id: idStr } = useParams<{ id: string }>();
  const id = idStr ? parseInt(idStr, 10) : null;
  const isEditMode = !!id;

  return (
    <div className='flex flex-col gap-4'>
      <Text size="xl" weight={700} className="mb-4">
        {isEditMode ? 'Edit Game' : 'Create New Game'}
      </Text>
      <GamesForm gameId={id} />
    </div>
  );
};

export default GamesPage;
