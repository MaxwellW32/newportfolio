export type blog = {
    image: string,
    category: string,
    datePosted: Date,
    title: string,
    messages?: JSX.Element[],
    slug: string
}

export const blogs: blog[] = [
    {
        image: require(`@/public/blog1image.webp`).default.src,
        category: "Html",
        datePosted: new Date("2015-03-25"),
        title: "Don't wait until you officially started business to line these up.",
        slug: "html-practice",
        messages: [
            <p key={0}>Hey there message 1</p>,
            <p key={1}>Hey there message 2</p>,
            <p key={2}>Hey there message 3</p>,
        ]
    },
    {
        image: require(`@/public/blog2image.webp`).default.src,
        category: "Html",
        datePosted: new Date("2015-03-25"),
        title: "Don't wait until you officially started business to line these up.",
        slug: "html-practice0"
    },
    {
        image: require(`@/public/blog3image.webp`).default.src,
        category: "Html",
        datePosted: new Date("2015-03-25"),
        title: "Don't wait until you officially started business to line these up.",
        slug: "html-practice1"
    }
]