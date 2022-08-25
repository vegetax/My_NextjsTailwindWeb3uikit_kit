import Head from "next/head"
import Image from "next/image"
import styles from "../styles/Home.module.css"
import { CryptoCards, Button } from "@web3uikit/core"
import { useNotification } from "@web3uikit/core"

export default function Home() {
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

    return (
        <>
            <Button
                text="Test"
                onClick={handleNewNotification}
                theme="colored"
                color="red"
                isFullWidth={true}
            />
        </>
    )
}
