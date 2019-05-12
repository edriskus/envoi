import React from "react";
import Button  from "@material-ui/core/Button";

import { PropTypes } from "@material-ui/core";

export interface IDelayButtonProps {
  onClick(): void;
  color: PropTypes.Color;
  triggeredLabel: string;
  className?: string;
}

export interface IDelayButtonState {
  triggered: boolean;
}

class DelayButton extends React.PureComponent<IDelayButtonProps, IDelayButtonState> {
  state: IDelayButtonState = {
    triggered: false,
  };

  render() {
    const { triggered } = this.state;
    const { children, triggeredLabel, color, className } = this.props;
    const variant = triggered ? "contained" : "outlined";
    const label = triggered ? triggeredLabel : children;
    return (
      <Button
        className={className}
        color={color}
        variant={variant}
        onClick={this.handleClick}
      >
        { label }
      </Button>
    );
  }

  private handleClick = () => {
    const { triggered } = this.state;
    const { onClick } = this.props;
    if (triggered) {
      this.setState({
        triggered: false,
      });
      if (typeof onClick === "function") {
        onClick();
      }
    } else {
      this.setState({
        triggered: true,
      });
      setTimeout(this.triggeredTimeout, 5000);
    }
  }

  private triggeredTimeout = () => {
    this.setState({
      triggered: false,
    });
  }
}

export default DelayButton;