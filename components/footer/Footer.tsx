import Image from 'next/image'
import React from 'react'
import Logo from '../logo/Logo'

export default function Footer() {
    return (
        <footer style={{ display: "flex", alignItems: "center", flexWrap: "wrap", justifyContent: "space-between", padding: "2rem" }}>
            ©2023 Made by Max

            <Logo />
        </footer>
    )
}
