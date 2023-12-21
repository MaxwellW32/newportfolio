"use client"

import React, { useEffect, useMemo, useRef, useState } from 'react'
import styles from "./testchanger.module.css"

export default function TextChanger() {
    const headingOptions = [
        {
            title: "FullStack Developer",
            skills: [
                "React Js",
                "Next Js",
                "Git/Github",
                "Express",
                "Node",
            ]
        },
        {
            title: "Software Developer",
            skills: [
                "React Native",
                "IOS/Android apps",
            ]
        },
        {
            title: "Systems Engineer",
            skills: [
                "Microsoft Azure",
                "Server Management",
            ]
        },
    ]

    const [currentIndex, currentIndexSet] = useState(0)
    const [loopStarted, loopStartedSet] = useState(false)

    const randomSkilNum = useMemo(() => {
        return Math.floor(Math.random() * headingOptions[currentIndex].skills.length)
    }, [currentIndex])

    const next = () => {
        currentIndexSet(prev => {
            let newIndex = prev + 1

            if (newIndex > headingOptions.length - 1) {
                return 0
            }

            return newIndex
        })
    }

    const prev = () => {
        currentIndexSet(prev => {
            let newIndex = prev - 1

            if (newIndex < 0) {
                return headingOptions.length - 1
            }

            return newIndex
        })
    }

    const repeatInterval = useRef<NodeJS.Timeout>()

    //start off
    useEffect(() => {
        setTimeout(() => {
            repeatInterval.current = setInterval(() => {
                next()
            }, 4000)
            loopStartedSet(true)
        }, 4000)

        return () => clearInterval(repeatInterval.current)
    }, [])

    return (
        <>
            {loopStarted ? (
                <div style={{ display: "flex", gap: ".5rem", alignItems: "center", flexWrap: "wrap", opacity: loopStarted ? 1 : 0, transition: "opacity 1s" }}>
                    <StartText key={currentIndex} text={headingOptions[currentIndex].title} />

                    <MiddleText key={currentIndex + 1} text={" specializing in "} />

                    <EndText key={currentIndex + 2} text={headingOptions[currentIndex].skills[randomSkilNum]} />
                </div>
            ) : (
                <div style={{ display: "flex", gap: ".5rem", alignItems: "center", flexWrap: "wrap" }}>
                    <StartText key={currentIndex} text="FullStack Developer" />

                    <MiddleText key={currentIndex + 1} text={" specializing in "} />

                    <EndText key={currentIndex + 2} text={"React Js"} />
                </div>
            )}
        </>
    )
}


function StartText({ text }: { text: string }) {
    return (
        <span className={`${styles.animText} ${styles.textStyles}`}>{text}</span>
    )
}

function MiddleText({ text }: { text: string }) {
    return (
        <span style={{ animationDelay: "400ms" }} className={styles.animText}>{text}</span>
    )
}

function EndText({ text }: { text: string }) {
    return (
        <span style={{ animationDelay: "800ms" }} className={`${styles.animText} ${styles.textStyles}`}>{text}.</span>
    )
}