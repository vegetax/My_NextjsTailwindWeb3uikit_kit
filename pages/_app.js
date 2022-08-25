import "../styles/globals.css"
import { NotificationProvider } from "@web3uikit/core"

function MyApp({ Component, pageProps }) {
    return (
        <NotificationProvider>
            <Component {...pageProps} />
        </NotificationProvider>
    )
}

export default MyApp
