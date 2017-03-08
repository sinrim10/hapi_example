/**
 * Created by lsk on 2017. 3. 5..
 */

'use strict';
const config = require('./controller');

function names(){
    "use strict";
    return {
        cache: { expiresIn: 5000 },
        handler: config.config
    };
}

module.exports = {
    names: names
};