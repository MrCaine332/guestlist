const { IgApiClient } = require('instagram-private-api')

const instagram = {
    loggedInUser: null,
    ig: null,
}

instagram.init = async () => {
    try {
        if (!instagram.ig) {
            instagram.ig = new IgApiClient();
            instagram.ig.state.generateDevice(process.env.IG_USERNAME);
        }
        if (!instagram.loggedInUser) {
            instagram.loggedInUser = await instagram.ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD);
        }
    } catch (e) {
        console.log(e)
    }
}

module.exports = instagram