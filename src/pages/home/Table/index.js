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

    this.state = {
      files: this.props.files
    };

    this.onModalClose = this.onModalClose.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      files: nextProps.files
    })
  }

  render () {
    let { fileType, port } = this.props;

    let files = this.state.files;

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
                const {result , enable} = files[file];
                const domains = Object.keys(result || {});
                const isChecked = enable?'checked':'';
                const isEnable = enable ? <span className="enable">enabled</span>:<span className='disable'>disabled</span>;

                return (
                  <tr className="" key={file} key={file}>
                    <td className="color-blue">{file}</td>
                    <td className="status-switch">
                      <label className="form-switch">
                        <input type="checkbox" onClick={this.switchStatus.bind(this, file, enable, port, fileType)} checked={isChecked}/>
                        <i className="form-icon"></i>
                      </label>
                    </td>
                    <td>{Object.keys(fileType === 'hosts' ? result : domains).length} Domains</td>
                    <td>{fileType}</td>
                    <td>
                      <button className="btn" onClick={this.editFile.bind(this, file, fileType, true)}>View</button>
                      <button className="btn" onClick={this.editFile.bind(this, file, fileType, false)}>Edit</button>
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

  switchStatus(file, enable, port, type) {
    const files = this.state.files;
    const actionType = !enable ? 'enableFile':'disableFile';
    const me = this;
    const fileType = {fileType: type, filePath: file};

    files[file].enable = !enable;

    fetch('http://127.0.0.1:' + port + '/api?action='+actionType +'&params='+JSON.stringify(fileType)).then(function (res) {
      me.setState({
        files
      });
    }).catch(function (err) {
      console.log(err);
    });

    return false;
  }


  renderDialog() {
    let {fileInfo, fileType, disabled} = this.state;

    if (fileInfo) {
      let {status, message, data} = fileInfo;

      if (status === 0) {
        return (
          <Modal title={`Edit ${fileType} file`} btnHandler={this.saveFile.bind(this, fileType)} onClose={this.onModalClose} btnText="Save" showOKBtn={!disabled}>
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
    fetch('/dashboard/api/readFile?file=' + file + '&type=' + fileType)
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

  saveFile(fileType, file){
    let content = this.editor.editor.value;
    fetch('/dashboard/api/saveFile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        file: this.state.fileInfo.data.file,
        content: content,
        type: fileType
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