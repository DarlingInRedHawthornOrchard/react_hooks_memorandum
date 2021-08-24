import React, { useState, useCallback, useEffect } from 'react'
import './App.css'

import MyHeader from './components/Header'
import AddInput from './components/AddInput';
import TodoItem from './components/TodoItem';
import CheckModal from './components/Modal/CheckModal';
import EditModal from './components/EditModal';
import NoDataTip from './components/NoDataTip';

function App() {

  const [ isInputShow, setIsInputShow ] = useState(false),
        [ todoList, setTodoList ] = useState([]),
        [ isShowCheckModal, setIsShowCheckModal ] = useState(true),
        [ currentData, setCurrentData ] = useState({}),
        [ isShowEditModal, setIsShowEditModal ] = useState(false)

  useEffect(() => {
    const todoData = JSON.parse(localStorage.getItem('todoData') || [])
    setTodoList(todoData)
  }, [])    // 挂载和更新时去localStorage中取todoList

  useEffect(() => {
    localStorage.setItem('todoData', JSON.stringify(todoList))
  }, [todoList])    // todoList更新时，实时存入localStorage
  
  const addItem = useCallback((value) => {
    // 父组件更新了，useCallback缓存的函数不变化，子组件props中这个函数就没变化，那props就没变化，子组件不更新
    const dataItem = {
      id: new Date().getTime(),
      content: value,
      completed: false
    }
    setTodoList(todoList => [...todoList, dataItem])
    setIsInputShow(false)   // 添加完一条数据，把Input框隐藏
  }, []) 

  const openCheckModal = useCallback((id) => {
    setCurrentData(() => todoList.filter(item => item.id === id)[0])
    setIsShowCheckModal(true)     
  }, [todoList])

  const openEditModal = useCallback((id) => {
    setCurrentData(() => todoList.filter(item => item.id === id)[0])
    setIsShowEditModal(true)
  }, [todoList])

  const submitEdit = useCallback((newData, id) => {
    setTodoList(todoList => todoList.map((item) => {
      if(item.id === id) item = newData
      return item
    }))
    setIsShowEditModal(false)   // 提交完毕，关闭编辑弹窗
  }, [])

  const completeItem = useCallback((id) => {
    setTodoList(todoList => {
      todoList.map(item => {
        if(item.id === id) item.completed = !item.completed
      })
      return item
    })
  }, [todoList])

  const removeItem = useCallback((id) => {
    setTodoList(todoList => {
      todoList.filter(item => {
        return item.id !== id
      })
    })
  }, [todoList])

  return (
    <div className='App'>
      <CheckModal 
        isShowCheckModal={ isShowCheckModal }
        closeModal={ () => setIsShowCheckModal(false) }
        data={ currentData }
      />
      <EditModal 
        isShowEditModal={ isShowEditModal }
        data={ currentData }
        submitEdit={submitEdit}
      />
      <MyHeader 
        openInput={ () => setIsInputShow(!isInputShow) }
      />
      <AddInput 
        isInputShow={ isInputShow }
        addItem={ addItem }
      />

      {
        !todoList || todoList.length === 0 ?
        <NoDataTip />
        :
        <ul className='todo-list'>
        {
          todoList.map((item, index) => {
            return (
              <TodoItem 
                data={ item }
                key={ index }
                openCheckModal={ openCheckModal }
                openEditModal={ openEditModal }
                completeItem={ completeItem }
                removeItem={ removeItem }
              />
            )
          })
        }
      </ul>
      }
    </div>
  );
}

export default App;
