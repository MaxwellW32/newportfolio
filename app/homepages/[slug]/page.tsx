import Link from "next/link"
import styles from "./page.module.css"
import { homePageExamples } from '@/lib/HomePageData'

export default function Page({ params }: { params: { slug: string } }) {
    const currentIndex = homePageExamples.findIndex(eachHomePage => eachHomePage.slug === params.slug)

    if (currentIndex === -1) {
        return <p>Home Page Example Not Found</p>
    }

    const findNext = () => {
        let newIndex = currentIndex + 1

        if (newIndex > homePageExamples.length - 1) {
            newIndex = 0
        }

        return newIndex
    }

    const findPrev = () => {
        let newIndex = currentIndex - 1

        if (newIndex < 0) {
            newIndex = homePageExamples.length - 1
        }

        return newIndex
    }

    return (
        <>
            {homePageExamples[currentIndex].seenComponent}

            <div style={{ position: "fixed", bottom: 0, left: "50%", translate: "-50% 0", margin: "1rem", display: "flex", gap: "1rem", flexWrap: "wrap", zIndex: 998 }}>
                <Link href={`/homepages/${homePageExamples[findPrev()].slug}`} >prev</Link>
                <Link href={`/homepages/${homePageExamples[findNext()].slug}`} >next</Link>
            </div>
        </>
    )
}
