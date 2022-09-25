import { VideoUploaded as VideoUploadedEvent } from "../generated/YouTube/YouTube";
import { Video } from "../generated/schema";

export function handleVideoUploaded(event: VideoUploadedEvent): void {
  let video = new Video(event.params.videoId.toString());
  video.videothumbhash = event.params.videothumbhash;
  video.videohash = event.params.videohash;
  video.title = event.params.title;
  video.description = event.params.description;
  video.category = event.params.category;
  video.videotype = event.params.videotype;
  video.date = event.params.date;
  video.user = event.params.user;
  video.createdAt = event.block.timestamp;
  video.save();
}
