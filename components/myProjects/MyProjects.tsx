"use client"
import { screenSizeGlobal } from '@/utility/globalState'
import { useAtom } from 'jotai'
import Image from 'next/image'
import Link from 'next/link'
import React, { useRef } from 'react'

export default function MyProjects() {
    type project = {
        image: string,
        title: string,
        link: string,
        categories: string
    }

    const projects: project[] = [
        {
            image: "https://images.pexels.com/photos/7886853/pexels-photo-7886853.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            title: "Video downloader",
            link: "/",
            categories: "React/Axios/Node.js"
        },
        {
            image: "https://images.pexels.com/photos/949592/pexels-photo-949592.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            title: "Video Generator",
            link: "/",
            categories: "React/Canvas API/Node.js"
        },
        {
            image: "https://images.pexels.com/photos/1509534/pexels-photo-1509534.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            title: "Art Canvas",
            link: "/",
            categories: "React/Canvas API/JavaScript"
        },
        {
            image: "https://images.pexels.com/photos/1370293/pexels-photo-1370293.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            title: "Dictionary",
            link: "/",
            categories: "React/Node.js/API Integration"
        },
        {
            image: "https://images.pexels.com/photos/929280/pexels-photo-929280.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            title: "Perspective Playground",
            link: "/",
            categories: "React/Three.js/JavaScript"
        },
        {
            image: "https://images.pexels.com/photos/6927334/pexels-photo-6927334.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            title: "Calculator",
            link: "/",
            categories: "React/JavaScript/UI Design"
        },
        {
            image: "https://images.pexels.com/photos/268351/pexels-photo-268351.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            title: "To Do App",
            link: "/",
            categories: "React/Node.js/Local Storage Api"
        },
        {
            image: "https://images.pexels.com/photos/4968391/pexels-photo-4968391.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            title: "Eccomerce",
            link: "/",
            categories: "React/Node.js/Drizzle"
        },
        {
            image: "https://images.pexels.com/photos/3560044/pexels-photo-3560044.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            title: "Weather",
            link: "/",
            categories: "React/Node.js/API Integration"
        },
    ]

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


function ShowProject({ image, title, link, categories }: { image: string, title: string, link: string, categories: string }) {

    return (
        <Link href={link} style={{ display: "grid", gap: "1rem", gridTemplateRows: "auto 1fr auto", scrollSnapAlign: "start" }}>
            <div style={{ position: "relative", aspectRatio: "1/1", width: "min(400px, 80vw)" }}>
                <Image alt={`${title}'s cover image`} fill={true} src={image} style={{ objectFit: "cover" }} />
            </div>

            <h1>{title}</h1>

            <p>{categories}</p>
        </Link>
    )
}