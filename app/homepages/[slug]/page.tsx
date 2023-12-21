import React from 'react'
import styles from "./page.module.css"
import { homePageExamples } from '@/lib/HomePageData'

export default function Page({ params }: { params: { slug: string } }) {
    const foundHomePageExample = homePageExamples.find(eachHomePage => eachHomePage.slug === params.slug)

    if (!foundHomePageExample) return <p>Home Page Example Not Found</p>

    return (
        <>
            {foundHomePageExample.seenComponent}
        </>
    )
}
