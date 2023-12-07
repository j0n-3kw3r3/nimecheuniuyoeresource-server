const mongoose = require("mongoose");

const EventSchema = mongoose.Schema(
    {
        image: {
            type: String,
        },
        date: {
            type: String,
        },
        venue: {
            type: String,
        },
        description: {
            type: String,
        },
        title: {
            type: String,
        },
        time: {
            type: String,
        }
        
    },
  {
    timestamps: true,
    }
  
);

module.exports = mongoose.model("Event", EventSchema);
