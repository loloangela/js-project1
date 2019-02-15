import React, { Component } from 'react';
import { ersContext } from '../axios/ers.context';

export class FooterComponent extends Component<any, any> {

  render() {
    return (
      <div className="footer-display container-fluid bg-dark">
        <footer>&copy; Lori A. Oliver 2019</footer>
      </div>
    )
  }
}