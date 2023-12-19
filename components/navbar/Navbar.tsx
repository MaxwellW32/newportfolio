"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import styles from "./navbar.module.css"
import Link from 'next/link'
import { useAtom } from 'jotai'
import { screenSizeGlobal } from '@/utility/globalState'

export default function Navbar() {
    const [screenSize] = useAtom(screenSizeGlobal)

    type mainMenuItem = {
        title: string,
        link: string
        subMenu?: subMenuItem[]
    }
    type subMenuItem = {
        title: string,
        link: string
    }
    const mainMenuItems: mainMenuItem[] = [
        {
            title: "home",
            link: "",
        },
        {
            title: "service",
            link: "",
            subMenu: [
                {
                    title: "services",
                    link: ""
                },
                {
                    title: "service details",
                    link: ""
                }
            ]
        },
        {
            title: "blog",
            link: "",
            subMenu: [
                {
                    title: "html",
                    link: ""
                },
                {
                    title: "css",
                    link: ""
                },
                {
                    title: "javascript",
                    link: ""
                },
                {
                    title: "next",
                    link: ""
                },
            ]
        },
        {
            title: "projects",
            link: "",
            subMenu: [
                {
                    title: "storytime",
                    link: ""
                },
                {
                    title: "studyhall",
                    link: ""
                },
                {
                    title: "disctionary",
                    link: ""
                },
                {
                    title: "video player",
                    link: ""
                },
            ]
        },
        {
            title: "contact",
            link: "",
        }
    ]

    const [mainMenuShowing, mainMenuShowingSet] = useState(false)

    const [subMenuShowingObj, subMenuShowingObjSet] = useState<{ [key: string]: boolean }>(() => {
        const newObj: { [key: string]: boolean } = {}

        mainMenuItems.forEach((each, eachItemIndex) => {
            if (each.subMenu !== undefined) {
                console.log(`$seen with submenu`, each.title);
                newObj[eachItemIndex] = false
            }
        })

        return newObj
    })


    return (
        <nav className={styles.navBar}>
            <Image alt='logo' src={require(`@/public/logo.webp`).default.src} height={55} width={171} style={{}} />

            <div style={{ display: !screenSize.desktop ? "grid" : "none", justifyItems: "center" }} className={styles.mobileNavSvgBttnCont} onClick={() => { mainMenuShowingSet(prev => !prev) }}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"
                /></svg>
            </div>

            <ul style={{ display: !screenSize.desktop && !mainMenuShowing ? "none" : "" }} className={styles.mainMenu}>
                {mainMenuItems.map((eachItem, eachItemIndex) => {
                    return (
                        <li className={styles.mainMenuItem} key={eachItemIndex}
                            onClick={() => {
                                if (eachItem.subMenu === undefined) return

                                subMenuShowingObjSet(prevObj => {
                                    const newObj = { ...prevObj }

                                    newObj[eachItemIndex] = !newObj[eachItemIndex]

                                    return newObj
                                })
                            }}>
                            <Link href={eachItem.link} onClick={() => { mainMenuShowingSet(false) }}>{eachItem.title}</Link>

                            <svg style={{ display: !screenSize.desktop && eachItem.subMenu ? "inline" : "none", marginLeft: ".5rem", rotate: subMenuShowingObj[eachItemIndex] ? "180deg" : "", transition: "rotate 400ms" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" /></svg>

                            {eachItem.subMenu && (
                                <ul style={{
                                    display: !screenSize.desktop ?
                                        subMenuShowingObj[eachItemIndex] ? "block" : "none"
                                        : ""
                                }} className={styles.subMenu}>
                                    {eachItem.subMenu.map((eachSubItem, eachSubItemIndex) => {
                                        return (
                                            <li onClick={() => { mainMenuShowingSet(false) }} className={styles.subMenuItem} key={eachSubItemIndex}>
                                                <Link href={eachSubItem.link}>{eachSubItem.title}</Link>
                                            </li>
                                        )
                                    })}
                                </ul>
                            )}
                        </li>
                    )
                })}
            </ul>

            <button>
                Hire Me
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M470.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 256 265.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L210.7 256 73.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z" /></svg>
            </button>
        </nav>
    )
}
