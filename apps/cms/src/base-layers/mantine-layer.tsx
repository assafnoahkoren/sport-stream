import React from 'react';
import { createTheme, MantineProvider } from '@mantine/core';

const theme = createTheme({
    colors: {
        dark: ['#C1C2C5', '#A6A7AB', '#909296', '#5C5F66', '#373A40', '#2C2E33', '#25262B', '#1A1B1E', '#141517', '#101113']
    },
    primaryColor: 'indigo'
});


interface MantineLayerProps {
    children: React.ReactNode;
}

const MantineLayer: React.FC<MantineLayerProps> = ({ children }) => {
    return (
        <MantineProvider theme={theme} forceColorScheme='dark'>
            {children}
        </MantineProvider>
    );
};

export default MantineLayer;
