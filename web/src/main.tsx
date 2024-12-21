import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { MantineProvider } from '@mantine/core';
import { VisibilityProvider } from './Providers/VisibilityProvider';
import { Admin } from './Components/Admin';
import { Vote } from './Components/Vote';
import { Results } from './Components/Results';
import './index.css'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <MantineProvider theme={{ colorScheme: 'dark' }}>
            <VisibilityProvider component='Admin'>
                <Admin />
            </VisibilityProvider>
            <VisibilityProvider component='Vote'>
                <Vote />
            </VisibilityProvider>
            <VisibilityProvider component='Results'>
                <Results />
            </VisibilityProvider>
        </MantineProvider>
    </StrictMode>
);