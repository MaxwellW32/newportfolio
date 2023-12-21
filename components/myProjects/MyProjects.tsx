"use client"
import { screenSizeGlobal } from '@/utility/globalState'
import { useAtom } from 'jotai'
import Image from 'next/image'
import Link from 'next/link'
import React, { useRef } from 'react'
import ShowProject from './ShowProject'
import { projects } from '@/lib/ProjectsData'

export default function MyProjects() {

    const projectContRef = useRef<HTMLDivElement>(null!)

    return (
        <div style={{ position: "relative", display: "grid", }}>
            <div style={{ display: projects ? "flex" : "none", gap: "1rem", justifySelf: "flex-end", marginBlock: "2rem", }}>
                <button className={`roundButton`} onClick={() => {

                    const childEl = projectContRef.current.children[0] as HTMLDivElement
                    const moveWidth = childEl.offsetWidth

                    projectContRef.current.scrollLeft -= moveWidth

                    if (projectContRef.current.scrollLeft === 0) {
                        projectContRef.current.scrollLeft = projectContRef.current.scrollWidth
                    }

                }}>
                    <svg style={{ rotate: "180deg" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M470.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 256 265.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L210.7 256 73.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z" /></svg>
                </button>

                <button className={`roundButton`} onClick={() => {
                    const childEl = projectContRef.current.children[0] as HTMLDivElement
                    const moveWidth = childEl.offsetWidth

                    projectContRef.current.scrollLeft += moveWidth

                    if (projectContRef.current.scrollLeft + projectContRef.current.clientWidth >= (projectContRef.current.scrollWidth - 20)) {
                        projectContRef.current.scrollLeft = 0
                    }
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M470.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 256 265.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L210.7 256 73.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z" /></svg>
                </button>
            </div>

            {projects.length > 0 && (
                <div ref={projectContRef} className={`noScrollBar`} style={{ display: "flex", overflowX: "auto", scrollSnapType: "x mandatory", scrollBehavior: "smooth", gap: "1rem" }}>
                    {projects.map((eachProject, eachProjectIndex) => {
                        return (
                            <ShowProject key={eachProjectIndex} {...eachProject} />
                        )
                    })}
                </div>
            )}
        </div>
    )
}


