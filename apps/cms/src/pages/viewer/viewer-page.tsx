import { Button, Group, Space, Stack, TextInput, Title } from "@mantine/core";
import { IconBallAmericanFootball, IconBallBaseball, IconBallBasketball, IconBallFootball, IconSettings, IconUser, IconUserCircle } from "@tabler/icons-react";
import React from "react";
import { useQuery_getAllGame } from "../../queries/game/queries";
import GameCard from "../games/game-card";


interface ViewerPageProps { }

const ViewerPage: React.FC<ViewerPageProps> = (props) => {
  const { data: games, isLoading, error } = useQuery_getAllGame();

  return (
    <>
      <Stack>
        <Group className="p-4 pb-0 w-full justify-between">
          <Button variant="subtle" color="white" className="px-2"><IconUserCircle className="opacity-50" /></Button>
          <Group>
            <Button size="lg" variant="subtle" color="white" leftSection={<IconBallFootball />}> Soccer </Button>
            <Button size="lg" variant="subtle" color="white" leftSection={<IconBallBasketball />}>Basketball</Button>
            <Button size="lg" variant="subtle" color="white" leftSection={<IconBallAmericanFootball />}>Football</Button>
            <Button size="lg" variant="subtle" color="white" leftSection={<IconBallBaseball />}>Baseball</Button>
          </Group>
          <Button variant="subtle" color="white" className="px-2"><IconSettings className="opacity-50" /></Button>
        </Group>
        <Group className="w-full justify-center">
          <TextInput size="md" className="w-1/4" classNames={{ input: 'border-0' }} radius="xl" placeholder="Search" />
        </Group>
      </Stack>
      <Space h={10} />
      <Stack className="overflow-y-visible">
        <Title order={2} className="px-8">Latest </Title>
        <Group wrap="nowrap" className="overflow-x-auto overflow-y-visible scrollbar-hide">
          <Space w={10} />
          {games?.map((game) => (
            <GameCard containerProps={{ className: 'flex-shrink-0' }} key={game.id} game={game} />
          ))}
          {games?.map((game) => (
            <GameCard containerProps={{ className: 'flex-shrink-0' }} key={game.id} game={game} />
          ))}
          {games?.map((game) => (
            <GameCard containerProps={{ className: 'flex-shrink-0' }} key={game.id} game={game} />
          ))}
          {games?.map((game) => (
            <GameCard containerProps={{ className: 'flex-shrink-0' }} key={game.id} game={game} />
          ))}
          {games?.map((game) => (
            <GameCard containerProps={{ className: 'flex-shrink-0' }} key={game.id} game={game} />
          ))}
          {games?.map((game) => (
            <GameCard containerProps={{ className: 'flex-shrink-0' }} key={game.id} game={game} />
          ))}
        </Group>
      </Stack>
    </>
  );
};

export default ViewerPage;
