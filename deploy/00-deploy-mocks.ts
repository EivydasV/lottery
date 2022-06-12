import { developmentChains } from "../helper-hardhat-config";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { ethers, network } from "hardhat";

const BASE_FEE = ethers.utils.parseEther("0.25");
const GAS_PRICE_LINK = 1e9;
const deployRaffle: DeployFunction = async ({
  deployments,
  getNamedAccounts,
}: HardhatRuntimeEnvironment) => {
  const { deployer, player } = await getNamedAccounts();
  const { deploy, log } = deployments;
  const chainName = network.name;

  if (developmentChains.includes(chainName)) {
    console.log("deploying on development chain");
    await deploy("VRFCoordinatorV2Mock", {
      from: deployer,
      log: true,
      args: [BASE_FEE, GAS_PRICE_LINK],
    });
    console.log("Mock deployed");
  }
};
export const tags: [string, string] = ["all", "mocks"];
export default deployRaffle;
