"use client"

import { blogs } from '@/lib/BlogData'
import React from 'react'
import Blog from '../blog/Blog'
import { useInView } from 'react-intersection-observer'
import styles from "./blogposts.module.css"

export default function BlogPosts({ inPreviewMode = false, limit = 999 }: { inPreviewMode?: boolean, limit?: number }) {
    const { ref, inView } = useInView()

    return (
        <div ref={ref} className={styles.blogPostMainDiv} style={{ "--isPaused": inView ? "running" : "paused", display: "grid", gap: "2rem" } as React.CSSProperties}>
            {(limit === 999 ? blogs : blogs.slice(0, limit)).map((eachBlog, eachBlogIndex) => {
                return (
                    <Blog key={eachBlogIndex} {...eachBlog} inPreview={inPreviewMode} />
                )
            })}
        </div>
    )
}
