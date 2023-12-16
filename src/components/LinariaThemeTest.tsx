import { styled } from '@linaria/react';
import type { FC } from 'react';

const StyledDiv = styled.div`
  height: 10em;
  width: 10em;
  background-color: pink;
`;

export const LinariaThemeTest: FC = () => {
  return (
    <div>
      <StyledDiv />
    </div>
  );
};
