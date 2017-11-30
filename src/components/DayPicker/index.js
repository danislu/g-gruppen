import { connect } from 'react-redux';
import DayPicker from './DayPicker';
import { operations } from './../../state/ducks/days';
import { firebaseConnect, populatedDataToJS } from 'react-redux-firebase';
import withCurrentGroup from './../../container/withCurrentGroup';

const fbWrapped = firebaseConnect([ '/groups', 'users' ])(DayPicker);

const mapStateToProps = ({ days, firebase }, { id }) => {
    const groups = populatedDataToJS(firebase, 'groups', [{ child: 'walkers', root: 'users' }]) || {};
    const datadays = groups.days;
    return {
        selectedDay: days.selected,
        dayList: datadays || [],
    };
};

const mapDispatchToProps = (dispatch) => ({
    onDayClick: (day) => dispatch(operations.selectDay(day))
});

export default withCurrentGroup(connect(mapStateToProps, mapDispatchToProps)(fbWrapped));