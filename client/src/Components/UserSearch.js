import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import LeftNavigation from './LeftNavigation';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import UserList from './UserList';
import { trySearchUser } from '../Actions/Search';
import { connect } from 'react-redux';



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
  form: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  submit: {
    marginLeft: theme.spacing.unit * 3
  }
});

function UserSearch(props) {
  const { classes } = props;

  function handleSearchSubmit(e){
    e.preventDefault();
    var searchValue = document.getElementById("username_search").value;
    props.trySearchUser({
      value: searchValue,
      offset: 0
    })
  }

  return (
    <div className={classes.root}>
      <LeftNavigation/>
      <main className={classes.content}>
        <Paper className={classes.paperRoot} elevation={10}>
          <Typography variant="display1" component="h3">
            Search For A User
          </Typography>
          <form className={classes.form} onSubmit={handleSearchSubmit}>
            <FormControl margin="normal">
              <InputLabel>Username</InputLabel>
              <Input id="username_search" name="username" autoFocus/>
            </FormControl>
            <Button type="submit" variant="raised" color="primary" className={classes.submit}>
              Search
            </Button>
          </form>
          <UserList users={props.users}/>
        </Paper>
      </main>
    </div>
  );
}

UserSearch.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    users: state.searchReducer.users
  }
}

const mapDispatchToProps = dispatch => {
  return {
    trySearchUser: (searchInfo) => {
      dispatch(trySearchUser(searchInfo))
    }
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(UserSearch));
