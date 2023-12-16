import '@mantine/core/styles.css';
import { type FC, StrictMode } from 'react';
import { MantineProvider } from '@mantine/core';
import { theme } from './theme.js';
import { ThemeSwitcher } from '#/components/ThemeSwitcher.js';

interface Props {
  children: React.ReactNode;
}

export const Layout: FC<Props> = (props) => {
  return (
    <StrictMode>
      <MantineProvider theme={theme}>
        {props.children}
        <ThemeSwitcher />
      </MantineProvider>
    </StrictMode>
  );
};
