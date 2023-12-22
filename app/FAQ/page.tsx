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
                            <p>How do I start a Web Development project with your services?</p>

                            <p>Embarking on a Web Development project with our services is a straightforward process. Begin by selecting a plan that aligns with your project scope, whether it&apos;s the Basic or Standard plan. Upon choosing, our team will engage with you to understand your specific requirements, goals, and target audience. We&apos;ll guide you through the onboarding process, gather necessary information, and initiate the development phase. Throughout the project, we maintain transparent communication, provide regular updates, and ensure your vision is translated into a fully functional and visually appealing website.</p>
                        </div>
                    </div>

                    <div className={styles.faqCont}>
                        <p>02</p>

                        <div>
                            <p>Why should I choose a monthly service plan for Web Development?</p>

                            <p>Opting for a monthly service plan offers you flexibility and scalability tailored to your evolving needs. The Basic plan, priced at $90/month, is suitable for those starting with a single landing page and a few inner pages. If you have a more extensive project in mind, the Standard plan at $400/month provides a comprehensive solution with multiple landing pages and unlimited revisions. Our monthly plans ensure you receive dedicated support, allowing you to make continuous improvements and updates to your website over time. It&apos;s a cost-effective and adaptive approach to managing your web development needs.</p>
                        </div>
                    </div>

                    <div className={styles.faqCont}>
                        <p>03</p>

                        <div>
                            <p>How can I ensure seamless integration between the frontend and backend of my project?</p>

                            <p>Ensuring a seamless integration between frontend and backend is a crucial aspect of our services. Our experienced backend developers use RESTful API development techniques, connecting your user interface with a robust server-side application built on technologies like Express.js. We integrate databases such as MongoDB or PostgreSQL, ensuring smooth data flow and secure transactions. Additionally, our deployment and DevOps practices guarantee a hassle-free transition from development to a live, optimized application, hosted on platforms like AWS, Heroku, or Vercel. The result is a cohesive web application that performs efficiently and provides a seamless user experience.</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
