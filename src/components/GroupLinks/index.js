import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import GroupLinks from './GroupLinks';
import { operations } from '../../state/ducks/app';
import withCurrentGroup from '../../container/withCurrentGroup';
import pureify from '../../container/pureify';
import withRouterAndParamsAsProps from '../../container/withRouterAndParamsAsProps';
import { firebaseConnect, dataToJS } from 'react-redux-firebase';

const clickHandlerFactoryFactory = pusher => id => type => () => pusher(`/group/${id}/${type}`);

export default pureify(
  firebaseConnect([ '/groups' ]),
  withRouterAndParamsAsProps,
  connect(
    ({ firebase }, { id }) => {
      return ({
        currentGroup: dataToJS(firebase, `/groups/${id}`)
      });
    },
    (dispatch) => ({
      push: (path) => dispatch(push(path)),
      closeGroup: () => dispatch(operations.clearSelectedGroup()),
      doNew: () => dispatch(push('/create')),
      goHome: () => dispatch(operations.goHome1())
    }),
    (stateProps, dispProps, ownProps) => {
      const createHandler = clickHandlerFactoryFactory(dispProps.push)(ownProps.id);
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
