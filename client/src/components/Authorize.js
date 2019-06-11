import React from 'react';

class Authorize extends React.Component {
    render() {
        return (
            <div>
                <p>This game requires a premium Spotify account.</p>
                <a href="http://localhost:9000/login" className="login-btn btn">Login to Spotify</a>
            </div>
        )
    }
}

export default Authorize;