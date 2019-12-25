import React from 'react'
import '../css/Home.css'

class Welcome extends React.Component {

    render() {
        return (
            <div className="container text-color-black">
                <div className="text-center mt-5">
                    <h1>Welcome to Flight School!</h1>
                </div>

                <div className="mt-5">
                    <h2>Mission</h2>
                    Flight School was created in order to provide a better platform for powerlifters and coaches to track training cycles.
                </div>

                <div className="mt-5">
                    <h2>Get Started</h2>
                    To get started, click on "Guide" in the menu bar
                </div>
            </div>
        )
    }


}

export default Welcome