"use client"

import React from 'react'
import styles from "./page.module.css"
import { projects } from '@/lib/ProjectsData'
import ShowProject from '@/components/myProjects/ShowProject'
import Link from 'next/link'
import Image from 'next/image'

export default function Page() {
    return (
        <main style={{}}>
            <section>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(250px, 100%), 1fr))", gap: "1rem" }}>
                    {projects.map(eachProject => {
                        return (
                            <ShowProject {...eachProject} imageContWidth='auto' />
                        )
                    })}
                </div>
            </section>
        </main>
    )
}

