const crypto = require("crypto");
const http = require("http");

const SECRET = process.env.SECRET;
const APPID = process.env.APPID;
const APPKEY = process.env.APPKEY;

exports.getMediaUrl = async (id) => {
	const options = {
		hostname: `https://external.api.yle.fi/v1/media/playouts.json?program_id=1-820561&media_id=6-8e9d45c1221544f3be76394fa1a6a102&protocol=HLS&app_id=${APPID}&app_key=${APPKEY}`,
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	};

	try {
		const res = await http.get(options, (res) => {
			return res;
		});
	} catch (err) {
		return "no bueno";
	}
};
