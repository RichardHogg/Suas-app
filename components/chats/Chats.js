import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getChats } from "../../actions/chat";
import ChatItem from "./ChatItem";
const Chats = ({ getChats, chat: { chats, loading } }) => {
  useEffect(() => {
    getChats();
  }, [getChats]);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large-text-primary">Chat</h1>
      <p className="lead">
        <i className="fas fa-comments"></i>Welcome to chat
      </p>
      {/*Chat Form */}
      <div className="chats">
        {chats.map(chat => (
          <ChatItem key={chat._id} chat={chat} />
        ))}
      </div>
    </Fragment>
  );
};

Chats.propTypes = {
  getChats: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  chat: state.chat
});
export default connect(
  mapStateToProps,
  { getChats }
)(Chats);
