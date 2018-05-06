import { connect } from 'react-redux';
import DayEditor from './DayEditor';
import { operations } from './../../state/ducks/days'
import { firebaseConnect, dataToJS, populatedDataToJS, firebase } from 'react-redux-firebase';
import { getId } from './../../utils/dates';
import { sample } from 'rxjs/operators/sample';

const mapStateToProps = ({ days, firebase }) => {
    const day = days.selected;
    const a = populatedDataToJS(firebase, `days/${getId(day)}`, [{ child: 'walkers', root: 'users' }]);
    const walkers = a ? a.walkers : {};
    return {
        walkers: Object.values(walkers || {}),
        day
    };
};

const mapDispatchToProps = (dispatch, props) => ({
    onRegister: (day) => dispatch(operations.registerWalker(day)),
    onDeregister: (day) => dispatch(operations.deregisterWalker(day))
});

export default connect(mapStateToProps, mapDispatchToProps)(fbWrapped);