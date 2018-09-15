import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import InviteCard from './InviteCard';
import { tryAcceptInvite } from '../Actions/MyInvites';
import { connect } from 'react-redux';


const styles = theme => ({
  title: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
  },
});

function MyInvites(props) {
  const { classes } = props;
  var myInviteIds = Object.keys(props.myInvites);

  return (
    <React.Fragment>
      <Typography variant="headline" className={classes.title}>
        My Invites
      </Typography>
      {myInviteIds.length > 0 && myInviteIds.map(inviteId =>
        <InviteCard className="vertical" key={inviteId}
          userId={props.userId} inviteInfo={props.myInvites[inviteId]}
          tryAcceptInvite={props.tryAcceptInvite} token={props.token}
        />)}
    </React.Fragment>
  );
}

MyInvites.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    myInvites: state.invitesReducer.myInvites,
    token: state.userReducer.token,
    userId: state.userReducer.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    tryAcceptInvite: (inviteInfo, token) => {
      dispatch(tryAcceptInvite(inviteInfo, token))
    }
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(MyInvites));
