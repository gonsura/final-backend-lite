export default class Logging {
  public static info = (args: any) =>
    console.log(`\x1b[34m[info] ${typeof args === 'string' ? args : ''}\x1b[0m`, typeof args === 'string' ? '' : args)

  public static warn = (args: any) =>
    console.log(`\x1b[33m[warn] ${typeof args === 'string' ? args : ''}\x1b[0m`, typeof args === 'string' ? '' : args)

  public static error = (args: any) =>
    console.log(`\x1b[31m[error] ${typeof args === 'string' ? args : ''}\x1b[0m`, typeof args === 'string' ? '' : args)
}
