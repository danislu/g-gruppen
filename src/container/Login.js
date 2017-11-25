import { connect } from 'react-redux';
import { opertions } from './../state/ducks/login';
import Login from './../components/Login';

const mapStateToProps = () => ({});

const mapDispToProps = (dispatch) => ({
    doLogin: () => dispatch(opertions.logIn())
});

export default connect(mapStateToProps, mapDispToProps)(Login);