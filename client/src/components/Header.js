import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { rem } from './common';

import styled from 'styled-components';

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return [
          <Link key="1" to="/login">
            Sign in
          </Link>,
          <Link to="/get-started" key="2">
            <GetStartedBtn>Get started</GetStartedBtn>
          </Link>
        ];
      default:
        return [
          <Link to="/properties" key="1">
            properties
          </Link>,

          <a href="/api/logout" key="2">
            logout
          </a>
        ];
    }
  }
  render() {
    return (
      <NavBar>
        <Link to={this.props.auth ? '/' : '/'}>Host Legality</Link>
        <LinkContainer>{this.renderContent()}</LinkContainer>
      </NavBar>
    );
  }
}

const NavBar = styled.nav`
  display: flex;
  height: ${rem(65)};
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid gray;
  padding: 0 ${rem(20)};
`;

const LinkContainer = styled.ul`
  display: flex;
  align-items: center;
`;

const GetStartedBtn = styled.span`
  display: inline-block;
  height: ${rem(42)};
  width: ${rem(120)};
  background-color: #2ecc71;
  font-weight: bold;
  color: #ffffff;
  line-height: ${rem(42)};
  text-align: center;
  text-decoration: none;
  border-radius: ${rem(42)};
  margin-left: ${rem(20)};

  @media (min-width: ${rem(765)}) {
    font-size: ${rem(16)};
    width: ${rem(174)};
  }
`;

const mapStateToProps = ({ auth }) => {
  return { auth };
};
export default connect(mapStateToProps)(Header);
