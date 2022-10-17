const { ethers } = require("hardhat");
const { expect } = require("chai");
const ONE_TLOS = ethers.utils.parseEther("1.0");
const HALF_TLOS = ethers.utils.parseEther("0.5");
const HUNDRED_TLOS = ethers.utils.parseEther('200.0');
const TOKEN_NAME = "My Bridgeable Token";
const TOKEN_SYMBOL = "MBT";


describe("ERC20Bridgeable Contract", function () {
    let antelope_bridge, user, erc20bridgeable;
    beforeEach(async () => {
        [antelope_bridge, user] = await ethers.getSigners();
        let ERC20Bridgeable = await ethers.getContractFactory("ERC20Bridgeable");
        erc20bridgeable = await ERC20Bridgeable.deploy(antelope_bridge.address, TOKEN_NAME, TOKEN_SYMBOL);
    })
    describe(":: Deployment", async function () {
        it("Should have the right bridge" , async function () {
            expect(await erc20bridgeable.bridge()).to.equal(antelope_bridge.address);
        });
        it("Should have the right token name" , async function () {
            expect(await erc20bridgeable.name()).to.equal(TOKEN_NAME);
        });
        it("Should have the right token symbol" , async function () {
            expect(await erc20bridgeable.symbol()).to.equal(TOKEN_SYMBOL);
        });
        it("Should have the right decimals" , async function () {
            expect(await erc20bridgeable.decimals()).to.equal(18);
        });
    });
    describe(":: Mint", async function () {
        it("Should allow bridge to mint tokens" , async function () {
            await expect(erc20bridgeable.mint(user.address, HUNDRED_TLOS)).to.not.be.reverted;
            expect(await erc20bridgeable.balanceOf(user.address)).to.equal(HUNDRED_TLOS);
        });
        it("Should not allow random addresses to mint tokens" , async function () {
            await expect(erc20bridgeable.connect(user).mint(user.address, HUNDRED_TLOS)).to.be.revertedWith("ERC20Bridgeable: only the bridge can trigger this method !");
        });
    });
    describe(":: Burn", async function () {
        it("Should allow bridge to burn tokens" , async function () {
            await expect(erc20bridgeable.mint(user.address, HUNDRED_TLOS)).to.not.be.reverted;
            await expect(erc20bridgeable.connect(user).approve(antelope_bridge.address, HUNDRED_TLOS)).to.not.be.reverted;
            await expect(erc20bridgeable.burnFrom(user.address, HUNDRED_TLOS)).to.emit(erc20bridgeable, 'Transfer');
            expect(await erc20bridgeable.balanceOf(user.address)).to.equal(0);
        });
        it("Should not allow random addresses to burn tokens" , async function () {
            await expect(erc20bridgeable.mint(user.address, HUNDRED_TLOS)).to.not.be.reverted;
            await expect(erc20bridgeable.connect(user).burnFrom(user.address, HUNDRED_TLOS)).to.be.revertedWith("ERC20Bridgeable: only the bridge can trigger this method !");
        });

    });
});
