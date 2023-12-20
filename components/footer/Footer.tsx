import Image from 'next/image'
import React from 'react'

export default function Footer() {
    return (
        <footer style={{ display: "flex", alignItems: "center", flexWrap: "wrap", justifyContent: "space-between", padding: "2rem" }}>
            ©2023 Made by Max

            <Image alt='logo' src={require(`@/public/logo.webp`).default.src} height={55} width={171} style={{}} />
        </footer>
    )
}
