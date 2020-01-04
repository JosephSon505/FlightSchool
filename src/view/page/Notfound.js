import React from 'react'
import Navbar from '../components/Navbar'

import '../css/Home.css'

class Notfound extends React.Component {
    render() {
        return (
            <div>
                <Navbar />
                <div className='container'>
                    Page Not Found
                </div>
            </div>
        )
    }
}

export default Notfound