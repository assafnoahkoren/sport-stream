import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery_getContentById } from '../../queries/content/queries';
import ContentForm from './content-form';

interface ContentPageProps {}

const ContentPage: React.FC<ContentPageProps> = (props) => {
  const { id: idStr } = useParams<{ id: string }>();
  const id = idStr ? parseInt(idStr, 10) : null;
  const isEditMode = !!id;

  return (
    <div className='flex flex-col gap-4'>
      <div>
        {isEditMode ? (
          <div>Edit Mode</div>
        ) : (
          <div>Create Mode</div>
        )}
      </div>
      <ContentForm contentId={id} />

    </div>
  );
};

export default ContentPage;


