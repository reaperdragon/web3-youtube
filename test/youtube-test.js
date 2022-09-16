const { ethers } = require("hardhat");
const expect = require("chai").expect;

describe("YouTube App", async function () {
    it("It Should Upload The Video", async function () {
        const contractFactory = await ethers.getContractFactory("YouTube");
        const contractDeploy = await contractFactory.deploy("YouTube");

        await contractDeploy.deployed();

        await contractDeploy.videoUpload("videot1h", "video1", "Candy", "I Ate Candy", "Kids", "Video", "16 jun");
        
        let videoId = await contractDeploy.getVideo(1);

        expect(videoId[1]).to.equal("videot1h");
    })
})