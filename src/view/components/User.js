import React, { Component } from 'react';

// Material UI Imports
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import withStyles from '@material-ui/core/styles/withStyles';
import { Typography } from '@material-ui/core';

const styles = {
    card: {
        display: 'flex',
        marginBottom: 10,
    },
    image: {
        minWidth: 200,
        maxWidth: 200,
        height: 200
    },
    content: {
        padding: 25,
    }
};

class User extends Component {
    render() {
        const { classes, user : { email, firstName, lastName, handle, liftInstagram, mainInstagram, imageUrl, userId} } = this.props;

        return(
            <Card className={classes.card} key={userId}>
                <CardMedia image={imageUrl} title="Profile Picture" className={classes.image}/>
                <CardContent className={classes.content}>
                    <Typography variant="h5" color="primary">        {handle}                </Typography>
                    <Typography variant="body1" color="primary">     {firstName} {lastName}  </Typography>
                    <Typography variant="body1" color="textPrimary"> {email}                 </Typography>
                    <Typography variant="body1" color="textPrimary"> {liftInstagram}         </Typography>
                    <Typography variant="body1" color="textPrimary"> {mainInstagram}         </Typography>
                </CardContent>
            </Card>
        );
    }
}

export default withStyles(styles)(User);