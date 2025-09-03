import mongoose, { Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const videoSchema = new Schema(
  {
    videoFile: {
      type: String,
      requried: true,
    },
    thumbnail: {
      type: String,
      requried: true,
    },
    title: {
      type: String,
      requried: true,
    },
    description: {
      type: String,
      requried: true,
    },
    duration: {
      type: Number,
      requried: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    isPublished: {
      type: String,
      default: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  },
);

videoSchema.plugin(mongoosePaginate);

export const Video = mongoose.model('Video', videoSchema);
