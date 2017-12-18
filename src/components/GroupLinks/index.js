import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import GroupLinks from './GroupLinks';
import { operations } from '../../state/ducks/app';
import withCurrentGroup from '../../container/withCurrentGroup';
import pureify from '../../container/pureify';

const clickHandlerFactoryFactory = pusher => type => () => pusher(`/group/${type}`);

export default pureify(
  withCurrentGroup,
  connect(
    ({ app }, { currentGroup }) => ({
      id: app.selectedGroup,
      currentGroup
    }),
    (dispatch) => ({
      push: (path) => dispatch(push(path)),
      closeGroup: () => dispatch(operations.clearSelectedGroup()),
      doNew: () => dispatch(push('/create')),
      goHome: () => dispatch(operations.goHome1())
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
  )
)(GroupLinks);
