import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  card: {
    minWidth: 275,
  },
  vertical: {
    marginTop: theme.spacing.unit * 2,
    width: "20vw",
  },
});

function InviteCard(props) {
  const { classes } = props;

  function handleJoinClicked(){
    let info = {
      userId: props.userId,
      teamId: props.inviteInfo.teamId,
      inviteId: props.inviteInfo._id,
      invitee: props.inviteInfo.invitee,
      action: 'add'
    }
    props.tryAcceptInvite(info,props.token)
  }

  return (
    <Card className={classes[props.className]}>
      <CardContent>
        <Typography variant="headline" component="h2">
          {props.inviteInfo.teamName}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={handleJoinClicked} size="small" color="primary">Join</Button>
        <Button size="small">Decline</Button>
      </CardActions>
    </Card>
  );
}

InviteCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InviteCard);
