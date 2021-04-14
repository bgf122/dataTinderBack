const CryptoJS = require('crypto-js');
const fetch = require('node-fetch');

const { SECRET } = process.env;
const { APPID } = process.env;
const { APPKEY } = process.env;

const Program = require('../models/program');

// We need to get data from the program to be able to get mediaURL-data.
const getMediaData = async (id) => {
  const programObject = (await Program.findOne({ _id: id })).toJSON();
  const mediaID = await programObject.publicationEvent.find((event) => event.temporalStatus === 'currently');
  console.log(mediaID.id);
  return mediaID.id;
};
// Get encrypted link from YLE
const fetchEncrypted = async (mediaURL) => {
  const fetchedData = await fetch(mediaURL).then((res) => res.json());
  console.log(fetchedData);
  return fetchedData.data[0].url;
};

// Copied logic from https://developer.yle.fi/static/decrypt-url.js
const decrypt = async (url) => {
  const data = CryptoJS.enc.Base64.parse(url).toString(CryptoJS.enc.Hex);
  const key = CryptoJS.enc.Utf8.parse(SECRET);
  const iv = CryptoJS.enc.Hex.parse(data.substr(0, 32));
  const message = CryptoJS.enc.Hex.parse(data.substr(32));

  const options = {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  };

  const params = CryptoJS.lib.CipherParams.create({ ciphertext: message });
  const decryptedMessage = CryptoJS.AES.decrypt(params, key, options);
  return decryptedMessage.toString(CryptoJS.enc.Utf8);
};

exports.getMediaUrl = async (id) => {
  const mediaID = await getMediaData(id);
  const mediaURL = `https://external.api.yle.fi/v1/media/playouts.json?program_id=${id}&media_id=${mediaID}&protocol=HLS&app_id=${APPID}&app_key=${APPKEY}`;

  const encrypted = await fetchEncrypted(mediaURL);
  const decrypted = await decrypt(encrypted);
  console.log(decrypted);
  return decrypted;
};
