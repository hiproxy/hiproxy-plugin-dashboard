/**
 * @file Table component
 * @author zdying
 */

import React from 'react';
import './styles.less';

export default class extends React.Component {
  constructor (props, state) {
    super(props, state);

    this.state = {};
  }

  render () {
    let {files, fileType} = this.props;

    return (
      <div>
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>File Path</th>
              <th>State</th>
              <th>Domain Count</th>
              <th>Config Type</th>          
              <th>Operate</th>
            </tr>
          </thead>
          <tbody>
            {
              Object.keys(files).map((file) => {
                let info = files[file];
                return (
                  <tr className="" key={file}>
                    <td className="color-blue">{file}</td>
                    <td>Working</td>
                    <td>{Object.keys(info).length} Domains</td>                
                    <td>{fileType}</td>
                    <td>
                      <button className="btn" onClick={this.editFile.bind(this, file, fileType)}>Edit</button>
                      <button className="btn disabled">Disable</button>
                    </td>          
                  </tr>
                )
              })
            }
          </tbody>
        </table>
        {this.renderDialog()}
      </div>
    )
  }

  renderDialog() {
    let {fileInfo} = this.state;

    if (fileInfo) {
      let {status, message, data} = fileInfo;

      if (status === 0 && data.content) {
        return (
          <div className="modal" style={{display: 'flex', zIndex: 400, opacity: 1}}>
            <a href="javascript:;" onClick={this.hideDialog.bind(this)} className="modal-overlay" aria-label="Close"></a>
            <div className="modal-container" role="document">
              <div className="modal-header">
                <a href="#modals" className="btn btn-clear float-right" aria-label="Close"></a>
                <div className="modal-title">Modal title</div>
              </div>
              <div className="modal-body">
                <div className="content">
                  <pre ref={o => this.editor = o} style={{width: '600px'}} contentEditable className="editor">{data.content}</pre>
                </div>
              </div>
              <div className="modal-footer">
                <a href="javascript:;" className="btn btn-link" onClick={this.hideDialog.bind(this)}>Close</a>
                <button className="btn btn-primary" onClick={this.saveFile.bind(this)}>Save</button>
              </div>
            </div>
          </div>
        )
      } else {

      }
    }
  }

  editFile(file, fileType) {
    fetch('/dashboard/api/readFile?file=' + file)
    .then(res => {
      return res.json();
    })
    .then(json => {
      this.setState({
        fileInfo: json
      })
    })
    .catch(err => {
      this.setState({
        fileInfo: err
      })
    });
  }

  hideDialog(){
    this.setState({
      fileInfo: null
    })
  }

  saveFile(file){
    let content = this.editor.innerText;
    fetch('/dashboard/api/saveFile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        file: this.state.fileInfo.data.file,
        content: content
      })
    })
    .then(json => {
      this.setState({
        fileInfo: null
      })
    })
    .catch(err => {
      this.setState({
        fileInfo: err
      })
    })
  }
}