import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class CreateTeamModal extends React.Component {

  handleCreateTeam = () => {
    var teamInfo = {
      name: document.getElementById("teamName").value
    };
    this.props.tryCreateTeam(teamInfo, this.props.token);
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
          <DialogTitle id="form-dialog-title">Create Team</DialogTitle>
          <DialogContent>
            <DialogContentText>
              A team will be created with the name you enter and you as the captain.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="teamName"
              label="Team Name"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.closeModal} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleCreateTeam} color="primary">
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
