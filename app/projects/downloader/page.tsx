"use client"

import { useRef } from "react";
import styles from "./page.module.css"
import Image from "next/image"
import YoutubeUrlParse from "@/useful/YoutubeUrlParse";

export default function Page() {

    const youtubeURLInput = useRef<HTMLInputElement>(null!)

    const handleURLSearch = () => {
        const fullUrl = youtubeURLInput.current.value

        if (fullUrl !== "") {
            //send to download
            console.log(`${fullUrl} id {${YoutubeUrlParse(fullUrl)}}`)
        }
    }

    return (
        <>

            <div className={styles.urlCont}>
                <input className={styles.urlInput} ref={youtubeURLInput} onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                    if (e.key === "Enter") {
                        handleURLSearch()
                    }
                }} type="text" />

                <button onClick={handleURLSearch}>Search</button>
            </div>
        </>

    )
}
