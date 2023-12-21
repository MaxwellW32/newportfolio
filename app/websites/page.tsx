import React from 'react'
import styles from "./page.module.css"
import { madeWebsites } from '@/lib/MadeWebsitesData'
import ShowMadeWebsite from '@/components/showMadeWebsite/ShowMadeWebsite'

export default function Page() {
    return (
        <main>
            <section>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(400px, 100%), 1fr))", gap: "1rem" }}>
                    {madeWebsites.map((eachWebsite, eachWebsiteIndex) => {
                        return (
                            <ShowMadeWebsite {...eachWebsite} key={eachWebsiteIndex} />
                        )
                    })}
                </div>
            </section>
        </main>
    )
}
