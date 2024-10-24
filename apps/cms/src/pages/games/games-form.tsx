import React from 'react';
import { useForm } from '@mantine/form';
import { TextInput, NumberInput, Button, Select, Stack } from '@mantine/core';
import { useQuery_allTags } from '../../queries/tags/queries';
import { useMutation_insertGame, useMutation_updateGame } from '../../queries/game/mutations';
import { useQuery_getGameById } from '../../queries/game/queries';
import { Database } from '@sport-stream/common/src/database.types';
import { DateInput } from '@mantine/dates';

type Game = Database['public']['Tables']['games']['Row'];

interface GamesFormProps {
  gameId: number | null;
}

const GamesForm: React.FC<GamesFormProps> = ({ gameId }) => {
  const { data: game } = useQuery_getGameById(gameId);
  const { data: tags } = useQuery_allTags();
  const insertGame = useMutation_insertGame();
  const updateGame = useMutation_updateGame();

  const form = useForm<Game>({
    initialValues: {
      id: 0,
      created_at: new Date().toISOString(),
      game_date: null,
      league_tag_id: null,
      summary_video_url: null,
      team1_score: null,
      team1_tag_id: null,
      team2_score: null,
      team2_tag_id: null,
    },
  });

  React.useEffect(() => {
    if (game) {
      form.setValues(game);
    }
  }, [game]);

  const handleSubmit = (values: Game) => {
    if (gameId) {
      updateGame.mutate({ id: gameId, updates: values });
    } else {
      insertGame.mutate(values);
    }
  };

  const tagOptions = tags?.map(tag => ({ value: tag.id.toString(), label: tag.label || '' })) || [];

  return (
    <form onSubmit={form.onSubmit(handleSubmit)} className="space-y-4">
      <DateInput
        label="Game Date"
        placeholder="Select date"
        {...form.getInputProps('game_date')}
        className="w-full"
      />
      <Select
        label="League"
        placeholder="Select league"
        data={tagOptions}
        {...form.getInputProps('league_tag_id')}
        className="w-full"
      />
      <Stack>
        <Select
          label="Team 1"
          placeholder="Select team"
          data={tagOptions}
          {...form.getInputProps('team1_tag_id')}
        />
        <NumberInput
          label="Team 1 Score"
          placeholder="Enter score"
          {...form.getInputProps('team1_score')}
        />
      </Stack>
      <Stack>
        <Select
          label="Team 2"
          placeholder="Select team"
          data={tagOptions}
          {...form.getInputProps('team2_tag_id')}
        />
        <NumberInput
          label="Team 2 Score"
          placeholder="Enter score"
          {...form.getInputProps('team2_score')}
        />
      </Stack>
      <TextInput
        label="Summary Video URL"
        placeholder="Enter video URL"
        {...form.getInputProps('summary_video_url')}
        className="w-full"
      />
      <Button type="submit" className="w-full">
        {gameId ? 'Update Game' : 'Create Game'}
      </Button>
    </form>
  );
};

export default GamesForm;
