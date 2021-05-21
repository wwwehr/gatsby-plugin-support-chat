import * as React from "react"
import { useState, useEffect, useRef } from "react"
import * as styles from "./dialog.module.css"
import colors from "./colors"
import Form from "./form"
import { useSupportChat } from "./hooks"

export default function Dialog({ open, options, closeChat, ...rest }) {
  const conversation = useRef(null)
  const [messages, sendMessage, userID] = useSupportChat()

  // todo: scroll
  useEffect(() => {}, [messages.length])

  const handleSubmit = text => {
    // placeholder
    sendMessage(text)

    // scroll to bottom
    if (!conversation.current) return
    setTimeout(() => {
      conversation.current.scrollTop = conversation.current.scrollHeight
    }, 100)
  }

  const title = options.title || "👋 Hello! How can we help?"

  return (
    <>
      <div
        style={{
          display: open ? "block" : "none",
        }}
        className={styles.overlay}
        onClick={closeChat}
      />
      <div
        style={{
          display: open ? "flex" : "none",
        }}
        className={["gatsby-plugin-chat-bot", styles.root].join(" ")}
      >
        <header
          style={{
            color: "white",
            backgroundColor: colors.blue,
          }}
          className={styles.header}
        >
          <h2 className={styles.title}>{title}</h2>
          <button
            className={styles.close}
            title="Close chat"
            onClick={closeChat}
          >
            ×
          </button>
        </header>
        <ul
          ref={conversation}
          className={styles.conversation}
          style={{
            backgroundColor: colors.lightGray,
            borderBottom: `1px solid ${colors.border}`,
          }}
        >
          {messages.map((message, i) => (
            <li
              key={i}
              style={
                message.sender === userID || message.sender === "USER"
                  ? {
                      color: "white",
                      backgroundColor: colors.blue,
                    }
                  : {
                      color: "black",
                      backgroundColor: colors.lightGray,
                    }
              }
              className={
                message.sender === userID || message.sender === "USER"
                  ? styles.userMessage
                  : styles.message
              }
            >
              {message.text}
            </li>
          ))}
        </ul>
        <Form onSubmit={handleSubmit} closeChat={closeChat} />
      </div>
    </>
  )
}