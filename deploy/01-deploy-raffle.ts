import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
const deployRaffle: DeployFunction = async ({
  deployments,
  getNamedAccounts,
}: HardhatRuntimeEnvironment) => {
  const { deployer, player } = await getNamedAccounts();
  const { deploy, log } = deployments;
  console.log("deployer:", deployer);
  console.log("player:", player);
};

export default deployRaffle;
