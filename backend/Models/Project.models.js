import mongoose from "mongoose";
import User from "./User.models.js";

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    tasks: [
    {
      title: String,
      dueDate: Date,
      status: {
        type: String,
        enum: ["pending", "in progress", "completed"],
        default: "pending",
      },
    },
  ],
}, {
    timestamps: true
});

export default mongoose.model('Project', projectSchema);