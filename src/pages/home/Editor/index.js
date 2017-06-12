/**
 * @file Editor component
 * @author zdying
 */

import AceEditor from 'react-ace';
import 'brace/mode/javascript';
import 'brace/theme/github';

import './styles.less';

export default ({title, subTitle, body}) => {
  let code = '127.0.0.1 text.example.com';

  return (
    <div className="">
      <AceEditor
        onChange={()=>{}}
        mode="javascript"
        theme="github"
        name="UNIQUE_ID_OF_DIV"
        editorProps={{$blockScrolling: true}}
      />
    </div>
  )
}