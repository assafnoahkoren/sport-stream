import React from 'react';
import { useQuery_allContent } from '../../queries/content/queries';
import ContentCard from '../content/content-card';
import { ActionIcon, Button, Flex, Table, Title } from '@mantine/core';
import { IconEdit, IconPlus, IconTrash } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { useQuery_allTags } from '../../queries/tags/queries';
import TagButton from '../tags/tag-button';

interface BrowsePageProps {}

const BrowsePage: React.FC<BrowsePageProps> = (props) => {
  const { data } = useQuery_allContent();
  const navigate = useNavigate();
  const allTagsQuery = useQuery_allTags();
  const tags = allTagsQuery.data || [];
  return (
    
    <div>
      <Flex gap={10} className='mb-2'>
        <Title order={2}>Browse</Title>
        <Button variant='filled' onClick={() => navigate('/content')}>
          <IconPlus />
          Create
        </Button>
      </Flex>
      <Flex gap={4} className='mb-6' align='center'>
        <Title order={4} className='me-2'>Tags:</Title>
        {tags.map((tag, index) => (
          <TagButton tag={tag} />
        ))}

      </Flex>
      <Flex gap={30}>
        {data?.map((content) => (
          <Flex direction='column' className='relative'>
            <Flex gap={5} className='mb-2 position-absolute z-12 left-2 top-2'>
              <ActionIcon variant='filled' onClick={() => navigate(`/content/${content.id}`)}>
                <IconEdit />
              </ActionIcon>
            </Flex>
            <ContentCard tabIndex={0} content={content} key={content.id} />
          </Flex>
        ))}
      </Flex>

    </div>
  );
};

export default BrowsePage;
