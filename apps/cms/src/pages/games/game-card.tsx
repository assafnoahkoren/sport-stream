import React, { useEffect } from 'react';
import { Database } from '@sport-stream/common/src/database.types';
import { Button, Group, Image, Stack, Text, Title } from '@mantine/core';
import { IconEye, IconPlayerPlay, IconPlayerPlayFilled, IconQuestionMark, IconShield, IconShieldFilled } from '@tabler/icons-react';
import { useQuery_getTagById } from '../../queries/tags/queries';
import { formatDistance } from 'date-fns'
import { ConfettiService } from './confetti-service';

type Game = Database['public']['Tables']['games']['Row'];

interface GameCardProps {
  game: Game;
  containerProps?: React.HTMLAttributes<HTMLDivElement>;
}

interface TeamScoreProps {
  score?: number | null;
  team?: string | null;
  imageUrl?: string | null;
}

const TeamScore: React.FC<TeamScoreProps> = (props) => {
  return (
    <Stack align="center" className='flex-[2]'>
      {props.imageUrl ? <Image src={props.imageUrl} alt={props.team ?? ''} fit='contain' className='h-[40px] w-[40px]' /> : <IconShieldFilled size={40} />}
      <Text>{props.team ?? '-'}</Text>
      {props.score ? <Title>{props.score}</Title> : <IconQuestionMark size={40} />}
    </Stack>
  )
};


const GameCard: React.FC<GameCardProps> = ({ game, containerProps }) => {
  const { data: league } = useQuery_getTagById(game.league_tag_id);
  const { data: team1 } = useQuery_getTagById(game.team1_tag_id);
  const { data: team2 } = useQuery_getTagById(game.team2_tag_id);

  useEffect(() => {
    if (!team1?.color_1 || !team1?.color_2) return;
    ConfettiService.snow(`game-card-background-${game.id}`, {
      position: {
        y: -25,
        x: 25,
      },
      colors: [team1?.color_1, team1?.color_2],
    });
  }, [team1?.color_1, team1?.color_2]);

  useEffect(() => {
    if (!team2?.color_1 || !team2?.color_2) return;
    ConfettiService.snow(`game-card-background-${game.id}`, {
      position: {
        y: -25,
        x: 75,
      },
      colors: [team2?.color_1, team2?.color_2],
    });
  }, [team2?.color_1, team2?.color_2]);

  let daysAgo = null;
  if (game.game_date) {
    daysAgo = formatDistance(new Date(game.game_date), new Date(), { addSuffix: true });
    daysAgo = daysAgo.replace('about ', '');
  }

  return (
    <Stack>

      <Group {...containerProps} className={`${containerProps?.className} w-md bg-[#1E1F22] p-4 gap-1 rounded-3xl relative`} align='top'>
        <canvas id={`game-card-background-${game.id}`} className='opacity-50 inset-0 absolute w-full h-full overflow-hidden rounded-3xl' />
        <div className='absolute w-full h-full inset-0 overflow-hidden rounded-3xl opacity-50'>
          <RadialColor className='absolute w-[200px] h-[200px] -top-[20px] -left-[70px]' color={team1?.color_1 + '22'} />
          <RadialColor className='absolute w-[100px] h-[100px] top-[70px] left-[20px]' color={team1?.color_2 + '22'} />
          <RadialColor className='absolute w-[200px] h-[200px] -top-[20px] -right-[70px]' color={team2?.color_1 + '22'} />
          <RadialColor className='absolute w-[100px] h-[100px] top-[70px] right-[20px]' color={team2?.color_2 + '22'} />
        </div>
        <TeamScore team={team1?.label} imageUrl={team1?.icon_url} score={game.team1_score} />
        <Stack className='flex-1 h-full gap-2' align='center'>
          <Title order={3}>VS</Title>
          <Button variant='outline' color='gray' size='xs' className='px-3'>
            <IconPlayerPlayFilled className='me-1 -ms-1' size={16} />
            Watch
          </Button>
          <Text size='xs' opacity={0.5}>
            {daysAgo}
          </Text>

        </Stack>
        <TeamScore team={team2?.label} imageUrl={team2?.icon_url} score={game.team2_score} />
      </Group>
      <Stack justify='center' align='center' className='w-full -mt-[62px] z-10' gap={5}>
        <Text className='bottom-full' size='xs'>{league?.label}</Text>
        <img className='rounded-full border bg-[#353639] p-1'
          width={50} height={50} src={league?.icon_url as any} alt={league?.label ?? ''} />
      </Stack>
    </Stack>
  );
};

interface RadialColorProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: string;
}

const RadialColor: React.FC<RadialColorProps> = (props) => {
  return (
    <div style={{ background: `radial-gradient(circle, ${props.color} 0%, rgba(0,0,0,0) 70%)` }}
      {...props} className={`absolute pointer-events-none ${props.className}`} >
    </div>
  );
};


export default GameCard;
