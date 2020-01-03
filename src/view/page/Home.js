import React from 'react'
import Navbar from '../components/Navbar'

import '../css/Home.css'

class Home extends React.Component {
    render() {
        return (
            <div>
                <Navbar />
                <div className="container">
                    Hello World this is the homepage
                </div>
            </div>
        );
    }
}

export default Home