import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'left',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing.unit * 5
  },
  gridList: {
    width: "100%",
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
});

function UserList(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <GridList  cellHeight={50} cols={5} className={classes.gridList}>
        {props.users.length > 0 && props.users.map(user => (
          <GridListTile cols={1} key={user._id}>
            <GridListTileBar
              title={user.username}
              actionIcon={
                <React.Fragment>
                  <IconButton className={classes.icon}>
                    <InfoIcon />
                  </IconButton>
                </React.Fragment>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}

UserList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserList);
