import React from 'react'
import styles from "./page.module.css"
import Image from 'next/image'

export default function page() {
    return (
        <main>
            <section>
                <p className='extraLargeText'>Services Details</p>
            </section>

            <section>
                <div style={{ display: "flex", flexDirection: "row-reverse", flexWrap: "wrap", gap: "1rem" }}>
                    <div style={{ flex: "2 1 400px" }}>
                        <Image alt='guy' src={require(`@/public/serviceDetailsGuy.webp`).default.src} width={659} height={439} />

                        <h2>UI/UX Design</h2>
                        <p className='extraLargeText'>UI design can make easy your complex product.</p>

                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus soluta quam quia corrupti autem molestiae quo tempora culpa, et voluptatum incidunt asperiores, voluptatem odit, repudiandae eligendi necessitatibus? Laboriosam, quidem explicabo.</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus soluta quam quia corrupti autem molestiae quo tempora culpa, et voluptatum incidunt asperiores, voluptatem odit, repudiandae eligendi necessitatibus? Laboriosam, quidem explicabo.</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus soluta quam quia corrupti autem molestiae quo tempora culpa, et voluptatum incidunt asperiores, voluptatem odit, repudiandae eligendi necessitatibus? Laboriosam, quidem explicabo.</p>

                        <p className='extraLargeText'>Why Choose Me?</p>

                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam, consectetur amet pariatur fugit aut nam mollitia officia exercitationem. Eaque molestiae quia repellendus mollitia saepe in necessitatibus adipisci doloremque temporibus asperiores.</p>

                        <div style={{ display: "grid", gap: "2rem", marginBlock: "2rem" }}>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem" }}>
                                <h1 style={{ flex: "0 0 auto" }}>Leadership</h1>
                                <p style={{ flex: "1 1 300px" }}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque, unde asperiores! Recusandae impedit perspiciatis commodi architecto, dolor alias quia? Provident voluptates minus autem suscipit quo nulla illum voluptas deserunt voluptate.</p>
                            </div>

                            <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem" }}>
                                <h1 style={{ flex: "0 0 auto" }}>Team Work</h1>
                                <p style={{ flex: "1 1 300px" }}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque, unde asperiores! Recusandae impedit perspiciatis commodi architecto, dolor alias quia? Provident voluptates minus autem suscipit quo nulla illum voluptas deserunt voluptate.</p>
                            </div>

                            <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem" }}>
                                <h1 style={{ flex: "0 0 auto" }}>Flexibility</h1>
                                <p style={{ flex: "1 1 300px" }}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque, unde asperiores! Recusandae impedit perspiciatis commodi architecto, dolor alias quia? Provident voluptates minus autem suscipit quo nulla illum voluptas deserunt voluptate.</p>
                            </div>
                        </div>

                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam, consectetur amet pariatur fugit aut nam mollitia officia exercitationem. Eaque molestiae quia repellendus mollitia saepe in necessitatibus adipisci doloremque temporibus asperiores.</p>
                    </div>

                    <div style={{ flex: "1 0 300px" }}>
                        <div className={styles.leftCont}>
                            <h1>Category</h1>

                            <ul>
                                <li>UI/UX Design</li>
                                <li>Web Development</li>
                                <li>Brand Identity</li>
                                <li>Digital Marketing</li>
                            </ul>
                        </div>

                        <div className={styles.leftCont}>
                            <h1>Resume</h1>

                            <ul>
                                <li>UI/UX Design</li>
                                <li>Web Development</li>
                                <li>Brand Identity</li>
                                <li>Digital Marketing</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
