import Blog from '@/components/blog/Blog';
import { blogs } from '@/lib/BlogData';
import React from 'react'

export default function page({ params: { slug } }: { params: { slug: string } }) {
    const foundBlog = blogs.find(eachBlog => eachBlog.slug === slug)

    if (!foundBlog) return <p>Blog Not Found</p>


    return (
        <Blog {...foundBlog} />
    )
}
