import { Components, replaceComponent, withCurrentUser } from 'meteor/vulcan:core';
import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router';
import Users from 'meteor/vulcan:users';
import { withApollo } from 'react-apollo';

import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';

class UsersMenu extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    }
  }

  handleTouchTap = (event) => {
    event.preventDefault();
    this.setState({
      open:true,
      anchorEl: event.currentTarget,
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  }

  render() {
    let { currentUser, client } = this.props;

    const labelStyle = {
      textTransform: 'none',
      fontSize: '16px',
      color: this.props.color
    }

    return (
      <div className="users-menu">
        <FlatButton labelStyle={ labelStyle } label={Users.getDisplayName(currentUser)} onTouchTap={this.handleTouchTap} />
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'right', vertical: 'top'}}
          onRequestClose={this.handleRequestClose}
        >
          <Menu>
            <MenuItem primaryText="New Post" containerElement={<Link to={`/newPost`}/>} />
            <MenuItem primaryText="Profile" containerElement={<Link to={`/users/${currentUser.slug}`}/>} />
            <MenuItem primaryText="Edit Account" containerElement={<Link to={`/account`}/>} />
            <MenuItem primaryText="Log Out" onTouchTap={() => Meteor.logout(() => client.resetStore())} />
          </Menu>
        </Popover>
      </div>
    )
  }
}

UsersMenu.propTypes = {
  color: PropTypes.string,
};

UsersMenu.defaultProps = {
  color: "rgba(0, 0, 0, 0.6)"
}

replaceComponent('UsersMenu', UsersMenu, withCurrentUser, withApollo);
