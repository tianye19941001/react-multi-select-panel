# MultiSelectPanel组件

# 示例
![image](https://github.com/tianye19941001/react-multi-select-panel/blob/master/demo.gif?raw=true)

## 安装

`npm i react-multi-select-panel`

## 使用

```
import MultiSelectPanel from 'react-multi-select-panel';

require('react-multi-select-panel/index.css');
```

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
    {id: '6069231', title: '哈哈哈测试上传配图绑定'},
    {id: '6069232', title: '测试计划计划'},
    {id: '6069233', title: '测试计划计划'}
  ],
  rightSelects: [
    {id: '6069224', title: 'kkkk'},
    {id: '6069225', title: '新的乱买词'},
    {id: '6069216', title: '21新增的移动计划112312311'},
    {id: '6069217', title: '测试测试...1'},
    {id: '6069218', title: '客户端测试 计划hhh'},
    {id: '6069199', title: '2222'},
    {id: '6069191', title: '多线程计划'},
    {id: '6069182', title: '1233456789'},
    {id: '6069183', title: 'test_kune90909'}
  ]
}
```

## 左右多选Select组使用方法

```
import React, { Component } from 'react';
import MultiSelectPanel from 'react-multi-select-panel';

require('react-multi-select-panel/index.css')

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      noSelectedOptions: [
        {id: '6069231', title: '哈哈哈测试上传配图绑定'},
        {id: '6069232', title: '测试计划计划'},
        {id: '6069233', title: '测试计划计划'}
      ],
      selectedOptions: [
        {id: '6069224', title: 'kkkk'},
        {id: '6069225', title: '新的乱买词'},
        {id: '6069216', title: '21新增的移动计划112312311'},
        {id: '6069217', title: '测试测试...1'},
        {id: '6069218', title: '客户端测试 计划hhh'},
        {id: '6069199', title: '2222'},
        {id: '6069191', title: '多线程计划'},
        {id: '6069182', title: '1233456789'},
        {id: '6069183', title: 'test_kune90909'}
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