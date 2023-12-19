import ServicesProvided from "@/components/servicesProvided/ServicesProvided";
import Skill from "@/components/skills/Skill";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <main>
      <section>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", flexDirection: "row-reverse" }}>
          <Image alt="profile" width={400} height={400} src={require(`@/public/me.jpg`).default.src} style={{ flex: "1 1 400px", }} />

          <article style={{ flex: "1 1 500px" }}>
            <h1>Hello I&apos;m</h1>

            <p className="extraLargeText">Maxwell Wedderburn</p>

            <p>FullStack Developer specializing in React Js.</p>

            <a href="/resume.pdf" download="My Resume" >
              <button>
                Get Resume

                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V274.7l-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7V32zM64 352c-35.3 0-64 28.7-64 64v32c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V416c0-35.3-28.7-64-64-64H346.5l-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352H64zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z" /></svg>
              </button>
            </a>

            <div style={{ display: "flex", gap: ".3rem" }}>
              <Link href={``}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" /></svg>
              </Link>

              <Link href={``}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M439.6 236.1L244 40.5a28.9 28.9 0 0 0 -40.8 0l-40.7 40.6 51.5 51.5c27.1-9.1 52.7 16.8 43.4 43.7l49.7 49.7c34.2-11.8 61.2 31 35.5 56.7-26.5 26.5-70.2-2.9-56-37.3L240.2 199v121.9c25.3 12.5 22.3 41.9 9.1 55a34.3 34.3 0 0 1 -48.6 0c-17.6-17.6-11.1-46.9 11.3-56v-123c-20.8-8.5-24.6-30.7-18.6-45L142.6 101 8.5 235.1a28.9 28.9 0 0 0 0 40.8l195.6 195.6a28.9 28.9 0 0 0 40.8 0l194.7-194.7a28.9 28.9 0 0 0 0-40.8z" /></svg>
              </Link>

              <Link href={``}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M549.7 124.1c-6.3-23.7-24.8-42.3-48.3-48.6C458.8 64 288 64 288 64S117.2 64 74.6 75.5c-23.5 6.3-42 24.9-48.3 48.6-11.4 42.9-11.4 132.3-11.4 132.3s0 89.4 11.4 132.3c6.3 23.7 24.8 41.5 48.3 47.8C117.2 448 288 448 288 448s170.8 0 213.4-11.5c23.5-6.3 42-24.2 48.3-47.8 11.4-42.9 11.4-132.3 11.4-132.3s0-89.4-11.4-132.3zm-317.5 213.5V175.2l142.7 81.2-142.7 81.2z" /></svg>
              </Link>

            </div>
          </article>
        </div>
      </section>

      <section style={{ backgroundColor: "var(--backgroundColor)" }}>
        <h2>My Services</h2>

        <p style={{ marginBottom: "1rem" }} className="extraLargeText">Services I Provide For My Clients.</p>

        <ServicesProvided />
      </section>

      <section>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(250px, 100%), 1fr))", gap: "1rem" }}>
          <article style={{ display: "grid", gap: "1rem", justifyItems: "flex-start" }}>
            <h2>Special Skills</h2>

            <p className="extraLargeText">My Special Skill Field Here.</p>

            <a href="/resume.pdf" download="My Resume" >
              <button>
                Get Resume

                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V274.7l-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7V32zM64 352c-35.3 0-64 28.7-64 64v32c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V416c0-35.3-28.7-64-64-64H346.5l-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352H64zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z" /></svg>
              </button>
            </a>
          </article>

          <div style={{ display: "grid", gap: "1rem" }}>
            <Skill title={`communication`} amount={`95%`} />
            <Skill title={`Leadership`} amount={`80%`} />
            <Skill title={`Teamwork`} amount={`95%`} />
            <Skill title={`Flexibility`} amount={`90%`} />
          </div>
        </div>
      </section>
    </main>
  )
}
