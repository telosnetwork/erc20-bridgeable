module.exports = async ({getNamedAccounts, deployments}) => {
    const {deploy} = deployments;
    const {deployer} = await getNamedAccounts();

    const token = await deploy('ERC20Bridgeable', {
        from: deployer,
        args: ["0x83E78354E8eEeb10dF188bD063b12F0659e092e0", "BridgeToken", "BTOKEN"],
    });

    console.log("Token deployed to:", token.address);

};
module.exports.tags = ['ERC20Bridgeable'];