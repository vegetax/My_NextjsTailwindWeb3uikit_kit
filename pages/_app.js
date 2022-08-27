import "../styles/globals.css"
import { NotificationProvider } from "@web3uikit/core"
import { MoralisProvider } from "react-moralis"
import { MainProvider } from "../components/MainProvider"

function MyApp({ Component, pageProps }) {
    return (
        <>
            <MoralisProvider initializeOnMount={false}>
                <NotificationProvider>
                    <MainProvider>
                        <Component {...pageProps} />
                    </MainProvider>
                </NotificationProvider>
            </MoralisProvider>
        </>
    )
}

export default MyApp
