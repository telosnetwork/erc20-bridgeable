module.exports = async ({getNamedAccounts, deployments}) => {
    const {deploy} = deployments;
    const {deployer} = await getNamedAccounts();

    const token = await deploy('ERC20Bridgeable', {
        from: deployer,
        args: ["BRIDGE ADDRESS", "MyToken", "MYTOKEN"],
    });

    console.log("Token deployed to:", token.address);

};
module.exports.tags = ['ERC20Bridgeable'];