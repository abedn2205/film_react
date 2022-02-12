import React, { Component } from "react";
import { connect } from "react-redux";
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div>
        <Menu pointing inverted color="blue">
          <Menu.Item
            name="home"
            as={Link}
            to="/home"
            active={this.props.activeItems === "home"}
            onClick={this.props.onClickedHeader}
          />
          <Menu.Item
            name="film"
            as={Link}
            to="/film"
            active={this.props.activeItems === "film"}
            onClick={this.props.onClickedHeader}
          />
          <Menu.Item
            name="actor"
            as={Link}
            to="/actor"
            active={this.props.activeItems === "actor"}
            onClick={this.props.onClickedHeader}
          />
          <Menu.Menu position="right">
            <LoginButton />
            <LogoutButton />
          </Menu.Menu>
        </Menu>
        {this.props.activeItems === "beranda"}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    activeItems: state.activeItems,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onClickedHeader: (e, { name }) => {
      const action = { type: "ACTIVE_ITEM", ActiveItem: name };
      dispatch(action);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
