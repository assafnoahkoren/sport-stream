import { Button, Flex, NumberInput, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { Database } from '@sport-stream/common/src/database.types';
import React, { useEffect } from 'react';
import { useMutation_upsertContent } from '../../queries/content/mutations';
import { useNavigate } from 'react-router-dom';
import { IconEraser, IconPencil, IconPlus } from '@tabler/icons-react';
import ContentCard from './content-card';
import { useDebouncedValue } from '@mantine/hooks';
import { fetchYoutubeMetadata } from './fetch-youtube-metadata';
import { useQuery_getContentById } from '../../queries/content/queries';

type Content = Database['public']['Tables']['content']['Insert'];

interface ContentFormProps {
  contentId?: number | null;
}

const ContentForm: React.FC<ContentFormProps> = (props) => {

  const isEditMode = !!props.contentId;
  const { data } = useQuery_getContentById(props.contentId);

  const navigate = useNavigate();
  const upsertContentMutation = useMutation_upsertContent(
    (data) => {
      const { id } = data[0];
      navigate(`/content/${id}`);
    }
  );

  const form = useForm<Content>({
    mode: 'controlled',
    initialValues: data || {},
  });

  const [debouncedVideoUrl] = useDebouncedValue(form.values.video_url, 200);

  useEffect(() => {
    if (debouncedVideoUrl) {
      fetchYoutubeMetadata(debouncedVideoUrl).then((data) => {
        if (data) {
          form.setFieldValue('title', data.title);
          form.setFieldValue('thumbnail_url', data.thumbnail_url);
        }
      });
    }
  }, [debouncedVideoUrl]);

  useEffect(() => {
    if (data) {
      form.setValues(data);
    }
  }, [data]);


  const handleSubmit = (values: Content) => {
    upsertContentMutation.mutate(values);
  };

  const resetForm = () => {
    form.setValues(data || {});
  };


  return (
    <div>

      <form onSubmit={form.onSubmit(handleSubmit)} className='flex flex-col gap-4 mb-12'>
        <TextInput label="Title" {...form.getInputProps('title')} />
        <TextInput label="Description" {...form.getInputProps('description')} />
        <TextInput label="Video URL" {...form.getInputProps('video_url')} />
        <TextInput label="Thumbnail URL" {...form.getInputProps('thumbnail_url')} />
        <div className='flex mt-8 gap-4'>
          <Button variant='filled' type="submit" className='flex-1'
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
          <Button color='red' variant='outline' type="button" className='w-min'
            onClick={resetForm}>
            <div className='flex items-center gap-2'>
              <IconEraser />
              Reset
            </div>
          </Button>
        </div>
      </form>
      <Title order={2} className='mb-10'>
        Preview
      </Title>
      <ContentCard content={form.values} tabIndex={0} />

    </div>

  );
};

export default ContentForm;
