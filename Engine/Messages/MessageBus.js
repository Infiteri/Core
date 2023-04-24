import { TMessagePriority } from '../Common/types.js'
import Message from './Message.js'

class MessageSubscriptionNode {
  constructor(message, handler) {
    this.message = message
    this.handler = handler
  }

  Handle() {
    this.handler.OnMessage(this.message)
  }
}

export class MessageHandler {
  OnMessage(message) {}
}

export default class MessageBus {
  /** @type {Object.<string, MessageHandler[]>} */
  static subscriptions = {}

  /** @type {MessageSubscriptionNode[]} */
  static normalMessageQueue = []

  /**
   * Represents the amount of messages to be handled per frame
   */
  static normalMessagesPerUpdate = 100

  /**
   * Adds a new subscription (if needed) and adds a handler to it
   *
   * @param {string} code The code to register this handler under
   * @param {MessageHandler} handler The handler (a class with a OnMessage function on it)
   */
  static AddSubscription(code, handler) {
    if (!this.subscriptions[code]) {
      //Setup container
      this.subscriptions[code] = []
    }

    if (this.subscriptions[code].indexOf(handler) === -1) {
      this.subscriptions[code].push(handler)
    }
  }

  /**
   * Message Constructor
   *
   * @param {string} code The code of the message
   * @param {any} sender The sender of the message
   * @param {any} context Any context needed
   * @param {TMessagePriority} priority The priority of the message
   */
  static SendMessage(code, sender, context, priority = 'NORMAL') {
    const message = new Message(code, sender, context, priority)

    const handlers = this.subscriptions[code]

    if (!handlers) return

    for (const h of handlers) {
      if (priority === 'HIGH') {
        h.OnMessage(message)
      } else {
        //Queue it up
        const node = new MessageSubscriptionNode(message, h)
        this.normalMessageQueue.push(node)
      }
    }
  }

  static Update() {
    if (this.normalMessageQueue.length === 0) return

    // The looping length
    const length = Math.min(
      this.normalMessagesPerUpdate,
      this.normalMessageQueue.length
    )

    for (let i = 0; i < length; i++) {
      const node = this.normalMessageQueue.pop()
      node.Handle()
    }
  }
}
