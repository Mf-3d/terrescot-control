const path = require('path');
const {platform,homedir} = require("os");
const fs = require('fs');
const request = require('request');

var config_path;
var config;

function get_config () {
    switch (platform()) {
        case "win32":
            config_path = path.join(homedir(), "AppData", "Roaming", "terrescot", "config.json");
            break;
        case "darwin":
            config_path = path.join(homedir(), "Library", "Application Support", "terrescot", "config.json");
            break;
        case "linux":
            config_path = path.join(homedir(), ".config", "terrescot", "config.json");
            break; 
        default:
            config_path = path.join(homedir(), ".config", "terrescot", "config.json");
            break;
    }
}

module.exports = {
    get: {
        config_path: () => {
            get_config();
            return config_path;
        },
        port: () => {
            get_config();

            config = JSON.parse(fs.readFileSync(config_path, {
                encoding: 'utf-8'
            }));

            return config.config.port;
        }
    },
    post: {
        read_rss: () => {
            get_config();
            var URL = `http://localhost:${config.config.port}/soleil_api/run_function`;

            request.post({
                uri: URL,
                headers: { "Content-type": "application/json" },
                json: {
                    function: 'read_rss'
                }
            }, (err, res, data) => {
                console.log('Data: \n' + data + '\nError: \n' + err);
            });
        },
        alarm: () => {
            get_config();
            var URL = `http://localhost:${config.config.port}/soleil_api/run_function`;

            request.post({
                uri: URL,
                headers: { "Content-type": "application/json" },
                json: {
                    function: 'alarm'
                }
            }, (err, res, data) => {
                console.log('Data: \n' + data + '\nError: \n' + err);
            }); 
        }
    }
}