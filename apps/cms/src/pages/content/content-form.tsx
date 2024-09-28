import { Button, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { Database } from '@sport-stream/common/src/database.types';
import React from 'react';
import { useMutation_upsertContent } from '../../queries/content/mutations';
import { useNavigate } from 'react-router-dom';
import { IconPencil, IconPlus } from '@tabler/icons-react';

type Content = Database['public']['Tables']['content']['Insert'];

interface ContentFormProps {
  contentId?: number | null;
  content?: Content | null;
}

const ContentForm: React.FC<ContentFormProps> = (props) => {
  const isEditMode = !!props.contentId;
  const navigate = useNavigate();
  const upsertContentMutation = useMutation_upsertContent(
    (data) => {
      const { id } = data[0];
      navigate(`/content/${id}`);
    }
  );

  const form = useForm<Content>({
    mode: 'uncontrolled',
    initialValues: props.content || {},
  });

  const handleSubmit = (values: Content) => {
    upsertContentMutation.mutate(values);
  };


  return (
    <form onSubmit={form.onSubmit(handleSubmit)} className='flex flex-col gap-4'>
      <TextInput label="Title" {...form.getInputProps('title')} />
      <TextInput label="Description" {...form.getInputProps('description')} />
      <TextInput label="Video URL" {...form.getInputProps('video_url')} />
      <TextInput label="Thumbnail URL" {...form.getInputProps('thumbnail_url')} />
      <TextInput label="Duration" {...form.getInputProps('duration')} />
      <Button variant='filled' type="submit" fullWidth className='mt-8'
        loading={upsertContentMutation.isPending}>
        {
          isEditMode ?
            <div className='flex items-center gap-2'>
              <IconPencil />
              Update
            </div> :
            <div className='flex items-center gap-2'>
              <IconPlus />
              Create
            </div>
        }
      </Button>
    </form>
  );
};

export default ContentForm;
