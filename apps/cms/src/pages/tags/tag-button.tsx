import React from 'react';
import { Button, ButtonProps, Flex, Image, Text } from '@mantine/core';
import { Database } from '@sport-stream/common/src/database.types';
import { IconHash } from '@tabler/icons-react';

type Tag = Database['public']['Tables']['tags']['Row'];

interface TagButtonProps extends ButtonProps {
  tag: Partial<Tag>;
}

const TagButton: React.FC<TagButtonProps> = ({ tag, ...props }) => {

  return (
    <Button
      {...props}
      radius='xl'
      size='sm'
      className='px-3 h-8'
      variant='transparent'
      style={{
        color: `${tag.color_1}`,
        backgroundColor: `${tag.color_2}`,
      }}
    >
      <Flex align='center'>
        <IconHash size={20} />
        <Text size='sm' className='top-[1px] relative'>{tag.label}</Text>
        {tag.icon_url && <Image src={tag.icon_url} width={20} height={20} className='ms-1' />} 
      </Flex>
    </Button>
  );
};

export default TagButton;

