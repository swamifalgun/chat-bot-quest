'use strict';

if (process.env.NODE_ENV === 'production') {
    module.exports = {
        access_token : process.env.access_token
    }
} else {
    module.export = require("./development.json")
}