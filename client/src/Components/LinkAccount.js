import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import uuid from 'uuid/v4';
import { connect } from 'react-redux';
import { tryAccountLink } from '../Actions/LinkAccount';
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
    marginTop: theme.spacing.unit * 2,
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

function LinkAccount(props) {
  const { classes } = props;

  function handleSubmit(e){
    e.preventDefault();
    var code = document.getElementById("code").innerText;
    var summonerName = document.getElementById("summoner_name").value;
    props.tryAccountLink({summonerName: summonerName, code: code});
  }

  return (
    <div className={classes.toplevel}>
      <LeftNavigation />
      <div className={classes.content}>
        <Paper className={classes.root} elevation={10}>
          {props.error &&
            <Typography variant="caption" align="center" color="error" className={classes.caption}>
              {props.error.toUpperCase()}
            </Typography>
          }
          <Typography variant="title" component="h3" align="center" className={classes.headline}>
            1) Enter The Code Below And Click Save
          </Typography>
          <Typography id="code" variant="subheading" align="center" color="primary" className={classes.headline}>
            {uuid()}
          </Typography>
          <Typography variant="title" component="h3" align="center" className={classes.headline}>
            2) Enter Your Summoner Name
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="summoner_name">Summoner Name</InputLabel>
              <Input id="summoner_name" name="summoner_name" autoFocus />
            </FormControl>
            <Button type="submit" fullWidth variant="raised" color="primary" className={classes.submit}>
              Link Account
            </Button>
            <Typography variant="caption" align="left" color="primary" className={classes.caption}>
              Where do you enter the code? Open the LoL client then go to settings > verification
            </Typography>
          </form>
        </Paper>
      </div>
    </div>
  );
}

LinkAccount.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    error: state.linkAccountReducer.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    tryAccountLink: payload => {
      dispatch(tryAccountLink(payload))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(LinkAccount));
