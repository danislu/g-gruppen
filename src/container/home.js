import { connect } from 'react-redux';
import WalkerCalender from './../components/WalkerCalender';

const mapStateToProps = (state) => ({
    title: state.text
});

const mapDispToProps = (dispatch) => ({
    pingIt: () => dispatch({ type: 'ping' })
});

export default connect(mapStateToProps, mapDispToProps)(WalkerCalender);