import React, { useState, useEffect, useContext } from "react"
import { Framework } from "@superfluid-finance/sdk-core"
import { ethers } from "ethers"
import { Button } from "@web3uikit/core"
import MoneyRouterABI from "../constants/sf_moneyRonter_abi.json"

export const SFBuy = () => {
    let provider
    let signer
    let moneyRouter

    /*** 信息准备 ***/
    // 合约地址
    const moneyRouterAddress = "0xeF67B9Eb4b36d814139b3294E7522972735EC8a7"
    // 拉取metamask钱包的web3Provider
    // const provider = new ethers.providers.Web3Provider(window.ethereum)
    // // 创建用provider创建signer
    // const signer = provider.getSigner()
    // 创建 moneyRouter的合约实例
    // const moneyRouter = new ethers.Contract(moneyRouterAddress, MoneyRouterABI, signer)
    useEffect(() => {
        if (typeof window.ethereum !== "undefined") {
            provider = new ethers.providers.Web3Provider(window.ethereum)
            signer = provider.getSigner()
            moneyRouter = new ethers.Contract(moneyRouterAddress, MoneyRouterABI, signer)
            console.log(provider)
        }
    }, [])

    async function createNewFlow(recipient, flowRate) {
        // 创建sf SDK实例
        const sf = await Framework.create({
            chainId: 80001, //Polygon Mumbai
            provider: provider,
        })
        // 通过sf SDK查询到 当前链的daix合约
        const daix = await sf.loadSuperToken("fDAIx")

        /*** approve合约可以操作DAIx ***/
        const aclApproval = sf.cfaV1.updateFlowOperatorPermissions({
            flowOperator: moneyRouter.address,
            superToken: daix.address,
            flowRateAllowance: "2592000", //10 tokens per month in flowRateAllowanace
            permissions: 7, //NOTE: this allows for full create, update, and delete permissions. Change this if you want more granular permissioning
        })

        await aclApproval.exec(signer).then(function (tx) {
            console.log(`
            Congrats! You've just successfully made the money router contract a flow operator.
            Tx Hash: ${tx.hash}
        `)
        })

        /*** 设置或者更新流向这个合约的flow ***/
        try {
            const tx = await moneyRouter.createFlowIntoContract(daix.address, 1)
            console.log(tx)
        } catch (error) {
            console.log(error)
        }

        /*** 不通过合约直接创建流支付 ***/
        /*  const MATICxContract = await sf.loadSuperToken("MATICx")
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
        } */
    }
    async function DeleteFlow() {
        // 创建sf SDK实例
        const sf = await Framework.create({
            chainId: 80001, //Polygon Mumbai
            provider: provider,
        })

        // 通过sf SDK查询到 当前链的daix合约
        const daix = await sf.loadSuperToken("fDAIx")

        //删除flow
        try {
            const tx = await moneyRouter.deleteFlowIntoContract(daix.address)
            console.log(tx)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <Button text="Create Flow" onClick={createNewFlow} />
            <Button text="Delte Flow" onClick={DeleteFlow} />
        </div>
    )
}

export default SFBuy
