var winston = require('winston');
var config = require('config');

module.exports = function(module) {
    var filename = module.id;    
    var logger = new (winston.Logger)({
      transports: [
        new (winston.transports.Console)({
          timestamp: function() {
            return Date.now();
          },
          formatter: function(options) {
            // Return string will be passed to logger.
            return options.timestamp() +' '+ options.level.toUpperCase() +' '+ (options.message ? options.message : '') +
              (options.meta && Object.keys(options.meta).length ? '\n\t'+ JSON.stringify(options.meta) : '' );
          }
        })
      ]
    });
        

    function log (level, msg, vars) {
        logger.log(level, filename + ' : ' + msg, vars); 
    }

            
    return {
        log : log,
        
        // Aliases
        debug : function (msg, vars) {
            log('debug', msg, vars);
        },
        info : function (msg, vars) {
            log('info', msg, vars);
        },
        warn : function (msg, vars) {
            log('warn', msg, vars);
        },
        error  : function (msg, vars) {
            log('error', msg, vars);
        },
    };
}
