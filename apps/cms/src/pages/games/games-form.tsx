import React from 'react';
import { useForm } from '@mantine/form';
import { TextInput, NumberInput, Button, Select, Stack, Group, Autocomplete, Text } from '@mantine/core';
import { useQuery_allTags, useQuery_getTagsByType } from '../../queries/tags/queries';
import { useMutation_insertGame, useMutation_updateGame } from '../../queries/game/mutations';
import { useQuery_getGameById } from '../../queries/game/queries';
import { Database } from '@sport-stream/common/src/database.types';
import { DateInput, DatePicker } from '@mantine/dates';

type Game = Database['public']['Tables']['games']['Row'];

interface GamesFormProps {
  gameId: number | null;
}

const GamesForm: React.FC<GamesFormProps> = ({ gameId }) => {
  const { data: game } = useQuery_getGameById(gameId);
  const { data: leagueTags } = useQuery_getTagsByType('LEAGUE');
  const { data: teamTags } = useQuery_getTagsByType('TEAM');
  const { data: sportTags } = useQuery_getTagsByType('SPORT');

  const insertGame = useMutation_insertGame();
  const updateGame = useMutation_updateGame();

  const form = useForm<Game>({
    initialValues: {
      id: 0,
      created_at: new Date().toISOString(),
      game_date: null,
      league_tag_id: null,
      sport_tag_id: null,
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

  const leagueTagOptions = leagueTags?.map(tag => ({ value: tag.id.toString(), label: tag.label || '' })) || [];
  const teamTagOptions = teamTags?.map(tag => ({ value: tag.id.toString(), label: tag.label || '' })) || [];
  const sportTagOptions = sportTags?.map(tag => ({ value: tag.id.toString(), label: tag.label || '' })) || [];

  return (
    <form onSubmit={form.onSubmit(handleSubmit)} className="space-y-4">
      <Group>
        <Stack className='flex-1'>
          <Autocomplete
            label="League"
            placeholder="Select league"
            data={leagueTagOptions}
            {...form.getInputProps('league_tag_id')}
            className="flex-1"
          />
          <Autocomplete
            label="Sport"
            placeholder="Select sport"
            data={sportTagOptions}
            {...form.getInputProps('sport_tag_id')}
            className="flex-1"
          />
                <Group>
        <Select
          label="Team 1"
          placeholder="Select team"
          className="flex-1"
          data={teamTagOptions}
          {...form.getInputProps('team1_tag_id')}
        />
        <NumberInput
          label="Team 1 Score"
          placeholder="Enter score"
          className="flex-1"
          {...form.getInputProps('team1_score')}
        />
      </Group>
      <Group>
        <Select
          label="Team 2"
          placeholder="Select team"
          className="flex-1"
          data={teamTagOptions}
          {...form.getInputProps('team2_tag_id')}
        />
        <NumberInput
          label="Team 2 Score"
          placeholder="Enter score"
          className="flex-1"
          {...form.getInputProps('team2_score')}
        />
      </Group>
        </Stack>
        <Stack>
          <Text size='sm' className='text-align-center'>Game Date</Text>
          <DatePicker h={300}
            {...form.getInputProps('game_date')}
          />
        </Stack>
      </Group>

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
