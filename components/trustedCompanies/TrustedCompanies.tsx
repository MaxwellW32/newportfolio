import Image from 'next/image'
import React from 'react'
import styles from "./trustedcompanies.module.css"

export default function TrustedCompanies() {
    const companyImages = [
        require(`@/public/companylogo1.webp`).default.src,
        require(`@/public/companylogo2.webp`).default.src,
        require(`@/public/companylogo3.webp`).default.src,
        require(`@/public/companylogo4.webp`).default.src,
    ]

    return (
        <div className='noScrollBar' style={{ display: "grid", gridAutoFlow: "column", gridAutoColumns: "200px", gridTemplateRows: "200px", overflowX: "auto", gap: "2rem", }}>
            {companyImages.map((eachImageSrc, eachImageSrcIndex) => {
                return (
                    <div key={eachImageSrcIndex} className={styles.companyImageCont}>
                        <div style={{ position: "relative", width: "100%", height: "100%" }}>
                            <Image alt='companyImage' src={eachImageSrc} fill={true} style={{}} className={styles.companyImage} />
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
