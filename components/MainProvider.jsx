import React, { useEffect, useState, useContext } from "react"
import { useMoralisWeb3Api, useMoralis } from "react-moralis"
import { useNotification } from "@web3uikit/core"

export const TransactionContext = React.createContext()

export const MainProvider = ({ children }) => {
    const {
        // Moralis,
        // isInitialized,
        // authenticate,
        // isAuthenticated,
        // isAuthenticating,
        // user,
        // account,
        // chainId,
        // logout,
        // enableWeb3,
        // isWeb3Enabled,
    } = useMoralis()
    // const FireAddress = "0x557555c030b28E62AC41851074Cb67584D7815A4"
    // const BadgesAddress = "0x2f973f35887ceF7D52B849924f43C6FEAe32DD57"
    // const Task1testNFTAddress = "0xa2dBBc63101CD5Ac2A4c4ed26cAA997B2918f9E9"
    // const Web3Api = useMoralisWeb3Api()
    // const web3Js = new Web3(Moralis.provider)
    // const dispatch = useNotification()
    // const [debugmune, setDebugMune] = useState(false)

    return (
        <TransactionContext.Provider
            value={
                {
                    // Moralis,
                    // isInitialized,
                    // authenticate,
                    // isAuthenticated,
                    // isAuthenticating,
                    // user,
                    // account,
                    // chainId,
                    // logout,
                    // enableWeb3,
                }
            }
        >
            {children}
        </TransactionContext.Provider>
    )
}
