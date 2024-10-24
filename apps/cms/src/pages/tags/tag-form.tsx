import { Button, ColorInput, Flex, NumberInput, Select, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { Database } from '@sport-stream/common/src/database.types';
import React, { useEffect } from 'react';
import { useMutation_upsertTag } from '../../queries/tags/mutations';
import { useNavigate } from 'react-router-dom';
import { IconEraser, IconPencil, IconPlus } from '@tabler/icons-react';
import { useQuery_getTagById } from '../../queries/tags/queries';
import TagButton from './tag-button';

type Tag = Database['public']['Tables']['tags']['Insert'];

interface TagFormProps {
  tagId?: number | null;
}

const TagForm: React.FC<TagFormProps> = (props) => {

  const isEditMode = !!props.tagId;
  const { data } = useQuery_getTagById(props.tagId);

  const navigate = useNavigate();
  const upsertTagMutation = useMutation_upsertTag(
    (data) => {
      const { id } = data[0];
      navigate(`/tags/${id}`);
    }
  );

  const form = useForm<Tag>({
    mode: 'controlled',
    initialValues: data || {},
  });

  useEffect(() => {
    if (data) {
      if (!data.color_1) {
        data.color_1 = '';
      }
      if (!data.color_2) {
        data.color_2 = '';
      }
      form.setValues(data);
    }
  }, [data]);

  const handleSubmit = (values: Tag) => {
    upsertTagMutation.mutate(values);
  };

  const resetForm = () => {
    form.setValues(data || {});
  };


  return (
    <div>
      <form onSubmit={form.onSubmit(handleSubmit)} className='flex flex-col gap-4 mb-12'>
        <TextInput label="Label" {...form.getInputProps('label')} />
        <Flex gap={16}>
          <ColorInput flex={1} label="Color 1" {...form.getInputProps('color_1')} />
          <ColorInput flex={1} label="Color 2" {...form.getInputProps('color_2')} />
        </Flex>
        <TextInput label="Thumbnail" {...form.getInputProps('thumbnail_url')} />
        <TextInput label="Icon" {...form.getInputProps('icon_url')} />
        <Select
          label="Type"
          placeholder="Pick value"
          data={[
            { value: 'PERSONA', label: 'Persona' },
            { value: 'TEAM', label: 'Team' },
            { value: 'SPORT', label: 'Sport' },
            { value: 'LEAGUE', label: 'League' },
            { value: 'COMPETITION', label: 'Competition' },
            { value: 'SEASON', label: 'Season' },
          ]}
          {...form.getInputProps('type')}
        />
        <div className='flex mt-8 gap-4'>
          <Button variant='filled' type="submit" className='flex-1'
            loading={upsertTagMutation.isPending}>
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
      <div>
        <TagButton tag={form.values} />
      </div>
    </div>
  );
};

export default TagForm;
