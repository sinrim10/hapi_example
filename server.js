/**
 * Created by lsk on 2017. 3. 5..
 */
'use strict';

const Hapi = require('hapi');
const server = new Hapi.Server(); //서버 생성

const handle_config = require('./handle_config');

server.connection({
    host:'localhost',
    port:8080
}); //서버 설정

server.route({
    method:'GET',
    path:'/names',
    config:handle_config.names
});

server.route({
    method:'GET',
    path:'/',
    handler:(req,res) => res('hello')
}); //라우터 설정

server.route({
    method:'GET',
    path:'/test/{id}',
    handler:(req,reply) => reply('hello' + encodeURIComponent(req.params.id))
}); //라우터 설정


server.route({
    method:'POST',
    path:'/{id}',
    handler:(req,res) => res({
        id:encodeURIComponent(req.params.id), //content injection attacks
        method:'post'
    })
});

server.route({
    method:['POST','PUT'],
    path:'/hello/{id}',
    handler:(req,reply) => {
        reply({
            id:encodeURIComponent(req.params.id),
            method:req.method
        });
    }
});

//파라미터에 ? 붙임으로서 선택 파라미터
server.route({
    method: 'GET',
    path: '/hello/{user?}',
    handler: function (request, reply) {
        const user = request.params.user ? encodeURIComponent(request.params.user) : 'stranger';
        reply('Hello ' + user + '!');
    },
    config: {
        description: 'Say hello!',
        notes: 'The user parameter defaults to \'stranger\' if unspecified',
        tags: ['api', 'greeting']
    }
});
//선택적 파라미터 뒤에 경로가 올 수 없다.
// server.route({
//     method: 'GET',
//     path: '/hello/{user?}/users',
//     handler: function (request, reply) {
//         const user = request.params.user ? encodeURIComponent(request.params.user) : 'stranger';
//         reply('Hello ' + user + '!');
//     }
// });

//멀티형 파라미터
server.route({
    method: 'GET',
    path: '/hello/{user*2}',
    handler: function (request, reply) {
        const userParts = request.params.user.split('/');
        reply('Hello ' + encodeURIComponent(userParts[0]) + ' ' + encodeURIComponent(userParts[1]) + '!');
    }
});
//서버 start
server.start((err) => {
    if(err) {
        throw err;
    }
    console.log('Server running', server.info.uri);
});