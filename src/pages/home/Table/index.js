/**
 * @file Table component
 * @author zdying
 */

import React from 'react';
import Modal from '../../../components/Modal';
import MonacoEditor from '../../../components/MonacoEditor';
import './styles.less';


export default class extends React.Component {
  constructor (props, state) {
    super(props, state);
    let files = this.props.files;
    this.state = {
      files: files,
      isAllSelected: this.getDefaultStatus(files)
    };
    
    this.btns = [];
    this.btnsLength = 0;
    this.onModalClose = this.onModalClose.bind(this);
    this.saveFile = this.saveFile.bind(this);
    this.switchAllStatus = this.switchAllStatus.bind(this);
    this.switchStatus = this.switchStatus.bind(this);
    this.getRefs = this.getRefs.bind(this);
    this.checkAllSwitch = this.checkAllSwitch.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      files: nextProps.files
    })
  }

  componentDidUpdate() {
    
  }

  render () {
    let { fileType, port } = this.props;
    console.log('render');
    let files = this.state.files;

    return (
      <div className="ffff">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>File Path</th>
              <th>
                State
                <label className="form-switch form-switch-all">
                  <input type="checkbox" checked={this.state.isAllSelected} onClick={this.switchAllStatus}/>
                  <i className="form-icon"></i>
                </label>
              </th>
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
                  <tr className="" key={file}>
                    <td className="color-blue">{file}</td>
                    <td className="status-switch">
                      <label className="form-switch">
                        <input type="checkbox" onClick={this.switchStatus.bind(this, file, enable, port, fileType)} checked={isChecked} ref={this.getRefs}/>
                        <i className="form-icon"></i>
                      </label>
                    </td>
                    <td>
                      {
                        domains.length > 0 ?
                          <div className="popover popover-left">
                            {domains.length} Domains
                            <div className="popover-container">
                              <div className="card">
                                <ul className="card-body">
                                  {domains.map((item) => {
                                    return <li>{item}</li>
                                  })}
                                </ul>
                              </div>
                            </div>
                          </div> : <div>{domains.length} Domains</div>
                      }
                      
                    </td>
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

  getDefaultStatus(obj) {
    return Object.entries(obj).every((item)=>{
      return item[1].enable === true;
    })
  }

  getRefs(ele) {
    this.btns[this.btnsLength++] = ele;
  }

  switchAllStatus() {
    let state = this.state;
    this.btns.forEach((ele) => {
    if (!state.isAllSelected) { // 点击前为未选中状态
      if (!ele.checked) {
        ele.click();
      }
    } else {
      if (ele.checked) {
        ele.click();
      }
    }
      
    });
    this.setState({
      isAllSelected: !this.state.isAllSelected
    })
  }

  checkAllSwitch(arr) {
    // 判断当前files对象，是否是全部都为enable或者存在一个不是enable
    // 因此，该函数只应该在enable配置文件时调用以检测
    let bool = arr.filter((item) => {
      return item[1].enable === true;
    }).length - arr.length >= -1;
    return this.state.isAllSelected || bool;
  }


  switchStatus(file, enable, port, type) {
    
    const files = this.state.files;
    const actionType = !enable ? 'enableFile':'disableFile';
    const me = this;
    const fileType = {fileType: type, filePath: file};
    let isAllSelected = true;
    if ('disableFile' === actionType) {
      isAllSelected = false;
    } else {
      let bool = !this.checkAllSwitch(Object.entries(files));
      if (bool) {
        isAllSelected = false;
      }
    }
    files[file].enable = !enable;

    fetch('http://127.0.0.1:' + port + '/api?action='+actionType +'&params='+JSON.stringify(fileType)).then(function (res) {
      me.setState({
        files,
        isAllSelected
      });
    }).catch(function (err) {
      console.log(err);
    });

    return false;
  }



  renderDialog() {
    let {fileInfo, fileType, disabled} = this.state;
    console.log('fileType', fileType, disabled);
    if (fileInfo) {
      let {status, message, data} = fileInfo;
      console.log('test', status);
      if (status === 0) {
        console.log(1111);
        return (
          <Modal title={`Edit or Look ${fileType} file`}
            btnHandler={this.saveFile.bind(this, fileType)}
            onClose={this.onModalClose}
            btnText="Save"
            showOKBtn={!disabled}>
              <MonacoEditor
                ref = {(ele) => this.editor = ele}
                value = {data.content || ''}
                disabled = {disabled}
              />
            </Modal>
        );
      } else {
        return null;
      }

      // if (status === 0) {
      //   return (
      //     <Modal title={`Edit ${fileType} file`} btnHandler={this.saveFile.bind(this, fileType)} onClose={this.onModalClose} btnText="Save" showOKBtn={!disabled}>
      //       <div style={{width: '720px', height: '50vh', overflow: 'auto'}}>
      //         <SimpleEditor ref={o => this.editor = o} value={data.content || ''} disabled={disabled} />
      //       </div>
      //     </Modal>
      //   )
      // } else {
      //   return null;
      // }
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
    let content = this.editor.getValue();
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
      });
      setTimeout(()=>{
        location.reload();// 刷新页面，获取最新的配置
      } , 1000);
    })
    .catch(err => {
      this.setState({
        fileInfo: err
      })
    })
  }
}