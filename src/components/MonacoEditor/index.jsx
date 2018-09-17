/**
 * @file
 * @author zdying
 */

'use strict';

import React from 'react';
import * as monaco from 'monaco-editor';
window.monaco = monaco;
import '../../../editor-language.js';


import './index.less';

export default class Modal extends React.Component {
  constructor (props, state) {
    super(props, state);

    this.state = {
    };
    this.editor = null;
    this.getValue = this.getValue.bind(this);
  }

  getValue() {
    return this.editor.getValue();
  }

  componentDidMount () {

      let code = this.props.value || '';
      this.editor = monaco.editor.create(document.getElementById("monaco-editor"), {
        value: code,
        language: "hiproxy-conf",

        wordWrap: 'wordWrapColumn',
        wordWrapColumn: 40,
        readOnly: this.props.disabled ? true : false,
        // Set this to false to not auto word wrap minified files
        wordWrapMinified: true,

        // try "same", "indent" or "none"
        wrappingIndent: "indent"
      });
      // window.__editor = editor;
  }

  render () {

    return (
      <div id="monaco-editor" className="monaco-editor" />
    );
  }


};
