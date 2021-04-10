const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
	{
		_id: {
			type: String,
			required: true
		},
		data: {
			type: new mongoose.Schema({
				programId: {
					type: String,
					required: false
				},
				type: {
					type: String,
					required: false
				},
				value: {
					type: Number,
					required: false
				}
			}, { _id : false }),
			required: false,
		},
		displayName: {
			type: String,
			required: true
		}
	},
	{
		collection: "userdata",
	}
);

module.exports = mongoose.model("User", userSchema);
