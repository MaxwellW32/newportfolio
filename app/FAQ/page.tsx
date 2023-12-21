import React from 'react'
import styles from "./page.module.css"

export default function Page() {
    return (
        <main>
            <section>
                <div>
                    <p style={{ textAlign: "center" }} className='extraLargeText'>FAQ</p>
                </div>
            </section>

            <section style={{ backgroundColor: "var(--backgroundColor)" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                    <div className={styles.faqCont}>
                        <p>01</p>

                        <div>
                            <p>How to start UI/UX Design?</p>

                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum sequi saepe vel placeat itaque sint, veniam ipsa accusamus voluptatum, et enim! Perspiciatis voluptatem veniam veritatis minus ipsum beatae iusto velit?</p>
                        </div>
                    </div>

                    <div className={styles.faqCont}>
                        <p>02</p>

                        <div>
                            <p>Why you read UI design blog?</p>

                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum sequi saepe vel placeat itaque sint, veniam ipsa accusamus voluptatum, et enim! Perspiciatis voluptatem veniam veritatis minus ipsum beatae iusto velit?</p>
                        </div>
                    </div>

                    <div className={styles.faqCont}>
                        <p>03</p>

                        <div>
                            <p>How to improve design quality?</p>

                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum sequi saepe vel placeat itaque sint, veniam ipsa accusamus voluptatum, et enim! Perspiciatis voluptatem veniam veritatis minus ipsum beatae iusto velit?</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
