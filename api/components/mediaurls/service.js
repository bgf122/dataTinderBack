const CryptoJS = require("crypto-js");
const fetch = require("node-fetch");
const SECRET = process.env.SECRET;
const APPID = process.env.APPID;
const APPKEY = process.env.APPKEY;

const Program = require("../programs/model");

// We need to get data from the program to be able to get mediaURL-data.
const get_media_data = async (id) => {
	const mediaID = await Program.find({ id: id });
	return mediaID[0].publication_event.media.id;
};
// Get encrypted link from
const fetchEncrypted = async (mediaURL) => {
	const fetchedData = await fetch(mmediaURL).then((res) => res.json());
	return fetchedData.data[0].url;
};

exports.getMediaUrl = async (id) => {
	const mediaID = await get_media_data(id);
	const mediaURL = `https://external.api.yle.fi/v1/media/playouts.json?program_id=${id}&media_id=${mediaID}&protocol=HLS&app_id=${APPID}&app_key=${APPKEY}`;
	const encrypted = await fetchEncrypted(mediaURL);
	const decrypted = await decrypt(encrypted, SECRET);
	return decrypted;
};

// Copied logic from https://developer.yle.fi/static/decrypt-url.js
const decrypt = async (url, SECRET) => {
	const data = CryptoJS.enc.Base64.parse(url).toString(CryptoJS.enc.Hex);
	const key = CryptoJS.enc.Utf8.parse(SECRET);
	const iv = CryptoJS.enc.Hex.parse(data.substr(0, 32));
	const message = CryptoJS.enc.Hex.parse(data.substr(32));

	const options = {
		iv: iv,
		mode: CryptoJS.mode.CBC,
		padding: CryptoJS.pad.Pkcs7,
	};

	const params = CryptoJS.lib.CipherParams.create({ ciphertext: message });
	const decryptedMessage = CryptoJS.AES.decrypt(params, key, options);
	return decryptedMessage.toString(CryptoJS.enc.Utf8);
};
