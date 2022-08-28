import React, { useEffect, useState, useContext } from "react"
import { ethers } from "ethers"
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
        enableWeb3,
        isWeb3Enabled,
    } = useMoralis()

    return (
        <TransactionContext.Provider
            value={{
                // Moralis,
                // isInitialized,
                // authenticate,
                // isAuthenticated,
                // isAuthenticating,
                // user,
                // account,
                // chainId,
                enableWeb3,
                isWeb3Enabled,
            }}
        >
            {children}
        </TransactionContext.Provider>
    )
}
