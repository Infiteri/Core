import { ENodeState } from '../Common/enums.js'
import { Matrix4x4 } from '../Math/Matrix4x4.js'
import { Transform } from '../Math/Transform.js'
import { BaseScript } from '../Script/BaseScript.js'
import ScriptManager from '../Script/ScriptManager.js'
import { Component } from './Components/Component.js'

export default class Node {
  static id = -1

  constructor(name = '') {
    //? Setup id
    Node.id++
    this.id = Node.id

    this.name = name
    this.tag = ''

    /** @type {Node} */
    this.parent = undefined

    /** @type {ENodeState} */
    this.state = 'UNINITIALIZED'

    /** @type {Node[]} */
    this.children = []

    /** @type {Component[]} */
    this.components = []

    /** @type {BaseScript[]} */
    this.scripts = []

    //Position
    this.transform = new Transform()

    this.worldMatrix = Matrix4x4.Identity()
    this.localMatrix = Matrix4x4.Identity()
  }

  AddComponent(componentInstance) {
    componentInstance.owner = this

    if (this.state === 'UPDATE') {
      componentInstance.Init()
    }

    this.components.push(componentInstance)
  }

  AddChild(childInstance) {
    this.OnAdded(childInstance)

    if (this.state === 'UPDATE') childInstance.Init()

    this.children.push(childInstance)
  }

  AddScript(scriptName) {
    const script = ScriptManager.Get(scriptName)

    script.owner = this

    if (this.state === 'UPDATE') script.Init()

    this.scripts.push(script)
  }

  GetChildByName(name = '') {
    if (this.name === name) return this

    for (const c of this.children) {
      let result = c.GetChildByName(name)

      if (result) return result
    }

    return null
  }

  GetChildByTag(tag = '') {
    if (this.tag === tag) return this

    for (const c of this.children) {
      let result = c.GetChildByTag(tag)

      if (result) return result
    }

    return null
  }

  Init() {
    this.state = 'INITIALIZING'

    for (const c of this.children) {
      c.Init()
    }

    for (const c of this.components) {
      c.Init()
    }

    for (const c of this.scripts) {
      c.Init()
    }

    this.state = 'UPDATE'
  }

  Render() {
    if (this.state !== 'UPDATE') return

    for (const c of this.children) {
      c.Render()
    }

    for (const c of this.components) {
      c.Render()
    }
  }

  Update() {
    if (this.state !== 'UPDATE') return

    for (const c of this.children) {
      c.Update()
    }

    for (const c of this.scripts) {
      c.Update()
    }

    // Update world matrix
    this.localMatrix = this.transform.GetMatrix()

    const parentMatrix = this.parent ? this.parent.worldMatrix : undefined
    if (parentMatrix) {
      this.worldMatrix = Matrix4x4.Multiply(this.localMatrix, parentMatrix)
    } else {
      this.worldMatrix.CopyFrom(this.localMatrix)
    }
  }

  OnAdded(child) {
    child.parent = this
  }
}
