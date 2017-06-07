const CONFIG_FILE_NAME = './config.json';
const SAMPLE_CONFIG_FILE_NAME = './sample_config.json';
const SAMPLE_TOKEN = 'YOUR TOKEN HERE';

var assert = require('assert');
var fs = require('fs');
var Fetcher = require('../logic_js/fetcher.js');
var Helper = require('../logic_js/helper.js');

var f = null;

describe('Fetcher Test Suite', function() {

	describe('Read config file', function(){
		before(function() {
			var config = { 'access_token': SAMPLE_TOKEN };
			var config_content = JSON.stringify(config);

			fs.writeFileSync(SAMPLE_CONFIG_FILE_NAME, config_content);

			conf = Helper.parse_config(SAMPLE_CONFIG_FILE_NAME);
			f = new Fetcher(conf);
		});

		after(function() {
			fs.unlinkSync(SAMPLE_CONFIG_FILE_NAME);
		});

		it('_get_access_token() is not null', function() {
			assert.notEqual(f._get_access_token(), null, '_get_access_token() is null');
		});

		it('_get_access_token() has same token as ' + SAMPLE_CONFIG_FILE_NAME, function() {
			assert.equal(f._get_access_token(), SAMPLE_TOKEN, 'Token is not equal to config file.');
		});
	});

	describe('Integration test with API', function(){
		before(function() {
			
			var config = { 'access_token': process.env.PUSHBULLETRON_MOCHA_ACCESS_TOKEN, 
							'push_endpoint_url': process.env.PUSHBULLETRON_MOCHA_PUSH_ENDPOINT_URL };

			f = new Fetcher(config);
		});


		it('get_pushes() is not null', function(done) {
			f.get_pushes(function(pushes){
				if(typeof pushes == 'error') done(pushes);
				else {
					assert.notEqual(pushes, null);
					done();
				}
			});
		});

		it('pushes contains keys', function(done) {
			var required_keys = ['iden', 'modified', 'type', 'direction',
				'target_device_iden', 'title' ];

			f.get_pushes(function(pushes){
				if(typeof pushes == 'error'){
					done(pushes);
				}
				else {
					var sample_push = pushes['pushes'][0];
					var has_all_keys = required_keys.every(function(element, index, array){
						return sample_push.hasOwnProperty(element);
					});

					assert.ok(has_all_keys, 'pushes does not contain some keys');
					done();
				}
			});
		});

		it('pushes only receive self direction', function() {

		});

	});
});
