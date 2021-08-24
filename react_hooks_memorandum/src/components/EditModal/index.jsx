import React, { useRef } from 'react'

import Modal from '../Modal'


export default function EditModal(props) {

  const { isShowEditModal, data, submitEdit } = props

  const inputRef = useRef(),
        checkRef = useRef(),


  const formatNewData = () => {
    let inputVal = inputRef.current.value.trim()
    let valLength = inputVal.length
    if(valLength === 0) {   // 全删了，把原本的内容赋上去
      inputRef.current.value = data.content
      return
    }
    const newData = {
      id: new Date().getTime(),
      content: inputVal,
      completed: checkRef.current.checked
    }
    submitEdit(newData, data.id)
  }

  return (
    <Modal
      isShowModal={ isShowEditModal }
      modalTitle='编辑事件'
    >
      <p className='topic'>时间:{ data.id }</p>
      <p className='topic'>
        <textarea
          ref={ inputRef }
          defaultValue={ data.content }
        ></textarea>
      </p>
      <p className='topic'>
        状态：
        <input 
          type="checkbox" 
          defaultChecked={ data.completed ? true : false }  
          ref={ checkRef }
        />
      </p>
      <p className='topic'>
        <button
          className='btn btn-primary confirm-btn'
          onClick={ formatNewData }
        >
          提交
        </button>
      </p>
    </Modal>
  )
}