import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import TeamCard from './TeamCard';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import CreateTeamModal from './CreateTeamModal';
import TeamInviteModal from './TeamInviteModal';
import { openCreateTeamModal, closeCreateTeamModal, tryCreateTeam,
openTeamInviteModal, closeTeamInviteModal, tryInvite,
tryGetTeamInfo } from '../Actions/MyTeams';
import { connect } from 'react-redux';


const styles = theme => ({
  title: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
  },
  button: {
    margin: theme.spacing.unit,
  },
});

function MyTeams(props) {
  const { classes } = props;

  function handleCreateTeamOpen(){
    props.openCreateTeamModal();
  };

  function handleCreateTeamClose(){
    props.closeCreateTeamModal();
  };

  function handleTeamInviteOpen(teamId){
    props.openTeamInviteModal(teamId);
  }

  function handleTeamInviteClose(){
    props.closeTeamInviteModal();
  }

  function handleSeeMore(teamId){
    props.seeMore(teamId);
  }

  return (
    <React.Fragment>
      {props.createTeamModal &&
        <CreateTeamModal closeModal={handleCreateTeamClose}
          tryCreateTeam={props.tryCreateTeam} token={props.token}
        />
      }
      {props.teamInviteModal &&
        <TeamInviteModal closeModal={handleTeamInviteClose} token={props.token}
          tryTeamInvite={props.tryTeamInvite} teamInfo={props.allTeams[props.activeTeam]}/>
      }
      <Typography variant="headline" className={classes.title}>
        My Teams
        <Button variant="fab" mini color="primary" aria-label="Add"
          className={classes.button} onClick={handleCreateTeamOpen}
        >
          <AddIcon />
        </Button>
      </Typography>
      {props.myTeams.map(teamId =>
        <TeamCard className="vertical" key={teamId}
          userId={props.userId} teamInfo={props.allTeams[teamId]}
          handleTeamInviteOpen={handleTeamInviteOpen}
          handleSeeMore={handleSeeMore}
        />
      )}
    </React.Fragment>
  );
}

MyTeams.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    myTeams: state.teamsReducer.myTeams,
    allTeams: state.teamsReducer.allTeams,
    createTeamModal: state.teamsReducer.createTeamModal,
    teamInviteModal: state.teamsReducer.teamInviteModal,
    token: state.userReducer.token,
    userId: state.userReducer.user,
    activeTeam: state.teamsReducer.activeTeam
  }
}

const mapDispatchToProps = dispatch => {
  return {
    openCreateTeamModal: () => {
      dispatch(openCreateTeamModal())
    },
    closeCreateTeamModal: () => {
      dispatch(closeCreateTeamModal())
    },
    tryCreateTeam: (teamInfo, token) => {
      dispatch(tryCreateTeam(teamInfo, token))
    },
    openTeamInviteModal: (teamId) => {
      dispatch(openTeamInviteModal(teamId))
    },
    closeTeamInviteModal: () => {
      dispatch(closeTeamInviteModal())
    },
    tryTeamInvite: (inviteInfo, token) => {
      dispatch(tryInvite(inviteInfo, token))
    },
    seeMore: (teamId) => {
      dispatch(tryGetTeamInfo(teamId))
    }
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(MyTeams));
