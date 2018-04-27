# MultiSelectPanel组件

## 安装

`npm i react-multi-select-panel`

## 组件API

- `leftSelects: [Arrary]` ： `Checkbox`的 `name` ；
- `rightSelects: [Arrary]` ： 当前选定的值，请使用数组；
- `submitFun: [Function]` : 回调确定按钮的函数可接受当前情况下的左侧数据和右侧数据 `submitFun(leftSelects, rightSelects)`；
- `cancelFun: [Function]` : 回调取消按钮的函数可接受当前情况下的左侧数据和右侧数据，参数同上
- `warpClass: [String]` : 自定义外层类名

## `leftSelects` 和 `rightSelects` 参数示例，本根据现有业务参考，如有需求联系作者修改

```
{
  leftSelects: [
    {id: '606923582', title: '哈哈哈测试上传配图绑定'},
    {id: '606923178', title: '测试计划计划'},
    {id: '606923170', title: '测试计划计划'}
  ],
  rightSelects: [
    {id: '606922897', title: 'kkkk'},
    {id: '606922825', title: '新的乱买词'},
    {id: '606921622', title: '21新增的移动计划112312311'},
    {id: '606921621', title: '测试测试...1'},
    {id: '606921233', title: '客户端测试 计划hhh'},
    {id: '606919079', title: '2222'},
    {id: '606919078', title: '多线程计划'},
    {id: '606918743', title: '1233456789'},
    {id: '606918698', title: 'test_kune90909'}
  ]
}
```

## 左右多选Select组使用方法

```
import React, { Component } from 'react';
import MultiSelectPanel from './components/MultiSelectPanel';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      noSelectedOptions: [
        {id: '606923582', title: '哈哈哈测试上传配图绑定'},
        {id: '606923178', title: '测试计划计划'},
        {id: '606923170', title: '测试计划计划'}
      ],
      selectedOptions: [
        {id: '606922897', title: 'kkkk'},
        {id: '606922825', title: '新的乱买词'},
        {id: '606921622', title: '21新增的移动计划112312311'},
        {id: '606921621', title: '测试测试...1'},
        {id: '606921233', title: '客户端测试 计划hhh'},
        {id: '606919079', title: '2222'},
        {id: '606919078', title: '多线程计划'},
        {id: '606918743', title: '1233456789'},
        {id: '606918698', title: 'test_kune90909'}
      ],
      showSelects: false
    }
  }
  render() {
    const {noSelectedOptions, selectedOptions, showSelects} = this.state;
    return (
      <div className="App">
        <button onClick={()=>this.btnClick()}>打开MultiSelectPanel组件</button>
        { showSelects &&
          <MultiSelectPanel
           leftSelects={noSelectedOptions}
           rightSelects={selectedOptions}
           submitFun={(left,right)=>this.panelSubmit(left, right)}
           cancelFun={()=>this.panelcancel()}
           // warpClass={'tianye'}
          />
        }
      </div>
    );
  }

  btnClick() {
    const {showSelects} = this.state;
    this.setState({showSelects: !showSelects})
  }

  panelSubmit(l,r) {
    console.log(Object.keys(r))
  }

  panelcancel() {
    this.btnClick()
  }
}

export default App;


```