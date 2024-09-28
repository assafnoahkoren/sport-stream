import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TagForm from './tag-form';
import { Button, Flex, Title } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';

interface TagsPageProps { }

const TagsPage: React.FC<TagsPageProps> = (props) => {
  const { id: idStr } = useParams<{ id: string }>();
  const id = idStr ? parseInt(idStr, 10) : null;
  const isEditMode = !!id;
  const navigate = useNavigate();
  return (
    <div className='flex flex-col gap-4'>
      <Flex gap={10} className='mb-2'>
        <Title order={2}>
          {isEditMode ? (
            <div>Edit Mode</div>
          ) : (
            <div>Create Mode</div>
          )}
        </Title>
        <Button variant='filled' onClick={() => navigate('/tags')}>
          <IconPlus />
          Create
        </Button>
      </Flex>
      <TagForm tagId={id} />
    </div>
  );
};

export default TagsPage;
