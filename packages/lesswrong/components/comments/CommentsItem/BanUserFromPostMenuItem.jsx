import React, { PureComponent } from 'react';
import { registerComponent } from 'meteor/vulcan:core';
import { MenuItem } from 'material-ui';

class BanUserFromPostMenuItem extends PureComponent {

  constructor(props) {
    super(props);
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
    }).then(()=>console.log(`User ${commentUserId} added to post banned-list: ${bannedUserIds}`))
  }

  render() {
    if (this.props.comment) {
      let canBan = true //Users.canDo(this.props.currentUser,"posts.softRemove.all");;
      if (canBan) {
        return <MenuItem onTouchTap={ this.handleBanUserFromPost } primaryText="Ban User From Post" />
      }
    }
  }
}

registerComponent('BanUserFromPostMenuItem', BanUserFromPostMenuItem);
// export default BanUserFromPostMenuItem;
