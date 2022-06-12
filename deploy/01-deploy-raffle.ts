import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { ethers, network } from "hardhat";
import { developmentChains, networkConfig } from "../helper-hardhat-config";
const deployRaffle: DeployFunction = async ({
  deployments,
  getNamedAccounts,
}: HardhatRuntimeEnvironment) => {
  const { deployer, player } = await getNamedAccounts();
  const { deploy, log } = deployments;
  console.log(deployer);
  const chainName = network.name;
  const chainId = network.config.chainId || 0;
  let vrfCoordinatorV2Address: string;
  //@ts-ignore
  const chain = networkConfig[chainId];

  if (developmentChains.includes(chainName)) {
    const vrfCoordinatorV2Mock = await ethers.getContract(
      "VRFCoordinatorV2Mock"
    );
    vrfCoordinatorV2Address = vrfCoordinatorV2Mock.address;
  } else {
    vrfCoordinatorV2Address = chain["vrfCoordinatorV2"];
  }
  const entranceFee = chain["entranceFee"];
  const gasLane = chain["gasLane"];
  const args = [vrfCoordinatorV2Address, entranceFee, gasLane];
  const raffle = await deploy("Raffle", {
    from: deployer,
    args,
    log: true,
    waitConfirmations: 6,
  });
};

export default deployRaffle;
