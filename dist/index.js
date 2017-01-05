#!/usr/bin/env node
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _chalk = require("chalk");

var _chalk2 = _interopRequireDefault(_chalk);

var _child_process = require("child_process");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CMD = function () {
    function CMD(path, args) {
        _classCallCheck(this, CMD);

        this.path = path;
        this.args = args;
    }

    _createClass(CMD, [{
        key: "execute",
        value: function execute() {

            var childProcess = (0, _child_process.spawnSync)(this.path, this.args, {
                cwd: process.cwd(),
                stdio: 'inherit',
                env: process.env
            });

            if (childProcess.status !== 0) {
                if (childProcess.error) {
                    throw childProcess.error;
                }
                console.log(_chalk2.default.red('gitpp failed.'));
                process.exit(1);
            }
        }
    }]);

    return CMD;
}();

main();

function main() {
    console.log('Start running gitpp');
    new CMD(process.platform === 'win32' ? 'npm.cmd' : 'npm', ['run', 'prepull']).execute();
    new CMD('git', ['pull'].concat(process.argv.slice(2))).execute();
    console.log(_chalk2.default.green('done!'));
}
//# sourceMappingURL=index.js.map