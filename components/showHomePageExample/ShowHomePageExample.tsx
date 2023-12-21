import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function ShowHomePageExample({ image, title, category, slug }: { image: string, category: string, title: string, slug: string, seenComponent: JSX.Element, }) {
    return (
        <Link href={`/homepages/${slug}`} style={{ display: "flex", flexDirection: "column", gap: "1rem", scrollSnapAlign: "start" }}>
            <div style={{ position: "relative", aspectRatio: "1/1" }}>
                <Image alt={`homePage example ${title}'s cover image`} fill={true} src={image} style={{ objectFit: "cover" }} />
            </div>

            <h3>{title}</h3>
        </Link>
    )
}
