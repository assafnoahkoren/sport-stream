import React from 'react';
import { Database } from '@sport-stream/common/src/database.types';

type Game = Database['public']['Tables']['games']['Row'];

interface GameCardProps {
  game: Game;
  containerProps?: React.HTMLAttributes<HTMLDivElement>;
}

const GameCard: React.FC<GameCardProps> = ({ game, containerProps }) => {
  return (
    <div {...containerProps}>
      asd
    </div>
  );
};

export default GameCard;
