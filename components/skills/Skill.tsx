"use client"

import React from 'react'
import { useInView } from 'react-intersection-observer'
import styles from "./skill.module.css"
import Image from 'next/image'

export default function Skill({ title, amount, lineHeight = ".4rem" }: { title: string, amount: string, lineHeight?: string }) {
    const { ref, inView } = useInView()

    return (
        <div ref={ref} className={styles.skillMainDiv}>
            <p>{title}</p>
            <p style={{ position: "absolute", top: "2rem", left: `calc(${amount} - 3rem)`, translate: "0% 0" }}>{amount}</p>

            <div style={{ height: lineHeight }}>
                <div className={styles.progressBar} style={{ animationPlayState: inView ? "running" : "", backgroundColor: "#fff", height: "100%", width: amount, position: "relative" }}></div>
            </div>
        </div>
    )
}
