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

function TeamCard(props) {
  const { classes } = props;


  return (
    <Card className={classes[props.className]}>
      <CardContent>
        <Typography variant="headline" component="h2">
          {props.teamInfo.name}
        </Typography>
        <Typography variant="caption">
          Members: {props.teamInfo.roster.length}
        </Typography>
        <Typography variant="caption">
          Captain: {props.teamInfo.captain}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">See More</Button>
        <Button size="small">Leave</Button>
        {props.teamInfo.captain === props.userId &&
          <Button onClick={() => props.handleTeamInviteOpen(props.teamInfo._id)} size="small">Invite</Button>
        }
      </CardActions>
    </Card>
  );
}

TeamCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TeamCard);
