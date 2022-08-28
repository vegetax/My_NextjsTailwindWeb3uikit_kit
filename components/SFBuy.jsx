import React, { useState } from "react"
import { Framework } from "@superfluid-finance/sdk-core"
import { ethers, providers } from "ethers"
import { Button } from "@web3uikit/core"

//where the Superfluid logic takes place
async function createNewFlow(recipient, flowRate) {
    // const customHttpProvider = new providers.InfuraProvider(
    //     "kovan",
    //     "https://kovan.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"
    // )
    const customHttpProvider = new ethers.providers.JsonRpcProvider(
        // "https://kovan.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"
        "https://polygon-mumbai.g.alchemy.com/v2/cxxkjIOLtOzKRg8obKydXl2MbC3bHxx-"
    )
    const sf = await Framework.create({
        chainId: 80001,
        provider: customHttpProvider,
    })

    const signer = sf.createSigner({
        privateKey: "91300fac0bb785f0d0dae1d71ceff8dfd3abf1795581760d71c756e7742c1c88",
        provider: customHttpProvider,
    })

    const MATICxContract = await sf.loadSuperToken("MATICx")
    const MATICx = MATICxContract.address

    try {
        const createFlowOperation = sf.cfaV1.createFlow({
            receiver: "0x066baa0A4da9FaAE5e42bEC463F30c4b65Ef77AA",
            superToken: MATICx,
            flowRate: "10001",
        })

        console.log("Creating your stream...")

        const result = await createFlowOperation.exec(signer)
        console.log(result)

        console.log(`Congrats - you've just created a money stream!`)
    } catch (error) {
        console.log(
            "Hmmm, your transaction threw an error. Make sure that this stream does not already exist, and that you've entered a valid Ethereum address!"
        )
        console.error(error)
    }
}

export const SFBuy = () => {
    return (
        <div>
            <Button text="Create Flow" onClick={createNewFlow} />
        </div>
    )
}
export default SFBuy
