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
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { trySignUp, signUpFailed } from '../Actions/SignUp';
import LeftNavigation from './LeftNavigation';

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
  headline: {
    marginBottom: theme.spacing.unit * 2,
  },
  caption: {
    marginTop: theme.spacing.unit *2,
  },
  toplevel: {
    flexGrow: 1,
    height: "100vh",
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minWidth: 0, // So the Typography noWrap works
  },
});

function SignUp(props) {
  const { classes } = props;

  function testEmail(email){
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  function handleSubmit(e){
    e.preventDefault();
    if(!testEmail(document.getElementById("email").value)){
      props.signUpFailed('enter a valid email address')
    }else{
      var payload = {};
      ["password","username","email"].forEach(field => {
        payload[field] = document.getElementById(field).value;
        document.getElementById(field).value = "";
      });
      props.trySignUp(payload);
    }
  }

  return (
    <div className={classes.toplevel}>
      <LeftNavigation/>
      <div className={classes.content}>
        <Grid container direction="column" justify="center" alignItems="center">
          <Paper className={classes.root} elevation={10}>
            <Typography variant="headline" component="h3" align="center" className={classes.headline}>
              Don't Have An Account?
            </Typography>
            <Typography variant="display2" align="center" color="primary">
              Sign Up
            </Typography>
            {props.error &&
              <Typography variant="caption" align="center" color="error" className={classes.caption}>
                {props.error.toUpperCase()}
              </Typography>
            }
            <form className={classes.form} onSubmit={handleSubmit}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="email">Email Address</InputLabel>
                <Input id="email" name="email" autoFocus />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="username">Username</InputLabel>
                <Input id="username" name="username" />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input id="password" name="password" type="password"/>
              </FormControl>
              <Button type="submit" fullWidth variant="raised" color="primary" className={classes.submit}>
                Sign Up
              </Button>
            </form>
            <Typography variant="caption" align="center" className={classes.caption}>
              I already have an account
              <Button component={Link} to="/signin" color="primary" size="small" variant="text">Sign In</Button>
            </Typography>
          </Paper>
        </Grid>
      </div>
    </div>
  );
}

SignUp.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    error: state.signupReducer.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    trySignUp: userInfo => {
      dispatch(trySignUp(userInfo))
    },
    signUpFailed: message => {
      dispatch(signUpFailed(message))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SignUp));
