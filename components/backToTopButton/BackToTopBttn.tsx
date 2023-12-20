"use client"
import React, { CSSProperties, useEffect, useRef, useState } from 'react'

export default function BackToTopBttn() {
    const [bttnShowing, bttnShowingSet] = useState(false)

    const handleScroll = () => {
        if (!document.scrollingElement) return

        if (document.scrollingElement.scrollTop > 800) {
            bttnShowingSet(true)
        } else {
            bttnShowingSet(false)
        }
    }

    useEffect(() => {
        document.addEventListener("scroll", handleScroll)

        return () => document.removeEventListener("scroll", handleScroll)
    }, [])

    const bttnNotShowingStyles = !bttnShowing ? {
        opacity: 0,
        userSelect: "none",
        pointerEvents: "none"
    } : {} as CSSProperties

    return (
        <>
            <button style={{ position: "fixed", bottom: 0, right: 0, margin: "1rem", zIndex: "1", aspectRatio: "1/1", borderRadius: "50%", transition: "opacity 500ms", ...bttnNotShowingStyles } as CSSProperties} onClick={() => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                });
            }}>
                <svg style={{ position: "absolute", top: "50%", left: "50%", translate: "-50% -50%" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z" /></svg>
            </button>
        </>
    )
}
