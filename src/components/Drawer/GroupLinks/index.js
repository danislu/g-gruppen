import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import GroupLinks from './GroupLinks';
import { operations } from './../../../state/ducks/app';
import withCurrentGroup from './../../../container/withCurrentGroup';
import pureify from './../../../container/pureify';
import withRouterAndParamsAsProps from './../../../container/withRouterAndParamsAsProps';

const clickHandlerFactoryFactory = pusher => id => type => () => pusher(`/group/${id}/${type}`);

export default pureify(
  withRouterAndParamsAsProps,
  connect(
    ({ firebase: { data: { groups }}}, { id }) => ({
      currentGroup: groups ? groups[id] : null
    }),
    (dispatch) => ({
      push: (path) => dispatch(push(path)),
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
