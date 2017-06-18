/**
 * @file Table component
 * @author zdying
 */

import React from 'react';
import Modal from '../../../components/Modal';
import SimpleEditor from '../../../components/Editor';
import './styles.less';

export default class extends React.Component {
  constructor (props, state) {
    super(props, state);

    this.state = {};

    this.onModalClose = this.onModalClose.bind(this);
    this.saveFile = this.saveFile.bind(this);
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
                    <td>{Object.keys(fileType === 'hosts' ? info : info.domains).length} Domains</td>                
                    <td>{fileType}</td>
                    <td>
                      <button className="btn" onClick={this.editFile.bind(this, file, fileType, true)}>View</button>                      
                      <button className="btn" onClick={this.editFile.bind(this, file, fileType, false)}>Edit</button>
                      {/*<button className="btn disabled">Disable</button>*/}
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
    let {fileInfo, fileType, disabled} = this.state;

    if (fileInfo) {
      let {status, message, data} = fileInfo;

      if (status === 0) {
        return (
          <Modal title={`Edit ${fileType} file`} btnHandler={this.saveFile} onClose={this.onModalClose} btnText="Save" showOKBtn={!disabled}>
            <div style={{width: '720px', height: '50vh', overflow: 'auto'}}>
              <SimpleEditor ref={o => this.editor = o} value={data.content || ''} disabled={disabled} />
            </div>
          </Modal>
        )
      } else {
        return null;
      }
    }
  }

  editFile(file, fileType, disabled) {
    fetch('/dashboard/api/readFile?file=' + file)
    .then(res => {
      return res.json();
    })
    .then(json => {
      this.setState({
        fileType,
        fileInfo: json,
        disabled: disabled
      })
    })
    .catch(err => {
      this.setState({
        fileInfo: err
      })
    });
  }

  onModalClose(){
    this.setState({
      fileInfo: null
    })
  }

  saveFile(file){
    let content = this.editor.editor.value;
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