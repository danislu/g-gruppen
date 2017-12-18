import { compose } from 'redux';
import { pure } from 'recompose';

export default (...parts) => compose(
  ...parts,
  pure
);