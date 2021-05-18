import * as React from 'react'
import { useState } from 'react'
import loadable from '@loadable/component'
import * as styles from './widget.module.css'
import colors from './colors'

const Dialog = loadable(() => import('./dialog'))

export default function Widget () {
  const [open, setOpen] = useState(false)

  const toggleChat = e => {
    setOpen(!open)
  }

  const closeChat = e => {
    setOpen(false)
  }

  return (
    <div className={styles.root}>
      {open && (
        <Dialog
          closeChat={closeChat}
        />
      )}
      <button
        className={styles.button}
        style={{
          color: 'white',
          backgroundColor: colors.blue,
        }}
        onClick={toggleChat}>
        Chat
      </button>
    </div>
  )
}
