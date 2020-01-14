
// imports
import React from 'react'
import Navbar from '../components/Navbar';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import User from '../components/User';

// Material UI imports
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import Modal from '@material-ui/core/Modal';

// css
import '../css/Home.css';

const styles = {
    button: {
        margin: '40px auto 0px auto',
        position: 'relative'
    },
    paper: {
        position: 'absolute',
        width: 400,
        border: '2px solid #000',
        backgroundColor: 'white',
        padding: '20px',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)'
    },
}

class Team extends React.Component {

    state = {
        users: null,
        joinOpen: false,
        createOpen: false
    } 

    constructor() {
        super();
        this.teamOptions = this.teamOptions.bind(this);
        this.joinTeam = this.joinTeam.bind(this);
        this.createTeam = this.createTeam.bind(this);
        this.closeJoinModal = this.closeJoinModal.bind(this);
        this.closeCreateModal = this.closeCreateModal.bind(this);
    }

    componentDidMount() {
        // get all users on the same team and then store in state
        axios.get('/user/teammates').then(res => {
            this.setState({
                users: res.data
            });
            console.log(this.state.users)
        }).catch(err => {
            console.log(err);
        })
    }

    render() {
        const { classes } = this.props;

        // load teammates, if not ask to join or create a team
        let users = <p>Loading ... </p>
        if(this.state.users && this.state.users.length) users = this.state.users.map(user => <User user={user} key={user.userID}/>);
        else if(this.state.users && !this.state.length) users = this.teamOptions();

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

                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={ this.state.joinOpen }
                    onClose={ this.closeJoinModal }
                >
                    <div className={classes.paper}>
                        <h2 id="simple-modal-title">Join a Team</h2>
                        <p id="simple-modal-description">
                            Form to join a team goes here
                        </p>
                    </div>
                </Modal>

                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={ this.state.createOpen }
                    onClose={ this.closeCreateModal }
                >
                    <div className={classes.paper}>
                        <h2 id="simple-modal-title">Create a Team</h2>
                        <p id="simple-modal-description">
                            Form to create a team goes here
                        </p>
                    </div>
                </Modal>
            </div>
        )
    }

    // give user the option to create a team or join a team
    teamOptions() {
        const { classes } = this.props;

        return (
            <div>
                <Button variant='contained' color='primary' onClick={this.joinTeam} className={classes.button} fullWidth>
                    Join a team
                </Button>
                <Button variant='contained' color='secondary' onClick={this.createTeam} className={classes.button} fullWidth>
                    Create a team
                </Button>
            </div>
        )
    }

    // join a team
    joinTeam = (event) => {
        console.log('join team');

        // TODO: should pop up a modal to ask what the team name is
        this.setState({
            joinOpen: true
        });
    }

    // create a team
    createTeam = (event) => {
        console.log('create team');

        // TODO: should pop up a modal to ask what to call the new team
        this.setState({
            createOpen: true
        })
    }

    closeJoinModal() {
        this.setState({
            joinOpen: false
        });
    }

    closeCreateModal() {
        this.setState({
            createOpen: false
        });
    }
}

export default withStyles(styles)(Team)