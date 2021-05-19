import * as React from 'react'
import { useState, useEffect, useRef } from 'react'
import * as styles from './dialog.module.css'
import colors from './colors'
import SendIcon from './send-icon'

export default function Dialog ({
  options,
  closeChat,
  ...rest
}) {
  const [text, setText] = useState('')
  const conversation = useRef(null)
  const input = useRef(null)

  // placeholder
  const [messages, setMessages] = useState([
    {
      user: 'bot',
      text: 'Hello! How can we help you?',
      time: Date.now(),
    },
  ])

  const handleTextChange = e => {
    const { value } = e.target
    setText(value)
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (text === '') return
    // placeholder
    setMessages([ ...messages, {
      time: Date.now(),
      text,
      sender: 'user',
    } ])
    setText('')

    if (input.current) input.current.focus()
    // scroll to bottom
    if (!conversation.current) return
    setTimeout(() => {
      conversation.current.scrollTop = conversation.current.scrollHeight
    }, 100)
  }

  const handleKeyPress = e => {
    switch (e.key) {
      case 'Enter':
        if (e.shiftKey) return
        e.preventDefault()
        handleSubmit(e)
        break
      default:
        break
    }
  }

  const handleKeyDown = e => {
    switch (e.key) {
      case 'Escape':
        closeChat()
        break
    }
  }

  useEffect(() => {
    if (!input.current) return
    input.current.focus()
  }, [])

  const title = options.title || '👋 Hello! How can we help?'

  return (
    <>
      <div
        className={styles.overlay}
        onClick={closeChat}
      />
      <div className={['gatsby-plugin-chat-bot', styles.root].join(' ')}>
        <header
          style={{
            color: 'white',
            backgroundColor: colors.blue,
          }}
          className={styles.header}>
          <h2 className={styles.title}>
            {title}
          </h2>
          <button
            className={styles.close}
            title='Close chat'
            onClick={closeChat}>
            ×
          </button>
        </header>
        <ul
          ref={conversation}
          className={styles.conversation}
          style={{
            backgroundColor: colors.lightGray,
            borderBottom: `1px solid ${colors.border}`,
          }}>
          {messages.map(message => (
            <li key={message.time}
              style={message.sender === 'user' ? {
                color: 'white',
                backgroundColor: colors.blue,
              } : {
                color: 'black',
                backgroundColor: colors.lightGray,
              }}
              className={message.sender === 'user' ? styles.userMessage : styles.message}>
              {message.text}
            </li>
          ))}
        </ul>
        <form
          className={styles.form}
          onSubmit={handleSubmit}>
          <textarea
            id='chat-message'
            name='chat-message'
            aria-label='Message'
            ref={input}
            className={styles.input}
            rows='3'
            value={text}
            onChange={handleTextChange}
            onKeyPress={handleKeyPress}
            onKeyDown={handleKeyDown}
            placeholder='Type a message...'
          />
          <button
            title='Send'
            className={styles.button}
            style={{
              color: colors.darkGray,
            }}>
            <SendIcon />
          </button>
        </form>
      </div>
    </>
  )
}
