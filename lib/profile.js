/**
 * Parse profile.
 * 
 * @param {object|string} json
 * @return {object}
 * @access public
 */
exports.parse = function(json) {
  if ('string' == typeof json) {
    json = JSON.parse(json);
  }

  var profile = {};
  profile.id = json.account.id;
  profile.name = json.account.name;
  profile.fullName = json.account.fullName;
  profile.suggestion = json.account.suggestion;
  profile.mailAddress = json.account.mailAddress;
  profile.imageUrl = json.account.imageUrl;
  profile.lang = json.account.lang;
  profile.timezoneId = json.account.timezoneId;
  profile.createdAt = json.account.createdAt;
  profile.updatedAt = json.account.updatedAt;

  return profile;
};
