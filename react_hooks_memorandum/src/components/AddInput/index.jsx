import React, { useRef } from 'react'

import './index.scss'

export default function AddInput(props) {

  const { isInputShow, addItem } = props

  const inputRef = useRef()

  const submitVal = () => {
    let inputVal = inputRef.current.value.trim()
    if(inputVal.length === 0) {
      return
    }
    addItem(inputVal)
  }

  return (
    <>
      {
        isInputShow ? 
        (
          <div className='input-wrapper'>
            <input 
              type="text"
              placeholder='请输入待办事件'
              ref={ inputRef }
            />
            <button
              className='btn btn-primary'
              onClick={ submitVal }
            >
              增加
            </button>
          </div>
        )
        :
        ''
      }
    </>
  )
}