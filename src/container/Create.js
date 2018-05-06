import { connect } from 'react-redux';
import Create from './../components/Create';
import { operations } from './../state/ducks/days';

const createInitialValues = () => {
  return {
    name: new Date().getTime(),
    description: 'beskrivelse',
    monday: true,
    tuesday: true,
    wednesday: true,
    thursday: true,
    friday: true,
    saturday: false,
    sunday: false,
    inviteOnly: true,
    time: new Date(),
    requiredCount: 1
  };
};

export default connect(
  () => ({
    initialValues: createInitialValues()
  }),
  dispatch => ({
    onSubmit: data => dispatch(operations.createGroup(data))
  })
)(Create);
