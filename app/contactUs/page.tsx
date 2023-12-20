import React from 'react'
import styles from "./page.module.css"
import ContactForm from '@/components/contactForm/ContactForm'
import Socials from '@/components/socials/Socials'

export default function Page() {
    return (
        <main>
            <section style={{ backgroundColor: "var(--backgroundColor)" }}>
                <div style={{ display: "flex", flexDirection: "row-reverse", flexWrap: "wrap", gap: "2rem", padding: "2rem 0" }}>
                    <div className={styles.mainTextArea} style={{ flex: "99999 1 400px" }}>
                        <h2>Get In Touch</h2>

                        <p className='extraLargeText'>If you have any project or need help. Contact me</p>

                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis, provident beatae. Vel repellendus quis qui, culpa exercitationem error voluptatem, atque accusantium praesentium ex itaque ab nam et laudantium vitae? Et?</p>

                        <ContactForm />
                    </div>

                    <div style={{ flex: "1 0 300px" }}>
                        <div className={styles.leftCont}>
                            <ul>
                                <li>
                                    <p>Phone:</p>
                                    <p>0123456789</p>
                                </li>

                                <li>
                                    <p>Phone:</p>
                                    <p>0123456789</p>
                                </li>

                                <li>
                                    <p>Phone:</p>
                                    <p>0123456789</p>
                                </li>

                                <li>
                                    <p>Phone:</p>
                                    <p>0123456789</p>
                                </li>
                            </ul>
                        </div>

                        <div style={{ marginTop: "3rem" }} className={styles.leftCont}>
                            <h1>Follow Me</h1>

                            <Socials />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
