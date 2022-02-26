// # Junction
// Human Workflow Marketplace
// ## Entities
// - [Card](entities/Card.html)
// - [Dashboard](entities/Dashboard.html)
// - [Deck](entities/Deck.html)
// - [Dispatch](entities/Dispatch.html)
// - [Extension](entities/Extension.html)
// - [Marketplace](entities/Marketplace.html)
// - [Security](entities/Security.html)
// - [Site](entities/Site.html)
// - [Terms](entities/Terms.html)
// - [Workflow](entities/Workflow.html)
console.log('Junction - Human Workflow Marketplace');


// TEMP: REPL Design Reference Shape

// const repl = require('repl');

// function myEval(cmd, context, filename, callback) {
//     let result;
//     try {
//         result = vm.runInThisContext(cmd);
//     } catch (e) {
//         if (isRecoverableError(e)) {
//             return callback(new repl.Recoverable(e));
//         }
//     }
//     callback(null, cmd);
//   }
  
//   function isRecoverableError(error) {
//     if (error.name === 'SyntaxError') {
//       return /^(Unexpected end of input|Unexpected token)/.test(error.message);
//     }
//     return false;
// }

// repl.start({ prompt: 'junction> ', eval: myEval });