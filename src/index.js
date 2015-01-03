var requireAll = require('require-all');

function toCamelCase(string){
  return string.replace(/_([a-z])/g, function (g) {
    return g[1].toUpperCase();
  });
}

class BridgesController {
  
  static load(options) {
    var controllers = {}
    var requireOptions = {
      dirname : options.directory,
      filter: /(.+)\.js$/
    }
    if (options.inject) {
      requireOptions.resolve = function(controller) {
        return controller.apply(this, options.inject)
      }
    }
    var objects = requireAll(requireOptions)
    for (name in objects){
      controllers[toCamelCase(name)] = objects[name]
    }
    return controllers
  } 
}   
  
module.exports = BridgesController