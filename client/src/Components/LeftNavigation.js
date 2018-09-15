
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import { Link } from 'react-router-dom';
import { getMyTeams, getMyInvites } from '../Actions/LeftNavigation';
import { connect } from 'react-redux';


const styles = theme => ({
  drawerPaper: {
    position: 'relative',
    minWidth: "10vw",
  },
  toolbar: theme.mixins.toolbar,
});


function LeftNavigation(props) {
  const { classes } = props;

  function handleMyTeamsClicked() {
    props.getMyTeams(props.user);
  }

  function handleMyInvitesClicked() {
    props.getMyInvites(props.user);
  }

  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
    > {props.user &&
      <React.Fragment>
        <List
          component="nav"
          subheader={<ListSubheader component="div">My Stuff</ListSubheader>}
        >
          <ListItem button component={Link} to="/dashboard">
            <ListItemText inset primary="Home"></ListItemText>
          </ListItem>
          <ListItem button component={Link} to="/dashboard/tournaments">
            <ListItemText inset primary="Tournaments"></ListItemText>
          </ListItem>
          <ListItem button onClick={handleMyTeamsClicked} component={Link} to="/dashboard/teams">
            <ListItemText inset primary="Teams"></ListItemText>
          </ListItem>
          <ListItem button onClick={handleMyInvitesClicked} component={Link} to="/dashboard/invites">
            <ListItemText inset primary="Invites"></ListItemText>
          </ListItem>
        </List>
        <Divider />
      </React.Fragment>
    }
      <List
        component="nav"
        subheader={<ListSubheader component="div">Search</ListSubheader>}
      >
        <ListItem>
          <ListItemText inset primary="Tournaments"></ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText inset primary="Teams"></ListItemText>
        </ListItem>
        <ListItem button component={Link} to="/users">
          <ListItemText inset primary="Users"></ListItemText>
        </ListItem>
      </List>
    </Drawer>
    );
  }

  LeftNavigation.propTypes = {
    classes: PropTypes.object.isRequired,
}

const mapStateToProps = state => {
  return {
    user: state.userReducer.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getMyTeams: userId => {
      dispatch(getMyTeams(userId))
    },
    getMyInvites: userId => {
      dispatch(getMyInvites(userId))
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(LeftNavigation));
