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
    let {fileInfo, fileType} = this.state;

    if (fileInfo) {
      let {status, message, data} = fileInfo;

      if (status === 0 && data.content) {
        return (
          <Modal title={`Edit ${fileType} file`} btnHandler={this.saveFile} onClose={this.onModalClose} btnText="Save">
            {/*<pre 
              ref={o => this.editor = o}
              style={{width: '720px', maxHeight: '50vh', overflow: 'auto'}}
              contentEditable="true"
              suppressContentEditableWarning="true"
              className="editor"
            >
              {data.content}
            </pre>*/}
            <div style={{width: '720px', maxHeight: '50vh', overflow: 'auto'}}>
              <SimpleEditor value={data.content} />
            </div>
          </Modal>
        )
      } else {
        return null;
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
        fileType,
        fileInfo: json
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