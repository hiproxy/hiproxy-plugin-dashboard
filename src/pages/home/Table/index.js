/**
 * @file Table component
 * @author zdying
 */

import './styles.less';

export default ({title, subTitle, body}) => {
  return (
    <table className="table table-striped table-hover">
      <thead>
        <tr>
          <th>name</th>
          <th>genre</th>
          <th>release date</th>
          <th>operate</th>
        </tr>
      </thead>
      <tbody>
        <tr className="">
          <td>The Shawshank Redemption</td>
          <td className="color-blue">Crime, Drama</td>
          <td>14 October 1994</td>
          <td>
            <button className="btn">Editor</button>
            <button className="btn">Order</button>
          </td>          
        </tr>
        <tr className="">
          <td>The Shawshank Redemption</td>
          <td className="color-blue">Crime, Drama</td>
          <td>14 October 1994</td>
          <td>
            <button className="btn">Editor</button>
            <button className="btn">Order</button>
          </td> 
        </tr>
        <tr className="">
          <td>The Shawshank Redemption</td>
          <td className="color-blue">Crime, Drama</td>
          <td>14 October 1994</td>
          <td>
            <button className="btn">Editor</button>
            <button className="btn">Order</button>
          </td>
        </tr>
      </tbody>
    </table>
  )
}