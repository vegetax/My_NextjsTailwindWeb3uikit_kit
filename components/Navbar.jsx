import React, { useContext } from "react"
import { ConnectButton } from "@web3uikit/web3"
import { useNotification, Button } from "@web3uikit/core"
import { TransactionContext } from "./MainProvider"

export const Navbar = () => {
    const { logout, enableWeb3, isWeb3Enabled } = useContext(TransactionContext)
    const dispatch = useNotification()

    const handleNewNotification = () => {
        dispatch({
            type: "success",
            message: "验证成功！",
            title: "New Notification",
            icon: "bell",
            position: "bottomL",
        })
    }
    // const { debugmune, setDebugMune } = useContext(TransactionContext)
    return (
        <div className="fixed top-0 left-0 h-16  w-screen  z-50    ">
            <Button
                text="Test"
                onClick={handleNewNotification}
                theme="colored"
                color="red"
                isFullWidth={true}
            />
            <Button
                onClick={async () => {
                    await enableWeb3()
                    console.log(isWeb3Enabled)
                }}
            />
            <Button
                onClick={async () => {
                    await logout()
                }}
            />
            <ConnectButton moralisAuth={false} chainId={4} />
        </div>
    )
}
export default Navbar
