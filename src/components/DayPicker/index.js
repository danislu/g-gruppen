import { connect } from 'react-redux';
import DayPicker from './DayPicker';
import { operations } from './../../state/ducks/days';
import { firebaseConnect, populatedDataToJS } from 'react-redux-firebase';

const fbWrapped = firebaseConnect([ '/days', 'users' ])(DayPicker);

const mapStateToProps = ({ days, firebase }) => {
    const datadays = populatedDataToJS(firebase, 'days', [{ child: 'walkers', root: 'users' }]);
    return {
        selectedDay: days.selected,
        dayList: datadays || [],
    };
};

const mapDispatchToProps = (dispatch) => ({
    onDayClick: (day) => dispatch(operations.selectDay(day))
});

export default connect(mapStateToProps, mapDispatchToProps)(fbWrapped);