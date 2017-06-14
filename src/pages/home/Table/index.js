/**
 * @file Table component
 * @author zdying
 */

import './styles.less';

export default ({files, fileType}) => {
  console.log(files);
  return (
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
                  <button className="btn">Edit</button>
                  <button className="btn disabled">Disable</button>
                </td>          
              </tr>
            )
          })
        }
      </tbody>
    </table>
  )
}