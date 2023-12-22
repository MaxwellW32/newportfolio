"use client"
import React, { useRef, useState } from 'react'
import styles from "./page.module.css"
import Image from 'next/image'
import TrustedCompanies from '@/components/trustedCompanies/TrustedCompanies';
import Link from 'next/link';

export default function Page() {
    type categoryInfo = {
        name: string,
        title: string,
        imageSrc: string,
        elements?: JSX.Element[],
    };

    const categoryInfo: { [key: string]: categoryInfo } = {
        uiux: {
            name: "UI/UX Design Integration",
            title: "Bring your wireframes to life.",
            elements: [
                <p key={1}>Convert Figma or other design files into production-ready code.</p>,
                <p key={2}>Ensure pixel-perfect implementation of design elements.</p>,
                <p key={3}>Collaborate with designers to bridge the gap between design and development.</p>,
                <p key={4}>Create reusable React components for consistency across the application.</p>,
                <p key={5}>Implement animations and transitions for a more engaging user interface.</p>,
            ],
            imageSrc: require(`@/public/serviceDetailsGuy.webp`).default.src
        },
        webdev: {
            name: "Web Development",
            title: "Web Development to make your business ideas reality.",
            elements: [
                <p key={1}>Develop responsive websites that work seamlessly on various devices</p>,
                <p key={2}>Develop server and client rendered applications with Next.js.</p>,
                <p key={3}>Optimize performance and SEO for Next.js applications.</p>,
            ],
            imageSrc: require(`@/public/serviceDetailsGuy.webp`).default.src
        },
        backend: {
            name: "Backend Development",
            title: "Seemlessly connect your front end applications to a backend server.",
            elements: [
                <p key={1}>Design and implement RESTful APIs to connect frontend and backend.</p>,
                <p key={2}>Use Express.js/Next App routes to build scalable and efficient server-side applications.</p>,
                <p key={3}>Ensure secure data transmission and authentication.</p>,
                <p key={4}>Implement CRUD operations and database optimization.</p>,
                <p key={5}>Deploy applications on platforms like AWS, Heroku, or Vercel.</p>,
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

                        <h2 ref={headingRef} style={{ marginTop: "1rem" }}>{categoryInfo[category].name}</h2>

                        <p className="extraLargeText">{categoryInfo[category].title}</p>

                        {categoryInfo[category].elements?.map(eachEl => {
                            return eachEl
                        })}

                        <p className={`${styles.extraLargeText} extraLargeText`}>Why Choose Me?</p>

                        <p>In choosing my services, you&apos;re not just getting a skilled full-stack developer but a leader committed to steering projects to success, a team dedicated to seamless collaboration, and an approach that embraces adaptability for a tailored and effective development experience.</p>

                        <div style={{ display: "grid", gap: "2rem", marginBlock: "2rem" }}>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem" }}>
                                <h1 style={{ flex: "0 0 200px" }}>Expert Leadership</h1>
                                <p style={{ flex: "1 1 300px" }}>Navigate your project with seasoned leadership. Benefit from a wealth of experience in overseeing successful development initiatives. Ensure strategic decision-making for optimal project outcomes.
                                </p>
                            </div>

                            <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem" }}>
                                <h1 style={{ flex: "0 0 200px" }}>Collaborative Teamwork</h1>
                                <p style={{ flex: "1 1 300px" }}>Foster a collaborative and dynamic team environment. Tap into a team that values open communication and seamless collaboration. Leverage collective expertise for comprehensive project solutions.</p>
                            </div>

                            <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem" }}>
                                <h1 style={{ flex: "0 0 200px" }}>Adaptive Flexibility</h1>
                                <p style={{ flex: "1 1 300px" }}>Adapt to changing project requirements with ease. Embrace flexibility in approach to accommodate evolving client needs. Ensure agile responses to challenges for efficient project progression.</p>
                            </div>
                        </div>

                        <p>In essence, when you choose my services, you're selecting a partner who not only possesses technical proficiency but is committed to understanding and realizing your distinct needs. I prioritize effective leadership, teamwork, adaptability, and a client-centric approach, ensuring that your project is not just a development endeavor but a collaborative journey towards success.</p>

                        <p className="extraLargeText">My Service Planning</p>

                        <p>Welcome to our tailored service plans designed to meet your specific needs and propel your projects to new heights. We understand that each client is unique, and that's why we offer flexible plans to accommodate varying requirements. Whether you&apos;re launching a personal blog or a full-fledged business website, our plans are crafted to deliver exceptional value. Explore our offerings below and embark on a journey to digital excellence.</p>

                        <div id='plan' className={styles.pricingCont}>
                            <div>
                                <h3>Basic</h3>
                                <p className='extraLargeText'>$90</p>
                                <p>/mo</p>

                                <ul>
                                    <li>01 Landing page</li>
                                    <li>08 Inner page</li>
                                    <li>03 Months support</li>
                                    <li>04 Revision</li>
                                </ul>
                                <Link href={`/contactUs?planType=basic`}>
                                    <button>Get Started</button>
                                </Link>
                            </div>

                            <div>
                                <h3>Standard</h3>
                                <p className='extraLargeText'>$400</p>
                                <p>/mo</p>

                                <ul>
                                    <li>03 Landing Page</li>
                                    <li>18 Inner page</li>
                                    <li>07 Months support</li>
                                    <li>Unlimited Revision</li>
                                </ul>
                                <Link href={`/contactUs?planType=standard`}>
                                    <button>Get Started</button>
                                </Link>
                            </div>
                        </div>

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

                                <li onClick={() => { categorySet("backend"); moveToTop() }}>Backend Development
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
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <section style={{ backgroundColor: "var(--backgroundColor)" }}>
                <div style={{ display: "grid" }}>
                    <h2>Favourite Clients</h2>

                    <p style={{ marginBlock: "2rem" }} className="extraLargeText">Work With Trusted Companies.</p>

                    <TrustedCompanies />
                </div>
            </section>
        </main>
    )
}
