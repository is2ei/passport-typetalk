/* eslint-disable max-statements */

/**
 * Parse profile.
 *
 * @param {object|string} jsonObjectOrString
 * @return {object}
 * @access public
 */
exports.parse = (jsonObjectOrString) => {
    const profile = {};
    let jsonObject = {};

    if (typeof jsonObjectOrString === "string") {
        jsonObject = JSON.parse(jsonObjectOrString);
    } else {
        jsonObject = jsonObjectOrString;
    }

    profile.id = jsonObject.account.id;
    profile.name = jsonObject.account.name;
    profile.fullName = jsonObject.account.fullName;
    profile.suggestion = jsonObject.account.suggestion;
    profile.mailAddress = jsonObject.account.mailAddress;
    profile.imageUrl = jsonObject.account.imageUrl;
    profile.lang = jsonObject.account.lang;
    profile.timezoneId = jsonObject.account.timezoneId;
    profile.createdAt = jsonObject.account.createdAt;
    profile.updatedAt = jsonObject.account.updatedAt;

    return profile;
};
