import React from 'react'
import styles from "./skill.module.css"
import Image from 'next/image'

export default function Skill({ title, amount, lineHeight = ".4rem" }: { title: string, amount: string, lineHeight?: string }) {

    return (
        <div className={styles.skillMainDiv}>
            <p>{title}</p>
            <p style={{ position: "absolute", top: "2rem", left: `calc(${amount} - 3rem)`, translate: "0% 0" }}>{amount}</p>

            <div style={{ height: lineHeight }}>
                <div className={styles.progressBar} style={{ backgroundColor: "#fff", height: "100%", width: amount, position: "relative" }}></div>
            </div>
        </div>
    )
}
