const repl = require('repl');

const replServer = repl.start({ prompt: '> ' });
class Command {
  constructor(replServer, options){
    this.moniker = options.moniker
    this.help = options.help
    this.replServer = replServer
  }

  initReplServer (){
      this.replServer.defineCommand(this.moniker, {
          help: this.help,
          action: this.action
      });
  }

  setAction(action){
      this.action = action
  }
}
