import { Button, Group, useMantineColorScheme } from '@mantine/core';
import type { FC } from 'react';

export const ThemeSwitcher: FC = () => {
  const { setColorScheme } = useMantineColorScheme();
  return (
    <Group justify="center" mt="xl">
      <Button onClick={() => setColorScheme('light')}>Light</Button>
      <Button onClick={() => setColorScheme('dark')}>Dark</Button>
      <Button onClick={() => setColorScheme('auto')}>Auto</Button>
    </Group>
  );
};
