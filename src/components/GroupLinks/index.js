import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import GroupLinks from './GroupLinks';
import { operations } from '../../state/ducks/app';
import withCurrentGroup from '../../container/withCurrentGroup';

const clickHandlerFactoryFactory = pusher => type => () => pusher(`/group/${type}`);

export default withCurrentGroup(connect(
  ({ app }, { currentGroup }) => ({
    id: app.selectedGroup,
    currentGroup
  }),
  (dispatch) => ({
    push: (path) => dispatch(push(path)),
    closeGroup: () => dispatch(operations.clearSelectedGroup()),
    doNew: () => dispatch(push('/create'))
   }),
  (stateProps, dispProps, ownProps) => {
    const createHandler = clickHandlerFactoryFactory(dispProps.push);
    return Object.assign(
      {},
      ownProps,
      stateProps,
      dispProps,
      ({
        doWalkerClick: createHandler('walker'),
        doKidClick: createHandler('kid'),
        doInfoClick: createHandler('')
      })
    );
  }
)(GroupLinks));
