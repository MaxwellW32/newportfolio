import { blogs } from '@/lib/BlogData'
import React from 'react'
import Blog from '../blog/Blog'

export default function BlogPosts({ inPreviewMode = false, limit = 999 }: { inPreviewMode?: boolean, limit?: number }) {

    return (
        <div style={{ display: "grid", gap: "2rem" }}>
            {(limit === 999 ? blogs : blogs.slice(0, limit)).map((eachBlog, eachBlogIndex) => {
                return (
                    <Blog key={eachBlogIndex} {...eachBlog} inPreview={inPreviewMode} />
                )
            })}
        </div>
    )
}
