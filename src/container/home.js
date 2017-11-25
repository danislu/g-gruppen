import { connect } from 'react-redux';
import Home from './../components/Home';

const mapStateToProps = (state) => ({
    title: state.text
});

const mapDispToProps = (dispatch) => ({
    pingIt: () => dispatch({ type: 'ping' })
});

export default connect(mapStateToProps, mapDispToProps)(Home);