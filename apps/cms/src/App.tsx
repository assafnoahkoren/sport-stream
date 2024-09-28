import '@mantine/core/styles.css';
import MantineLayer from "./base-layers/mantine-layer";
import Routing from "./base-layers/routing/routing";
import { useEffect } from 'react';
import supabase from './queries/supabase';
import { Database } from '@sport-stream/common/src/database.types';
const x: Database = {} as any;
console.log(x);

function App() {
  useEffect(() => {
    supabase.from('tags').select('*').then(({ data, error }) => {
      console.log(data);
    })
  }, [])
  return (
    <MantineLayer >
      <Routing />
    </MantineLayer>
  )
}

export default App
