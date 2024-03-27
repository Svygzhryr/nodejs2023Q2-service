import { Injectable, LogLevel, LoggerService } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class MyLogger implements LoggerService {
  private _currentDate = () => new Date().toJSON().slice(0, 10);
  private _currentTime = () => new Date().toJSON().slice(11, 19);
  private _logPath = (index = 1, isErrorLog = false) =>
    path.join(
      __dirname,
      '..',
      '..',
      'src',
      'logs',
      `${isErrorLog ? 'err_' : ''}${this._currentDate()}_${index || 1}.txt`,
    );

  private _createLogFile(
    filePath: string,
    data: string,
    isError = false,
    index = 1,
  ) {
    fs.stat(filePath, (err, stats) => {
      if (err === null) {
        if (stats.size > +process.env.LOG_MAX_SIZE - 5000) {
          index++;
          this._createLogFile(
            this._logPath(index, isError),
            data,
            isError,
            index,
          );
        } else {
          fs.appendFileSync(this._logPath(index, isError), data);
        }
      } else if (err.code === 'ENOENT') {
        fs.appendFileSync(this._logPath(index, isError), data);
      } else {
        console.log('Something went wrong..');
      }
    });
  }

  log(message: string) {
    throw new Error('Method not implemented.');
  }
  logRequest(url: string, body: string, query: string) {
    const formRequestData = `${this._currentTime()} [REQUEST]  - URL: ${url}, BODY: ${body}, QUERY: ${query} \n`;
    this._createLogFile(this._logPath(), formRequestData);
  }
  logResponse(statusCode: number) {
    const formResponseData = `${this._currentTime()} [RESPONSE] - Status code - ${statusCode} \n`;
    this._createLogFile(this._logPath(), formResponseData);
  }
  error(message: string) {
    const formErrorData = `${this._currentTime()} **ERROR** - ${message} \n`;
    this._createLogFile(this._logPath(), formErrorData, true);
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
