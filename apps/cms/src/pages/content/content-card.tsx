import React from 'react';
import { Database } from '@sport-stream/common/src/database.types';
import { Button, Image, Text, Title } from '@mantine/core';
import ReactPlayer from 'react-player/youtube'
import useFocus from './use-focus';
import { IconInfoCircle, IconPlayerPlayFilled } from '@tabler/icons-react';

type Content = Database['public']['Tables']['content']['Row'];

interface ContentCardProps {
  content: Partial<Content>;
  tabIndex?: number;
}

const ContentCard: React.FC<ContentCardProps> = (props) => {
  const [isFocused, bind] = useFocus();

  if (!props.content.video_url) return null;

  return (
    <div className='w-[320px]'>
      <div tabIndex={props.tabIndex} {...bind} className={`
       pos-relative rounded-2xl overflow-hidden w-[320px] h-[240px]
       ${isFocused ? 'outline outline-4 outline-primary-5' : ''}
      `} >
        <Image src={props.content.thumbnail_url} alt={props.content.title ?? ''}
          className='pos-absolute top-0 left-0 w-full h-full'
        />
        <div className={
          `pos-absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-[#00000080] to-transparent transition-all transition-ease-out duration-300
            ${isFocused ? 'opacity-100' : 'opacity-0'}
            flex items-center justify-center gap-2
            
          `}>
            <Button tabIndex={-1} variant='white' className='w-10 h-10 p-0'>
            <IconPlayerPlayFilled />
          </Button>
        </div>
          
        {/* <div>
          <ReactPlayer url={props.content.video_url} />
        </div> */}
      </div>
      <Title className='truncate mt-2' order={3}>{props.content.title}</Title>
      <Text className='opacity-30 line-height-tight'>{props.content.description}</Text>

    </div>
  );
};

export default ContentCard;

