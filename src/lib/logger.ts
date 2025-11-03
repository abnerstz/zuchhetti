type LogLevel = 'log' | 'info' | 'warn' | 'error';

class Logger {
  private isDevelopment = process.env.NODE_ENV !== 'production';

  private log(level: LogLevel, ...args: unknown[]): void {
    if (this.isDevelopment) {
      console[level](...args);
    }
  }

  info(...args: unknown[]): void {
    this.log('info', '[INFO]', ...args);
  }

  warn(...args: unknown[]): void {
    this.log('warn', '[WARN]', ...args);
  }

  error(...args: unknown[]): void {
    this.log('error', '[ERROR]', ...args);
    // Em produção, enviar para serviço de monitoramento (Sentry, LogRocket, etc)
    if (!this.isDevelopment) {
      // Placeholder para integração futura com serviço de erro
    }
  }

  debug(...args: unknown[]): void {
    this.log('log', '[DEBUG]', ...args);
  }
}

export const logger = new Logger();
