import { Button, Direction, Group, Space, Stack, TextInput, Title } from "@mantine/core";
import { IconBallAmericanFootball, IconBallBaseball, IconBallBasketball, IconBallFootball, IconSettings, IconUser, IconUserCircle } from "@tabler/icons-react";
import React, { useEffect } from "react";
import { useQuery_getAllGame } from "../../queries/game/queries";
import GameCard from "../games/game-card";
import { ArrowNavigationEvents, getArrowNavigation } from "@arrow-navigation/core";


interface ViewerPageProps { }

const ViewerPage: React.FC<ViewerPageProps> = (props) => {
  let { data: games, isLoading, error } = useQuery_getAllGame();

  if (games && games[0]) {
    games = [games[0], games[0], games[0], games[0], games[0], games[0], games[0]]
  }

  useEffect(() => {
    const navigationApi = getArrowNavigation()

    navigationApi.registerGroup('sport-buttons-group', { firstElement: 'soccer-button' })
    navigationApi.unregisterElement('soccer-button')
    navigationApi.registerElement('soccer-button', 'sport-buttons-group')
    navigationApi.unregisterElement('basketball-button')  
    navigationApi.registerElement('basketball-button', 'sport-buttons-group')
    navigationApi.unregisterElement('football-button')
    navigationApi.registerElement('football-button', 'sport-buttons-group')
    navigationApi.unregisterElement('baseball-button')
    navigationApi.registerElement('baseball-button', 'sport-buttons-group')
    navigationApi.unregisterElement('settings-button')
    navigationApi.registerElement('settings-button', 'sport-buttons-group')
    
    navigationApi.unregisterElement('user-button')
    navigationApi.registerElement('user-button', 'sport-buttons-group')

    navigationApi.registerGroup('group-0')
    navigationApi.registerGroup('group-1')
    navigationApi.registerGroup('search-group')
    navigationApi.unregisterElement('search-input')
    navigationApi.registerElement('search-input', 'search-group')
    navigationApi.on(ArrowNavigationEvents.CURRENT_ELEMENT_CHANGE, (event: { current: { group: string, id: string, _ref: any }, prev: { group: string, id: string, _ref: any }, direction: string }) => {
      if (event.current.group === 'group-0' || event.current.group === 'group-1') {
        setTimeout(() => {
          event.current._ref.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
        }, 5)
      }
      console.log('Current element changed', event)
      if (event.direction === 'down') {
        if (event.prev.id === 'settings-button' || event.prev.id === 'user-button') {
          navigationApi.setFocusElement('game-0-0')
        }
      }
    })

  }, [])

  return (
    <>
      <Stack>
        <Group id="sport-buttons-group" className="p-4 pb-0 w-full justify-between">
          <Button id="user-button" variant="subtle" color="white" className="px-2"><IconUserCircle className="opacity-50" /></Button>
          <Group tabIndex={1}>
            <Button id="soccer-button" size="lg" variant="subtle" color="white" leftSection={<IconBallFootball />}> Soccer </Button>
            <Button id="basketball-button" size="lg" variant="subtle" color="white" leftSection={<IconBallBasketball />}>Basketball</Button>
            <Button id="football-button" size="lg" variant="subtle" color="white" leftSection={<IconBallAmericanFootball />}>Football</Button>
            <Button id="baseball-button" size="lg" variant="subtle" color="white" leftSection={<IconBallBaseball />}>Baseball</Button>
          </Group>
          <Button id="settings-button" variant="subtle" color="white" className="px-2"><IconSettings className="opacity-50" /></Button>
        </Group>
        <Group id="search-group" className="w-full justify-center">
          <TextInput id="search-input" size="md" className="w-1/4" classNames={{ input: 'border-0' }} radius="xl" placeholder="Search" />
        </Group>
      </Stack>
      <Space h={10} />
      <Stack className="overflow-y-visible">
        <Title order={2} className="px-8">Latest </Title>
        <Group id="group-0" wrap="nowrap" className="overflow-x-auto overflow-y-visible scrollbar-hide" tabIndex={1}>
          <Space w={10} />
          {games?.map((game, index) => {
            const id = `game-0-${index}`
            setTimeout(() => {
              const navigationApi = getArrowNavigation()
              navigationApi.unregisterElement(id)
              navigationApi.registerElement(id, 'group-0')
            }, 200)
            return <GameCard id={id} containerProps={{ className: 'flex-shrink-0' }} key={game.id} game={game} />
          })}
        </Group>
      </Stack>
      <Space h={20} />
      <Stack className="overflow-y-visible">
        <Title order={2} className="px-8">Latest </Title>
        <Group id="group-1" wrap="nowrap" className="overflow-x-auto overflow-y-visible scrollbar-hide" tabIndex={1}>
          <Space w={10} />
          {games?.map((game, index) => {
            const id = `game-1-${index}`
            setTimeout(() => {
              const navigationApi = getArrowNavigation()
              navigationApi.unregisterElement(id)
              navigationApi.registerElement(id, 'group-1')
            }, 200)
            return <GameCard id={id} containerProps={{ className: 'flex-shrink-0' }} key={game.id} game={game} />
          })}
        </Group>
      </Stack>
    </>
  );
};

export default ViewerPage;
