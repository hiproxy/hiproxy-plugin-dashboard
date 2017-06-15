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

    this.state = {
    };
  }

  componentDidMount () {
    this.initEditor();
  }

  render () {
    let {lang='hosts', value} = this.props;

    return (
      <div className="con">
        <textarea ref={o => this.editor = o} defaultValue={value} className="editor"></textarea>
        <pre ref={o => this.pre = o} className="pre"></pre>
        <div ref={o => this.line = o} className="line"></div>
      </div>
    );
  }

  highlight (str) {
    var colors = ['#C299D6', '#D9854A', '#00BCD4', '#B7C753', 'red', '#969896'];
    var reg = /(var|let|const|this|new|return|function|Math|Object|String)|(true|false)|([\w_][\w\d_]{0,}(?=\())|([\"'].*?[\"'])|([+-]?\d+(?:\.\d+)?)|(\/\/.*|\/\*[\s\S]*?\*\/)/g;
    var res = str
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(reg, function (match) {
        var args = [].slice.call(arguments, 1);
        var index = args.indexOf(match);

        if (args[index + 1]) {
          console.log(args[index], args[index + 1]);
          return match.replace(args[index + 1], '<span style="color:' + colors[index] + '">' + args[index + 1] + '</span>');
        }else {
          return '<span style="color:' + colors[index] + '">' + match + '</span>';
        }
      });

    return res;
  }

  initEditor () {
    var pre = this.pre;
    var editor = this.editor;
    var line = this.line;

    pre.innerHTML = this.highlight(editor.value);
    this.addLine();

    editor.addEventListener('input', (eve) => {
      pre.innerHTML = this.highlight(editor.value);
      this.addLine();
    });

    editor.addEventListener('scroll', (eve) => {
      // pre.scrollTop = editor.scrollTop
      pre.style.top = '-' + Math.floor(editor.scrollTop) + 'px';
      line.style.top = '-' + Math.floor(editor.scrollTop) + 'px';
    });

    editor.addEventListener('keydown', (eve) => {
      var code = eve.keyCode;
      var start = editor.selectionStart;
      var end = editor.selectionEnd;
      var value = editor.value;

      if (code === 9) {
        editor.value = value.slice(0, start) + '    ' + value.slice(end);
        editor.selectionStart = editor.selectionEnd = start + 4;
        eve.preventDefault();
      }
    });
  }

  addLine () {
    var editor = this.editor;
    var pre = this.pre;
    var line = this.line;
    var text = editor.value;
    var lines = text.split('\n');
    var arr = lines.map(function (line, index) {
      return index + 1;
    });

    line.innerHTML = '<div>' + arr.join('</div><div>') + '</div>';
    pre.style.top = '-' + Math.floor(editor.scrollTop) + 'px';
    line.style.top = '-' + Math.floor(editor.scrollTop) + 'px';
  }
};
