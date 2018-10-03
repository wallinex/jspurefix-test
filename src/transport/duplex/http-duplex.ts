import { FixDuplex } from './fix-duplex'
import { Readable, Writable } from 'stream'
import { IHttpAdapter } from '../session-description'
import * as requestPromise from 'request-promise'

export class HttpDuplex extends FixDuplex {
  public constructor (public readonly adapter: IHttpAdapter) {
    super()
    this.readable = HttpDuplex.makeReadable()
    this.writable = this.makeWritable()
  }

  private static makeReadable (): Readable {
    const Readable = require('stream').Readable
    const reader = {
      read:  () => {
        // nothing
      }
    }
    return new Readable(reader)
  }

  private makeWritable (): Writable {
    const forward: Readable = this.readable
    const Writable = require('stream').Writable
    const writer = {
      write: async (data: Buffer, _: any, done: Function) => {
        try {
          const adapter = this.adapter
          const options = adapter.getOptions(data)

          requestPromise(options).then((message: any) => {
            const body = adapter.endMessage(message)
            forward.push(body)
          }).catch((err: Error) => {
            receiver.emit('error', err)
          })
        } catch (e) {
          done(e)
        }
      }
    }
    const receiver = new Writable(writer)
    return receiver
  }

  public end (): void {
    this.readable.push(null)
  }
}
