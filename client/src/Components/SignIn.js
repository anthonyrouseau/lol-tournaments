import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import LeftNavigation from './LeftNavigation';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { trySignIn } from '../Actions/SignIn';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    marginTop: theme.spacing.unit * 10,
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  form: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
  caption: {
    marginTop: theme.spacing.unit *2,
  },
  headline: {
    marginBottom: theme.spacing.unit * 2,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minWidth: 0, // So the Typography noWrap works
  },
  toplevel: {
    flexGrow: 1,
    height: "100vh",
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
});

function SignIn(props) {
  const { classes } = props;

  function handleSubmit(e){
    e.preventDefault();
    var payload = {};
    ["password","username"].forEach(field => {
      payload[field] = document.getElementById(field).value;
      document.getElementById(field).value = "";
    });
    props.trySignIn(payload);
  }

  return (
    <div className={classes.toplevel}>
      <LeftNavigation/>
      <div className={classes.root}>
        <Grid container direction="column" justify="center" alignItems="center">
          <Paper className={classes.root} elevation={10}>
            <Typography variant="headline" component="h3" align="center" className={classes.headline}>
              Already Have An Account?
            </Typography>
            <Typography variant="display2" align="center" color="primary">
              Sign In
            </Typography>
            {props.error &&
              <Typography variant="caption" align="center" color="error" className={classes.caption}>
                {props.error.toUpperCase()}
              </Typography>
            }
            <form className={classes.form} onSubmit={handleSubmit}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="username">Username</InputLabel>
                <Input autoFocus id="username" name="username" />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input id="password" name="password" type="password"/>
              </FormControl>
              <Button type="submit" fullWidth variant="raised" color="primary" className={classes.submit}>
                Sign In
              </Button>
            </form>
            <Typography variant="caption" align="center" className={classes.caption}>
              Don't have an account?
              <Button component={Link} to="/signup" color="primary" size="small" variant="text">Sign Up</Button>
            </Typography>
          </Paper>
        </Grid>
      </div>
    </div>
  );
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    error: state.signinReducer.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    trySignIn: userInfo => {
      dispatch(trySignIn(userInfo))
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(SignIn));
