/**
 * @file
 * @author zdying
 */

'use strict';

import React from 'react';

import './style.less';

export default class Modal extends React.Component {
  constructor (props, state) {
    super(props, state);

    this.hideDialog = this.hideDialog.bind(this);

    this.state = {
      isShow: true
    };
  }

  render () {
    let {isShow} = this.state;
    let {children, title, btnText, btnHandler, onClose} = this.props;

    console.log('isShow===>', isShow);

    if (!isShow) {
      return null;
    }

    return (
      <div className="modal" style={{display: 'flex', zIndex: 400, opacity: 1}}>
        <a href="javascript:;" onClick={this.hideDialog} className="modal-overlay" aria-label="Close"></a>
        <div className="modal-container" role="document">
          <div className="modal-header">
            <a href="javascript:;" className="btn btn-clear float-right" aria-label="Close" onClick={this.hideDialog}></a>
            <div className="modal-title">{title}</div>
          </div>

          <div className="modal-body">
            <div className="content">
              {children}
            </div>
          </div>

          <div className="modal-footer">
            <a href="javascript:;" className="btn btn-link" onClick={this.hideDialog}>Close</a>
            <button className="btn btn-primary" onClick={btnHandler}>{btnText}</button>
          </div>
        </div>
      </div>
    );
  }

  hideDialog () {
    this.setState({
      isShow: false
    });

    this.props.onClose && this.props.onClose();
  }
}
