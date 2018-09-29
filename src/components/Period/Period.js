import React, { PureComponent } from 'react';

export default class Period extends PureComponent {
  render() {
    const { period } = this.props;
    return <li>{period}</li>;
  }
}