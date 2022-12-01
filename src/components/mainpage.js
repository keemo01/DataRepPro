import React, { Component } from 'react';

// create class MainPage with words and time
class MainPage extends Component {
    render() {
        return (
            // homepage with background image, welcoming message and current time
            <div className="home-caption" style={{ backgroundImage: "url(/background.jpg)" }}>
                <h1>Welcome to the  Al Jabarah customer store database</h1>
                <h2>The time is {new Date().toLocaleTimeString()}.</h2>
            </div>
        );
    }
}

export default MainPage; // export