import React from 'react';
import queryString from 'querystring';
import { connect } from 'react-redux';
import { setAccessToken, setRefreshToken } from '../actions/actions'
import PropTypes from 'prop-types';
import Search from './Search';
import Authorize from './Authorize';

class HomePage extends React.Component {

    componentDidMount() {
        let parsed = queryString.parse(window.location.search);
        let accessToken = parsed["?access_token"];
        this.props.setAccessToken(accessToken);
    }

    render() {
        let content = (this.props.accessToken) ? <Search /> : <Authorize/>

        return (
            <div>
                <div>
                    <h1>Welcome to the Music Guessing Game</h1>
                    <h3>Are you really a true fan of your favourite artist? Let's find out.</h3>
                    <p>To play, select an artist. You will be given 30 second previews of 10 different songs to guess.</p>
                </div>
                
                {content}
            </div>
        )
    }
}

HomePage.propTypes = {
    setAccessToken: PropTypes.func.isRequired,
    setRefreshToken: PropTypes.func.isRequired,
    accessToken: PropTypes.string
}

const mapStateToProps = state => ({
    accessToken: state.reducers.accessToken
});

export default connect(mapStateToProps, { setAccessToken, setRefreshToken
})(HomePage);