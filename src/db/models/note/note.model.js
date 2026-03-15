import { SchemaTypes } from "mongoose";
import { model, Schema } from "mongoose";
const schema = new Schema(
  {
    title: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          if (value === value.toUpperCase()) return false;
          return true;
        },
        message: "Title cannot be entirely uppercase",
      },
    },
    content: { type: String, required: true },
    userId: { type: SchemaTypes.ObjectId, required: true, ref: "User" },
  },
  { timestamps: true }
);

export const Note = model("Note", schema);
