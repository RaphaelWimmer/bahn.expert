import { LinariaThemeTest } from '#/components/LinariaThemeTest.js';
import { NewHint } from '#/components/NewHint.js';
import type { FC } from 'react';

const Page: FC = () => (
  <div>
    <NewHint />
    <LinariaThemeTest />
  </div>
);

export default Page;
