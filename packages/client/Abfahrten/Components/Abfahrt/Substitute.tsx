import useStyles from './Substitue.style';
import type { SubstituteRef } from 'types/iris';

interface Props {
  substitute: SubstituteRef;
}

const Substitute = ({ substitute }: Props) => {
  const classes = useStyles();

  return (
    <>
      <span className={classes.main}>Ersatzzug für</span>
      <span className={classes.main}>{substitute.train}</span>
    </>
  );
};

export default Substitute;