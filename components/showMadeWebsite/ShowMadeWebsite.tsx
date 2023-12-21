import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function ShowMadeWebsite({ image, title, link }: { image: string, title: string, link: string, }) {
    return (
        <Link target='_blank' href={link} style={{ display: "flex", flexDirection: "column", gap: "1rem", scrollSnapAlign: "start" }}>
            <div style={{ position: "relative", aspectRatio: "1/1" }}>
                <Image alt={`${title}'s website cover image`} fill={true} src={image} style={{ objectFit: "cover" }} />
            </div>

            <h3>{title}</h3>
        </Link>
    )
}
