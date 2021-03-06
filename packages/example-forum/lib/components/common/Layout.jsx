import { Components, registerComponent, withCurrentUser } from 'meteor/vulcan:core';
import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';
import Helmet from 'react-helmet';

const Layout = ({currentUser, children, currentRoute}) =>

  <div className={classNames('wrapper', `wrapper-${currentRoute.name.replace('.', '-')}`)} id="wrapper">

    <Helmet>
      <link name="bootstrap" rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.5/css/bootstrap.min.css"/>
      <link name="font-awesome" rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
    </Helmet>

    <Components.HeadTags />

    {/* Deactivating this component for now, since it's been causing a bunch of bugs. TODO: Fix this properly. */}
    {/* {currentUser ? <Components.UsersProfileCheck currentUser={currentUser} documentId={currentUser._id} /> : null} */}

    <Components.Header {...this.props}/>

    <div className="main">

      <Components.FlashMessages />


      <Components.Newsletter />

      {children}

    </div>

    <Components.Footer />

  </div>

Layout.displayName = "Layout";

registerComponent('Layout', Layout);
