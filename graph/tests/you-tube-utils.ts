import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import { VideoUploaded } from "../generated/YouTube/YouTube"

export function createVideoUploadedEvent(
  videoId: BigInt,
  videothumbhash: string,
  videohash: string,
  title: string,
  description: string,
  category: string,
  videotype: string,
  date: string,
  user: Address
): VideoUploaded {
  let videoUploadedEvent = changetype<VideoUploaded>(newMockEvent())

  videoUploadedEvent.parameters = new Array()

  videoUploadedEvent.parameters.push(
    new ethereum.EventParam(
      "videoId",
      ethereum.Value.fromUnsignedBigInt(videoId)
    )
  )
  videoUploadedEvent.parameters.push(
    new ethereum.EventParam(
      "videothumbhash",
      ethereum.Value.fromString(videothumbhash)
    )
  )
  videoUploadedEvent.parameters.push(
    new ethereum.EventParam("videohash", ethereum.Value.fromString(videohash))
  )
  videoUploadedEvent.parameters.push(
    new ethereum.EventParam("title", ethereum.Value.fromString(title))
  )
  videoUploadedEvent.parameters.push(
    new ethereum.EventParam(
      "description",
      ethereum.Value.fromString(description)
    )
  )
  videoUploadedEvent.parameters.push(
    new ethereum.EventParam("category", ethereum.Value.fromString(category))
  )
  videoUploadedEvent.parameters.push(
    new ethereum.EventParam("videotype", ethereum.Value.fromString(videotype))
  )
  videoUploadedEvent.parameters.push(
    new ethereum.EventParam("date", ethereum.Value.fromString(date))
  )
  videoUploadedEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )

  return videoUploadedEvent
}
