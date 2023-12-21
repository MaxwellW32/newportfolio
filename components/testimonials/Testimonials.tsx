"use client"

import React, { useState, useMemo, HTMLAttributes, useEffect } from 'react'
import styles from "./testimonial.module.css"

export default function Testimonials() {
    type testimonial = {
        text: string,
        rating: number,
        title: string,
        name: string
    }

    // const testimonialArr: testimonial[] = [
    //     {
    //         text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit assumenda voluptates dolorum beatae officia libero at nam veniam quos quis id eius, molestiae nihil incidunt optio, accusamus, consequatur unde ratione!",
    //         rating: 5,
    //         title: "0 CEO, Seoly",
    //         name: "Raleigh Friend"
    //     },
    //     {
    //         text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit assumenda voluptates dolorum beatae officia libero at nam veniam quos quis id eius, molestiae nihil incidunt optio, accusamus, consequatur unde ratione!",
    //         rating: 5,
    //         title: "1 CEO, Seoly",
    //         name: "Raleigh Friend"
    //     },
    //     {
    //         text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit assumenda voluptates dolorum beatae officia libero at nam veniam quos quis id eius, molestiae nihil incidunt optio, accusamus, consequatur unde ratione!",
    //         rating: 5,
    //         title: "2 CEO, Seoly",
    //         name: "Raleigh Friend"
    //     },
    //     {
    //         text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit assumenda voluptates dolorum beatae officia libero at nam veniam quos quis id eius, molestiae nihil incidunt optio, accusamus, consequatur unde ratione!",
    //         rating: 5,
    //         title: "3 CEO, Seoly",
    //         name: "Raleigh Friend"
    //     },
    // ]

    const testimonialArr = [
        {
            text: "Working with Maxwell was an absolute game-changer for our business! His expertise and dedication transformed our web presence. The attention to detail and commitment to delivering beyond our expectations truly set them apart. I highly recommend Maxwell for any web development project.",
            rating: 5,
            title: "CEO, Seoly Solutions",
            name: "Alice Thompson"
        },
        {
            text: "Maxwell is a coding maestro! They took our ideas and turned them into a visually stunning and user-friendly website. Their problem-solving skills and creativity are unmatched. We're extremely satisfied with the results and grateful for the smooth collaboration. Looking forward to working together on future projects!",
            rating: 5,
            title: "Founder, TechVibe Innovations",
            name: "James Rodriguez"
        },
        {
            text: "Exceptional work by Maxwell! His proficiency in HTML, CSS, and JavaScript brought our vision to life. The website not only looks fantastic but also functions seamlessly. Maxwell exceeded our expectations, and we're thrilled with the final product. I wholeheartedly endorse Maxwell for anyone seeking top-notch web development.",
            rating: 5,
            title: "CTO, WebSculpt Technologies",
            name: "Emily Chen"
        },
        {
            text: "Maxwell is a coding virtuoso! His expertise in web development is unparalleled. He not only delivered a high-quality website but also provided valuable insights to enhance its performance. Collaborating with Maxwell was a pleasure, and we're eager to continue this partnership for future projects.",
            rating: 5,
            title: "CEO, Digital Horizon Solutions",
            name: "Alex Turner"
        },
    ];


    const [currentIndex, currentIndexSet] = useState(0)

    const next = () => {
        currentIndexSet(prev => {
            let newIndex = prev + 2

            if (newIndex > testimonialArr.length - 1) {
                return 0
            }

            return newIndex
        })
    }

    const prev = () => {
        currentIndexSet(prev => {
            let newIndex = prev - 2

            if (newIndex < 0) {
                return testimonialArr.length - 1
            }

            return newIndex
        })
    }

    return (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "3rem", flexDirection: "row-reverse", justifyContent: "center", overflowX: "hidden" }}>
            <div style={{ flex: "1 1 300px", maxWidth: "500px" }}>
                <h2>Testimonial</h2>

                <p style={{ marginBottom: "3rem" }} className='extraLargeText'>Satisfied Clients Say</p>

                <Testimonial key={currentIndex} {...testimonialArr[currentIndex]} />
            </div>

            <div style={{ flex: "1 1 300px", maxWidth: "500px", display: "flex", flexDirection: "column", gap: "1rem" }}>
                <Testimonial key={currentIndex + 1} second={true} {...testimonialArr[currentIndex + 1] ?? { ...testimonialArr[0] }} />

                {testimonialArr.length > 2 && (
                    <div style={{ display: "flex", gap: "1rem", marginLeft: 'auto', marginBlock: "2rem" }}>
                        <button className="roundButton" onClick={prev}>
                            <svg style={{ rotate: "180deg" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M470.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 256 265.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L210.7 256 73.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z" /></svg>
                        </button>

                        <button className="roundButton" onClick={next}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M470.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 256 265.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L210.7 256 73.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z" /></svg>
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}


function Testimonial({ text, rating, title, name, second }: { text: string, rating: number, title: string, name: string, second?: boolean }) {

    return (
        <div className={styles.testimonial} style={{ padding: "3rem 2rem", display: "flex", flexDirection: "column", gap: "1rem", backgroundColor: "var(--backgroundColor)", animationDelay: second ? "400ms" : "" }}>
            <svg style={{ width: "4rem" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M0 216C0 149.7 53.7 96 120 96h8c17.7 0 32 14.3 32 32s-14.3 32-32 32h-8c-30.9 0-56 25.1-56 56v8h64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V320 288 216zm256 0c0-66.3 53.7-120 120-120h8c17.7 0 32 14.3 32 32s-14.3 32-32 32h-8c-30.9 0-56 25.1-56 56v8h64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H320c-35.3 0-64-28.7-64-64V320 288 216z" /></svg>

            <p style={{ fontSize: "var(--mediumFontSize)" }}>{text}</p>

            <DisplayStars starRating={rating} style={{ marginLeft: "auto" }} />

            <p style={{ fontSize: "var(--mediumFontSize)" }} className='makeBold'>{name}</p>

            <p>{title}</p>
        </div>
    )
}

function DisplayStars({ starRating, ...elementProps }: { starRating: number | undefined } & HTMLAttributes<HTMLDivElement>) {
    let amtOfFullStars = 5
    const halfStarPresent = (starRating ?? 5) % 1 >= 0.5

    const starArray = useMemo(() => {
        const fullSvgArray: JSX.Element[] = []

        const fullstar = <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" /></svg>

        const halfStar = <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512"><path d="M320 376.4l.1-.1 26.4 14.1 85.2 45.5-16.5-97.6-4.8-28.7 20.7-20.5 70.1-69.3-96.1-14.2-29.3-4.3-12.9-26.6L320.1 86.9l-.1 .3V376.4zm175.1 98.3c2 12-3 24.2-12.9 31.3s-23 8-33.8 2.3L320.1 439.8 191.8 508.3C181 514 167.9 513.1 158 506s-14.9-19.3-12.9-31.3L169.8 329 65.6 225.9c-8.6-8.5-11.7-21.2-7.9-32.7s13.7-19.9 25.7-21.7L227 150.3 291.4 18c5.4-11 16.5-18 28.8-18s23.4 7 28.8 18l64.3 132.3 143.6 21.2c12 1.8 22 10.2 25.7 21.7s.7 24.2-7.9 32.7L470.5 329l24.6 145.7z" /></svg>

        for (let index = 0; index < amtOfFullStars; index++) {
            fullSvgArray.push(fullstar)
        }


        if (halfStarPresent) {
            fullSvgArray.pop()
            fullSvgArray.push(halfStar)
        }

        return fullSvgArray
    }, [starRating])

    return (
        <div {...elementProps} style={{ display: "flex", gap: ".2rem", ...elementProps?.style }}>
            {starArray.map((eachSvg, svgIndex) => (
                <div key={svgIndex} style={{}}>
                    {eachSvg}
                </div>
            ))}
        </div>
    )
}