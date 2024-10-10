import { Component } from "react";
import { PropTypes } from "prop-types";
export class ButtonReverse extends Component {
  render() {
    const { text, onClick } = this.props;
    return <button onClick={onClick}>{text}</button>;
  }
}

ButtonReverse.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.number,
};
