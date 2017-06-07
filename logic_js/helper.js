var Enum = require('Enum');
var fs = require('fs');

class Helper {
	constructor(){
		this.QUERY_TYPES = new Enum(['TIME', 'DEVICE']);
	}
	/**
	Takes 2 arguments:
	- Query Type: either by Time or Device which corresponds to the enum above
	- Query arguments
	Returns: [Push]
	**/
	filter(){

	}

	/**
	 * @param {String} config_path - This is the path to the config file
	 */
	static parse_config(config_path){
		var data = fs.readFileSync(config_path);
		return JSON.parse(data);
	}

}

module.exports = Helper;
