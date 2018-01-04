import React, { PureComponent } from 'react';
import { registerComponent } from 'meteor/vulcan:core';
import { MenuItem } from 'material-ui';
import Users from 'meteor/vulcan:users';

class BanUserFromPostMenuItem extends PureComponent {

  constructor(props) {
    super(props);
  }

  currentUserCanBan = () => {
    const canBan = this.props.currentUser &&
      (
        Users.canDo(this.props.currentUser,"posts.moderate.all") ||
        (
          Users.canDo(this.props.currentUser,"posts.moderate.own") &&
          this.props.post.user.moderationPolicy
        )
      )
    return canBan
  }

  handleBanUserFromPost = () => {
    const commentUserId = this.props.comment.userId
    let bannedUserIds = _.clone(this.props.post.bannedUserIds) || []
    if (bannedUserIds.indexOf(commentUserId) == -1) {
      bannedUserIds.push(commentUserId)
    }
    this.props.postEditMutation({
      documentId: this.props.comment.postId,
      set: {bannedUserIds:bannedUserIds},
      unset: {}
    }).then(()=>console.log(`User ${commentUserId} added to post banned-list: ${bannedUserIds}`)).catch(/* error */);
  }

  render() {
    if (this.props.comment && this.currentUserCanBan()) {
      return <MenuItem onTouchTap={ this.handleBanUserFromPost } primaryText="Ban User From Post" />
    } else {
      return null
    }
  }
}

registerComponent('BanUserFromPostMenuItem', BanUserFromPostMenuItem);
// export default BanUserFromPostMenuItem;
