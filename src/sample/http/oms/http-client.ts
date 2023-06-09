import { FixmlSession } from '../../../transport/fixml/fixml-session'
import { MsgView } from '../../../buffer/msg-view'
import { IJsFixLogger } from '../../../config/js-fix-logger'
import { IJsFixConfig } from '../../../config/js-fix-config'
import { Side } from '../../../types/FIXML50SP2/enum/all-enum'
import { OmsFactory } from './oms-factory'

export class HttpClient extends FixmlSession {
  private readonly logger: IJsFixLogger
  private readonly fixLog: IJsFixLogger
  private readonly factory: OmsFactory = new OmsFactory('TradersRUs')
  constructor (public readonly config: IJsFixConfig,
               public readonly logoutSeconds: number = 45) {
    super(config)
    this.logReceivedMsgs = true
    this.fixLog = config.logFactory.plain(`jsfix.${config.description.application.name}.txt`)
    this.logger = config.logFactory.logger(`${this.me}`)
  }

  protected onApplicationMsg (msgType: string, view: MsgView): void {
    // dispatch messages
    this.logger.info(view.toJson())
    switch (msgType) {
      case 'BizMsgRej': {
        this.logger.warning('received rejection')
        break
      }
    }
  }

  // use msgType for example to persist only trade capture messages to database
  protected onDecoded (msgType: string, txt: string): void {
    this.fixLog.info(txt)
  }

  protected onEncoded (msgType: string, txt: string): void {
    this.fixLog.info(txt)
  }

  protected onLogon (view: MsgView, user: string, password: string): boolean {
    return true
  }

  protected onReady (view: MsgView): void {
    this.logger.info('onReady')
    const logoutSeconds = this.logoutSeconds
    const req = this.factory.createOrder('IBM', Side.Buy, 10000, 100.12)
    this.send('NewOrderSingle', req)
    this.logger.info(`will logout after ${logoutSeconds}`)
    setTimeout(() => {
      this.done()
    }, 11 * 1000)
  }

  protected onStopped (): void {
    this.logger.info('stopped')
  }
}
