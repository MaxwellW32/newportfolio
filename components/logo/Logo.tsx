import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Logo() {
    return (
        <Link href={`/`}>
            <Image alt='logo' src={require(`@/public/new logo.svg`).default.src} height={55} width={171} style={{}} />
        </Link>
    )
}
