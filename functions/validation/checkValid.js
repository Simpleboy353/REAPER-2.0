const config = require("../../config.json")
const chalk = require("chalk")

/**
 * Checks if the proper values have been provided in the config.json file!
 */

async function checkValid() {
    if (!config.OWNER_ID) {
        console.log(
            chalk.bgYellowBright.black(
                "[WARN] OWNER_ID_WAS_NOT_FOUND"
            )
        )
    }
    if (!config.BOT_TOKEN) {
        throw ReferenceError(
            chalk.bgRedBright.black(
                "[CONFIG_ERR] BOT_TOKEN_WAS_NOT_FOUND"
            )
        )
    }
    if (!config.mongoPass) {
        throw ReferenceError(
            chalk.bgRedBright.black(
                "[CONFIG_ERR] MONGO_DB_CONNECTION_URL_WAS_NOT_FOUND"
            )
        )
    }
    if (!config.ERROR_LOGS_CHANNEL) {
        throw ReferenceError(
            chalk.bgRedBright.black(
                "[CONFIG_ERR] ERROR_LOGS_CHANNEL_ID_WAS_NOT_FOUND"
            )
        )
    }
    if (!config.ALEXFLIPNOTE_API_KEY) {
        console.log(
            chalk.bgYellowBright.black(
                "[WARN] ALEXFLIPNOTE_API_KEY_WAS_NOT_FOUND"
            )
        )
    }
    if (!config.YT_COOKIE) {
        console.log(
            chalk.bgYellowBright.black(
                "[WARN] YT_COOKIE_WAS_NOT_FOUND"
            )
        )
    }
    if (!config.tenorAPI) {
        console.log(
            chalk.bgYellowBright.black(
                "[WARN] TENOR_API_KEY_WAS_NOT_FOUND"
            )
        )
    }
    if (!config.DEFAULT_PREFIX) {
        throw ReferenceError(
            chalk.bgRedBright.black(
                "[CONFIG_ERR] DEFAULT_PREFIX_WAS_NOT_FOUND"
            )
        )
    }
}

module.exports = {
    checkValid
}
