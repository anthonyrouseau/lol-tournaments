import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import LeftNavigation from './LeftNavigation';



const styles = theme => ({
  root: {
    flexGrow: 1,
    height: "100vh",
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  paperRoot: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minWidth: 0, // So the Typography noWrap works
  },
});

function DashBoard(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <LeftNavigation/>
      <main className={classes.content}>
        <Paper className={classes.paperRoot} elevation={10}>
          <Typography variant="headline" component="h3">
            {`${props.state.user}'s Dashboard`}
          </Typography>
          {props.children}
        </Paper>
      </main>
    </div>
  );
}

DashBoard.propTypes = {
  classes: PropTypes.object.isRequired,
};



export default withStyles(styles)(DashBoard);
