import { Container, CssBaseline } from '@mui/material';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root') as HTMLElement;
const root = createRoot(rootElement);

root.render(
    <StrictMode>
        <CssBaseline />
        <Container maxWidth={false} disableGutters>
            <App />
        </Container>
    </StrictMode>
);
