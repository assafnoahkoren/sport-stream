import React from 'react';
import { Database } from '@sport-stream/common/src/database.types';

type Game = Database['public']['Tables']['games']['Row'];

interface GameProps {
  game: Game;
  containerProps?: React.HTMLAttributes<HTMLDivElement>;
}

const Game: React.FC<GameProps> = ({ game, containerProps }) => {
  return (
    <div {...containerProps}>
      asd
    </div>
  );
};

export default Game;
