const config = require('config');
const axios = require('axios');

const apiUrl = config.get('sumsub.url');
const apiKey = config.get('sumsub.key');

module.exports = {

    async accessToken(userId) {
        try {
            const urlMethod = `${apiUrl}/resources/accessTokens?key=${apiKey}&userId=${userId}`;
            const response = await axios.post(urlMethod);

            return response.data.token;
        } catch (e) {
            console.log("KYC error", e.response.data.description);
        }

    }
};