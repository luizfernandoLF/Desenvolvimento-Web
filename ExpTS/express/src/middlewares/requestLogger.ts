import { Request, Response, NextFunction } from 'express';
import fs from 'fs'; 
import path from 'path'; 

type LogFormat = 'simples' | 'completo';

export function requestLogger(format: LogFormat) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const now = new Date().toISOString();
    const method = req.method;
    const url = req.url;

    let logEntry: string;

    if (format === 'simples') {
      logEntry = `${now} - ${method} ${url}`;
    } else {
      const httpVersion = req.httpVersion;
      const userAgent = req.get('User-Agent') || 'N/A'; 
      logEntry = `${now} - ${method} ${url} HTTP/${httpVersion} - ${userAgent}`;
    }

    const logFolderPath = process.env.LOG_FOLDER_PATH || 'logs'; 
    const logFilePath = path.join(logFolderPath, 'access.log');

    if (!fs.existsSync(logFolderPath)) {
      fs.mkdirSync(logFolderPath, { recursive: true });
    }


    fs.appendFile(logFilePath, logEntry + '\n', (err) => {
      if (err) {
        console.error('Erro ao salvar o log:', err);
      }
    });

    next();
  };
}