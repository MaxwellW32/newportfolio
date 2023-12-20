import Blog from '@/components/blog/Blog';
import { blogs } from '@/lib/BlogData';
import React from 'react'

export default function page({ params: { category } }: { params: { category: string } }) {

    const foundFittingArr = blogs.filter(eachBlog => eachBlog.category === category)

    if (foundFittingArr.length === 0) return <p>Nothing Matching that category</p>

    return (
        <main>
            {foundFittingArr.map((eachBlog, eachBlogIndex) => <Blog key={eachBlogIndex} {...eachBlog} inPreview={true} />)}
        </main>
    )
}
