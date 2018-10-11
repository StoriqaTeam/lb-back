const request = require('request');
const config = require('config');

module.exports = {
    sendTx(currency, address, amount) {
        const method = `/tx/send?Currency=eth&Address=${address}&Amount=${amount}&SubtractFee=true`;
        const url = `${config.get('anypaycoins.url')}${method}`;
        console.log(url);
        return new Promise((resolve, reject) => {
            request
                .post({
                    url,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': config.get('anypaycoins.key')
                    }
                }, (err, res, body) => {
                    if (err) reject(err);
                    else {
                        const parsed_res = JSON.parse(body);
                        console.log("p", parsed_res);
                        if (parsed_res.Result)
                            resolve(parsed_res.Result);
                        else if (parsed_res.error)
                            reject(parsed_res.error);
                        else
                            reject("Something goes wrong while colibrypay method calling.");//*/
                    }
                });
        });
    }
};