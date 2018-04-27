import React from 'react';
import _     from 'lodash';
import cx    from 'classnames';

require('./index.css')

class MultiSelectPanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      leftSelects:{},
      rightSelects:{}
    }
  }

  componentDidMount() {
    this.initData();
  }

  render() {
    const {leftSelects, rightSelects} = this.state;
    const {warpClass} = this.props;

    return (
      <div className={cx('multi-select-panel',{[warpClass]: warpClass})}>
        <div className="left-selects">
          {this.renderSelectList('leftSelect', Object.values(leftSelects))}
        </div>
        <div className="middle-controllers">
          <button onClick={()=>this.addList()}>添加 </button>
          <button onClick={()=>this.removeList()}> 移除</button>
          <button onClick={()=>this.controlAll('add')}>添加全部 </button>
          <button onClick={()=>this.controlAll('remove')}> 移除全部</button>
        </div>
        <div className="right-selects">
          {this.renderSelectList('rightSelect', Object.values(rightSelects))}
        </div>
        <div className="confirm-selects">
          <button onClick={()=>this.returnClick('confirm')}>确定</button>
          <button onClick={()=>this.returnClick('cancel')}>取消</button>
        </div>
      </div>
    );
  }

  returnClick(type) {
    const {submitFun, cancelFun} = this.props;
    const {leftSelects, rightSelects} = this.state;
    
    if (type === 'confirm' && submitFun && typeof submitFun === 'function') {
      submitFun(leftSelects, rightSelects);
    }
    if (type === 'cancel' && cancelFun && typeof cancelFun === 'function') {
      cancelFun(leftSelects, rightSelects);
    }
  }

  initData() {
    const {leftSelects, rightSelects} = this.props;
    if (leftSelects || rightSelects) {
      this.setInitState('leftSelects',leftSelects);
      this.setInitState('rightSelects',rightSelects);
    }
  }

  setInitState(name,date) {
    if (!date) return;
    const newDate = {}
    date.forEach((item) => {
      if (item.id) {
        newDate[item.id] = item;
      }
    })
    this.setStateWith(name, newDate);
  }

  renderSelectList(name,selects) {
    if (name && selects) {
      return(
        <select name={name} ref={name} multiple={true} onChange={(e)=> this.getSelected(e)}>
          {selects.map((item, index) => {
            return <option key={index} value={item.id}>{item.title}</option>
          })}
        </select>
      )
    }
  }

  getSelected(e) {
    if (e.target){
      const {options, name} =  e.target;
      const readySelect = [];
      for(let i = 0; i< options.length; i++) {
        if(options[i].selected){
          readySelect.push(options[i].value)
        }
      }
      const readyName = 'ready' + name;
      this.setStateWith(readyName,readySelect);
    }
  }

  addList() {
    const {leftSelects, rightSelects, readyleftSelect} = this.state;
    const newLeft = Object.assign(leftSelects);
    const newRight = Object.assign(rightSelects);
    if (readyleftSelect && readyleftSelect.length) {
      const leftKeys = Object.keys(leftSelects);
      readyleftSelect.forEach((item)=>{
        if (leftKeys.indexOf(item)>=0) {
          newRight[item] = newLeft[item];
          _.unset(newLeft,item);
        }
      })
      this.setStateWith('leftSelects',newLeft);
      this.setStateWith('rightSelects',newRight);
      // 解决无法触发onChange问题
      this.allMoveSelected('leftSelect');
    }
  }

  removeList() {
    const {leftSelects, rightSelects, readyrightSelect} = this.state;
    const newLeft = Object.assign(leftSelects);
    const newRight = Object.assign(rightSelects);
    if (readyrightSelect && readyrightSelect.length) {
      const rightKeys = Object.keys(rightSelects);
      readyrightSelect.forEach((item)=>{
        if (rightKeys.indexOf(item)>=0) {
          newLeft[item] = newRight[item];
          _.unset(newRight,item);
        }
      })
      this.setStateWith('leftSelects',newLeft);
      this.setStateWith('rightSelects',newRight);
      // 解决无法触发onChange问题
      this.allMoveSelected('rightSelect');
    }
  }

  controlAll(type) {
    const {leftSelects, rightSelects} = this.state;
    
    let newLeft = {};
    let newRight = {};
    if (type === 'add') {
      newRight = Object.assign(rightSelects,leftSelects);
    }
    if (type === 'remove') {
      newLeft = Object.assign(leftSelects,rightSelects);
    }
    this.setStateWith('leftSelects',newLeft);
    this.setStateWith('rightSelects',newRight);
  }

  allMoveSelected(name) {
    const options = this.refs[name].options
    for( let i = 0; i < options.length; i++) {
      options[i].selected = false;
    }
  }

  setStateWith(name,value){
    if (name && value) {
      this.setState({[name]: value})
    }
  }
}

export default MultiSelectPanel;