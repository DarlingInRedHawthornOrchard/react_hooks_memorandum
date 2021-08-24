import React from 'react'

export default function Modal(props) {

  const { isShowModal, modalTitle, children } = props

  return (
    // 弹窗的大外壳组件
    <>
      {
        isShowModal ? 
        (
          <div className='modal'>
            <div className='inner'>
              <div className='m-header'>{ modalTitle }</div>
              <div className='content-wrapper'>
                { children }
              </div>
            </div>
          </div>
        )
        :
        ''
      }
    </>
  )
}