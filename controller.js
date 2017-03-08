/**
 * Created by lsk on 2017. 3. 5..
 */
'use strict';

function config(req,reply){
    "use strict";
    return reply({ name: 'John' });
}

module.exports = {
    config : config
};