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
					required: true
				},
				type: {
					type: String,
					required: true
				},
				value: {
					type: Number,
					required: true
				}
			}, { _id: false }),
			required: true,
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
