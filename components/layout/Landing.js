import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Welcome to suas</h1>
          <p className="lead">
            Suas give's you the freedom to connect with an employer or business,
            and create a fast and safe enviroment to chat and share information.
          </p>
          <div className="buttons">
            <Link to="/register" className="btn btn-primary">
              Sign Up
            </Link>
            <Link to="/login" className="btn btn-light">
              Login
            </Link>
          </div>
        </div>
        <section className="about">
          <div>
            <i className="fas fa-info-circle fa-2x" />
            <p className="lead">
              Suas is an upward company striving to help the community get
              better access to people and businesses, suas is an instant chat
              and messaging service that connects you with employers and
              businesses we give you a wide range of variety in how you choose
              to connect with people. suas can help your business get in touch
              and collaborate with people which means no middleman and you can
              share information seamlessly and safely through the app. suas is
              built for all sorts of people and businesses to share information.
            </p>
          </div>
        </section>
      </div>
    </section>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);
