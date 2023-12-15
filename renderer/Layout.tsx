import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { theme } from './theme.js';
import { StrictMode, type FC } from 'react';

interface Props {
  children: React.ReactNode;
}

export const Layout: FC<Props> = (props) => {
  return (
    <StrictMode>
      <MantineProvider theme={theme}>{props.children}</MantineProvider>
    </StrictMode>
  );
};
