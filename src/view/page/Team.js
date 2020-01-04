import React from 'react'
import Navbar from '../components/Navbar';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import User from '../components/User';

import '../css/Home.css';

class Team extends React.Component {

    state = {
        users: null
    } 

    componentDidMount() {
        // get all users and then store in state
        axios.get('/users').then(res => {
            this.setState({
                users: res.data
            });
        }).catch(err => {
            console.log(err);
        })
    }

    render() {
        let users = this.state.users ? ( this.state.users.map(user => <User user={user} key={user.userID}/>) ) : <p>Loading...</p>

        return (
            <div>
                <Navbar />
                    <div className='container'>
                    <Grid container spacing={10}>
                        <Grid item sm={8} xs={12}>
                            {users}
                        </Grid>
                        <Grid item sm={4} xs={12}>
                            <p>Content...</p>
                        </Grid>
                    </Grid>
                    </div>
            </div>
        )
    }


}

export default Team