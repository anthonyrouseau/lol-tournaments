import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class TeamInviteModal extends React.Component {

  handleSendInvite = () => {
    var inviteInfo = {
      inviteeId: null,
      inviteeName: document.getElementById("invite_field").value,
      teamId: this.props.teamInfo._id
    };
    this.props.tryTeamInvite(inviteInfo, this.props.token);
    this.props.closeModal();
  };

  render() {
    return (
      <div>
        <Dialog
          open={true}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Invite to {this.props.teamInfo.name}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Send a team invite to a user.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="invite_field"
              label="Username"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.closeModal} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSendInvite} color="primary">
              Invite
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
