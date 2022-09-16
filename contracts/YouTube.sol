// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";


contract YouTube {

    // events
    event VideoUploaded(
        uint256 videoId,
        string videothumbhash,
        string videohash,
        string title,
        string description,
        string  category,
        string videotype,
        string date,
        address user
        );

    // state vars
    string private name;
    address private owner;

    // struct Video
    struct Video{
        uint256 videoId;
        string videothumbhash;
        string videohash;
        string title;
        string description;
        string  category;
        string videotype;
        string date;
        address user;
    }

    using Counters for Counters.Counter;
    Counters.Counter private _videoIds;

    // 1 -> 1 Who ate my all holloween candies?
    mapping(uint256 => Video) private idToVideo;

    constructor(string memory _name) {
        console.log("App Name is ", _name);
        name = _name;
        owner = msg.sender;
    }

    // video upload
    function videoUpload( string memory _videothumbhash,
        string memory _videohash,
        string memory _title,
        string memory _description,
        string memory  _category,
        string memory _videotype,
        string memory _date) public {
            require(bytes(_videothumbhash).length > 0, "Video Thumb not Found");
            require(bytes(_videohash).length > 0, "Video Thumb not Found");
            require(bytes(_title).length > 0, "Video Thumb not Found");
            require(bytes(_description).length > 0, "Video Thumb not Found");
            require(bytes(_category).length > 0, "Video Thumb not Found");
            require(bytes(_videotype).length > 0, "Video Thumb not Found");
            require(bytes(_date).length > 0, "Video Thumb not Found");

            // increment video id by 1
            _videoIds.increment();

            // get the current video id
            uint256 videoIdCurrent = _videoIds.current();
            Video storage video = idToVideo[videoIdCurrent];
            video.videoId = videoIdCurrent;
            video.videothumbhash = _videothumbhash;
            video.videohash = _videohash;
            video.title = _title;
            video.description = _description;
            video.category = _category;
            video.videotype = _videotype;
            video.date = _date;
            video.user = msg.sender;


            emit VideoUploaded(
                videoIdCurrent,
                _videothumbhash,
                _videohash,
                _title,
                _description,
                _category,
                _videotype,
                _date,
                msg.sender
                );
        }


        function getVideo(uint256 _videoId) public view returns (Video memory) {
            return idToVideo[_videoId];
        }

}