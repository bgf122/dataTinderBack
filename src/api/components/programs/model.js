const mongoose = require("mongoose");

const programSchema = mongoose.Schema(
	{
		id: {
			type: String,
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
		transmission_title: {
			type: Object,
			required: true,
		},
		part_of_series_title: {
			type: String,
			required: true,
		},
		publication_event: {
			type: Object,
			required: true,
		},
		image_id: {
			type: Object,
			required: true,
		},
		genres: {
			type: Array,
			required: true,
		},
	},
	{
		collection: "rajapinta",
	}
);

programSchema.set("toJSON", {
	transform: (document, returnedDocument) => {
		document._id = returnedDocument._id;
		delete returnedDocument._id;
		delete returnedDocument.__v;
	},
});

/* We have to change this if we want to use multiple Mongo DB's.
https://mongoosejs.com/docs/connections.html
*/
module.exports = mongoose.model("Program", programSchema);
