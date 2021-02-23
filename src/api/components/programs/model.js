const mongoose = require('mongoose');

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
    },
    {
        collection: "rajapinta",
    });

module.exports = mongoose.model('Programs', programSchema);