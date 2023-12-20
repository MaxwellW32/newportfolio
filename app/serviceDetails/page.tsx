"use client"
import React, { useRef, useState } from 'react'
import styles from "./page.module.css"
import Image from 'next/image'

export default function page() {
    type categoryInfo = {
        name: string,
        title: string,
        imageSrc: string,
        elements?: JSX.Element[],
    };

    const categoryInfo: { [key: string]: categoryInfo } = {
        uiux: {
            name: "UI/UX Design",
            title: "UI design can make easy your complex product.",
            elements: [
                <p key={1}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam nemo a excepturi iusto reprehenderit placeat perferendis, distinctio totam culpa voluptatem odio officia nam voluptates. Enim quod eligendi aperiam ratione libero!</p>,
                <p key={2}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam nemo a excepturi iusto reprehenderit placeat perferendis, distinctio totam culpa voluptatem odio officia nam voluptates. Enim quod eligendi aperiam ratione libero!</p>,
                <p key={3}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam nemo a excepturi iusto reprehenderit placeat perferendis, distinctio totam culpa voluptatem odio officia nam voluptates. Enim quod eligendi aperiam ratione libero!</p>,
            ],
            imageSrc: require(`@/public/serviceDetailsGuy.webp`).default.src
        },
        webdev: {
            name: "Web Development",
            title: "Web Development can make easy your complex product.",
            elements: [
                <p key={1}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam nemo a excepturi iusto reprehenderit placeat perferendis, distinctio totam culpa voluptatem odio officia nam voluptates. Enim quod eligendi aperiam ratione libero!</p>,
                <p key={2}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam nemo a excepturi iusto reprehenderit placeat perferendis, distinctio totam culpa voluptatem odio officia nam voluptates. Enim quod eligendi aperiam ratione libero!</p>,
                <p key={3}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam nemo a excepturi iusto reprehenderit placeat perferendis, distinctio totam culpa voluptatem odio officia nam voluptates. Enim quod eligendi aperiam ratione libero!</p>,
            ],
            imageSrc: require(`@/public/serviceDetailsGuy.webp`).default.src
        },
        brand: {
            name: "Brand Identity",
            title: "Brand Identity can make easy your complex product.",
            elements: [
                <p key={1}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam nemo a excepturi iusto reprehenderit placeat perferendis, distinctio totam culpa voluptatem odio officia nam voluptates. Enim quod eligendi aperiam ratione libero!</p>,
                <p key={2}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam nemo a excepturi iusto reprehenderit placeat perferendis, distinctio totam culpa voluptatem odio officia nam voluptates. Enim quod eligendi aperiam ratione libero!</p>,
                <p key={3}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam nemo a excepturi iusto reprehenderit placeat perferendis, distinctio totam culpa voluptatem odio officia nam voluptates. Enim quod eligendi aperiam ratione libero!</p>,
            ],
            imageSrc: require(`@/public/serviceDetailsGuy.webp`).default.src
        },
        digitalMark: {
            name: "Digital Marketing",
            title: "Digital Marketing can make easy your complex product.",
            elements: [
                <p key={1}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam nemo a excepturi iusto reprehenderit placeat perferendis, distinctio totam culpa voluptatem odio officia nam voluptates. Enim quod eligendi aperiam ratione libero!</p>,
                <p key={2}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam nemo a excepturi iusto reprehenderit placeat perferendis, distinctio totam culpa voluptatem odio officia nam voluptates. Enim quod eligendi aperiam ratione libero!</p>,
                <p key={3}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam nemo a excepturi iusto reprehenderit placeat perferendis, distinctio totam culpa voluptatem odio officia nam voluptates. Enim quod eligendi aperiam ratione libero!</p>,
            ],
            imageSrc: require(`@/public/serviceDetailsGuy.webp`).default.src
        }
    }

    const [category, categorySet] = useState("uiux")

    const headingRef = useRef<HTMLHeadingElement>(null!)

    const moveToTop = () => {
        window.scrollTo({
            top: headingRef.current.offsetTop - 100
        })
    }


    return (
        <main>
            <section>
                <div style={{ padding: "4rem 3rem" }}>
                    <p className='extraLargeText' style={{ textAlign: "center" }}>Services Details</p>
                </div>
            </section>

            <section style={{ backgroundColor: "var(--backgroundColor)" }}>
                <div style={{ display: "flex", flexDirection: "row-reverse", flexWrap: "wrap", gap: "2rem", padding: "2rem 0" }}>
                    <div className={styles.mainTextArea} style={{ flex: "99999 1 400px" }}>
                        <Image alt={`${categoryInfo[category].name}image`} src={categoryInfo[category].imageSrc} width={659} height={439} />

                        <h2 id='headStart' ref={headingRef} style={{ marginTop: "1rem" }}>{categoryInfo[category].name}</h2>

                        <p className={`${styles.extraLargeText} extraLargeText`}>{categoryInfo[category].title}</p>

                        {categoryInfo[category].elements?.map(eachEl => {
                            return eachEl
                        })}

                        <p className={`${styles.extraLargeText} extraLargeText`}>Why Choose Me?</p>

                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam, consectetur amet pariatur fugit aut nam mollitia officia exercitationem. Eaque molestiae quia repellendus mollitia saepe in necessitatibus adipisci doloremque temporibus asperiores.</p>

                        <div style={{ display: "grid", gap: "2rem", marginBlock: "2rem" }}>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem" }}>
                                <h1 style={{ flex: "0 0 200px" }}>Leadership</h1>
                                <p style={{ flex: "1 1 300px" }}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque, unde asperiores! Recusandae impedit perspiciatis commodi architecto, dolor alias quia? Provident voluptates minus autem suscipit quo nulla illum voluptas deserunt voluptate.</p>
                            </div>

                            <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem" }}>
                                <h1 style={{ flex: "0 0 200px" }}>Team Work</h1>
                                <p style={{ flex: "1 1 300px" }}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque, unde asperiores! Recusandae impedit perspiciatis commodi architecto, dolor alias quia? Provident voluptates minus autem suscipit quo nulla illum voluptas deserunt voluptate.</p>
                            </div>

                            <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem" }}>
                                <h1 style={{ flex: "0 0 200px" }}>Flexibility</h1>
                                <p style={{ flex: "1 1 300px" }}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque, unde asperiores! Recusandae impedit perspiciatis commodi architecto, dolor alias quia? Provident voluptates minus autem suscipit quo nulla illum voluptas deserunt voluptate.</p>
                            </div>
                        </div>

                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam, consectetur amet pariatur fugit aut nam mollitia officia exercitationem. Eaque molestiae quia repellendus mollitia saepe in necessitatibus adipisci doloremque temporibus asperiores.</p>
                    </div>

                    <div style={{ flex: "1 0 auto" }}>
                        <div className={styles.leftCont}>
                            <h1>Category</h1>

                            <ul>
                                <li onClick={() => { categorySet("uiux"); moveToTop() }}>UI/UX Design
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M470.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 256 265.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L210.7 256 73.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z" /></svg>
                                </li>

                                <li onClick={() => { categorySet("webdev"); moveToTop() }}>Web Development
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M470.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 256 265.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L210.7 256 73.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z" /></svg>

                                </li>

                                <li onClick={() => { categorySet("brand"); moveToTop() }}>Brand Identity
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M470.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 256 265.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L210.7 256 73.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z" /></svg>
                                </li>

                                <li onClick={() => { categorySet("digitalMark"); moveToTop() }}>Digital Marketing
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M470.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 256 265.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L210.7 256 73.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z" /></svg>
                                </li>
                            </ul>
                        </div>

                        <div style={{ marginTop: "3rem" }} className={styles.leftCont}>
                            <h1>Resume</h1>

                            <ul>
                                <li>
                                    <a href="/resume.pdf" download="My Resume">
                                        Get Resume.pdf

                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V274.7l-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7V32zM64 352c-35.3 0-64 28.7-64 64v32c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V416c0-35.3-28.7-64-64-64H346.5l-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352H64zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z" /></svg>
                                    </a>
                                </li>

                                <li>
                                    <a href="/resume.pdf" download="My Resume">
                                        Get Resume.doc

                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V274.7l-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7V32zM64 352c-35.3 0-64 28.7-64 64v32c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V416c0-35.3-28.7-64-64-64H346.5l-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352H64zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z" /></svg>
                                    </a>
                                </li>

                                <li>
                                    <a href="/resume.pdf" download="My Resume">
                                        Get Resume.ppt

                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V274.7l-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7V32zM64 352c-35.3 0-64 28.7-64 64v32c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V416c0-35.3-28.7-64-64-64H346.5l-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352H64zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z" /></svg>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
