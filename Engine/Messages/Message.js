import { TMessagePriority } from '../Common/types.js'

export default class Message {
  static assetLoaded = 'MESSAGE_ASSET_LOADED::'

  /**
   * Message Constructor
   *
   * @param {string} code The code of the message
   * @param {any} sender The sender of the message
   * @param {any} context Any context needed
   * @param {TMessagePriority} priority The priority of the message
   */
  constructor(code, sender, context, priority = 'NORMAL') {
    this.code = code
    this.sender = sender
    this.context = context
    this.priority = priority
  }

  /**
   * Checks if the passed in code matches to this code
   * @param {string} code The code the check for
   * @returns {boolean} True if there is a match
   */
  Is(code) {
    return this.code === code
  }
}
