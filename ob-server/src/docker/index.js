require('dotenv').config();
const Utils = require('../utils/utils.js');
const host = process.env.DOCKER_IP;
const port = process.env.DOCKER_PORT;

module.exports = {
    async getAllImages(){
        return new Promise((resolve, reject) => {
            const httpOptions = {
                host: host,
                path: `/images/json`,
                port: port,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            };

            Utils.httpRequest(httpOptions)
            .then((data) => { 
                resolve(JSON.parse(data));
            })
            .catch((err) => {
                console.log(err.status);
                reject(JSON.parse(err));
            })
        })
    },

    async searchImage(name){
        return new Promise((resolve, reject) => {
            const httpOptions = {
                host: host,
                path: `/v1.24/images/search?term=${name}&limit=5`,
                port: port,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            };

            Utils.httpRequest(httpOptions)
            .then((data) => {
                resolve(JSON.parse(data));
            })
            .catch((err) => {
                console.log(err.status);
                reject(JSON.parse(err));
            })
        })
    },

    async pullImageFromHub(name, tag){
        return new Promise((resolve, reject) => {
            const httpOptions = {
                host: host,
                path: `/v1.24/images/create?fromImage=${name}=${tag}`,
                port: port,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
            };
            console.log(httpOptions);
            Utils.httpRequest(httpOptions)
            .then((data) => {
                resolve(JSON.parse(data));
            })
            .catch((err) => {
                console.log(err.status);
                reject(JSON.parse(err));
            })
        })

    }
}