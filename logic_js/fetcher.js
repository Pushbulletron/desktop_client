var request = require('request');

const RESPONSE_KEY_CURSOR = "cursor";
const ACCESS_TOKEN_KEY = "access_token";
const PUSH_ENDPOINT_URL_KEY = "push_endpoint_url";

class Fetcher {


	constructor(config){
		this._conf = config;
	}

	/**
	 * @param {function} callback - which accepts 1 argument, which is * * the decoded JSON pushes array.
	 * @return {Array<Object>} pushes - Array of Object as described by * Pushbullet Push documentation: https://docs.pushbullet.com/#push
	 */
	get_pushes(callback){
		var token = this._get_access_token();
		var pushes;

		console.log('Requesting Pushes with Key: ' + this._conf[ACCESS_TOKEN_KEY]);

		var options = {
			url: this._conf[PUSH_ENDPOINT_URL_KEY],
			headers: {
				'Access-Token': token
			},
			params: {
				'limit': 5
			}
		};

		request(options, function(error, response, body) {
			if(response.statusCode == 200){
				pushes = JSON.parse(body);
			} else {
				pushes = Error('Status Code: ' + response.statusCode);
			}
			callback(pushes);
		});
	}

	/**
	 * @return {Array<Object>} devices - Array of Devices as described by Pushbullet Device documentation
	 */
	get_devices(){
		var devices = [];
		return devices;
	}

	/**
	 * @return {String} access_token - Get the access_token from CONFIG_PATH
	 */
	_get_access_token(){
		return this._conf[ACCESS_TOKEN_KEY];
	}
};

module.exports = Fetcher;
