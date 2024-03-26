import { Injectable, LogLevel, LoggerService } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class MyLogger implements LoggerService {
  private _currentDate = () => new Date().toJSON().slice(0, 10);
  private _currentTime = () => new Date().toJSON().slice(11, 19);
  private _logPath = path.join(
    __dirname,
    '..',
    '..',
    'src',
    'logs',
    `${this._currentDate()}.txt`,
  );
  private _errorLogPath = path.join(
    __dirname,
    '..',
    '..',
    'src',
    'logs',
    `err_${this._currentDate()}.txt`,
  );

  log(message: string) {
    throw new Error('Method not implemented.');
  }
  logRequest(url: string, body: string, query: string) {
    const formRequestData = `[REQUEST] ${this._currentTime()} - URL: ${url}, BODY: ${body}, QUERY: ${query} \n`;
    fs.appendFileSync(this._logPath, formRequestData);
  }
  logResponse(statusCode: number) {
    const formResponseData = `[RESPONSE] ${this._currentTime()} - Status code - ${statusCode} \n`;
    fs.appendFileSync(this._logPath, formResponseData);
  }
  error(message: string) {
    const formErrorData = `**ERROR** - ${this._currentTime()} - ${message} \n`;
    fs.appendFileSync(this._errorLogPath, formErrorData);
  }
  warn(message: string) {
    console.log(message);
  }
  debug?() {
    throw new Error('Method not implemented.');
  }
  verbose?() {
    throw new Error('Method not implemented.');
  }

  setLogLevels?(levels: LogLevel[]) {
    throw new Error('Method not implemented.');
  }
}
