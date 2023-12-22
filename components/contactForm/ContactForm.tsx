"use client"
import React, { FormEvent, useEffect, useState } from 'react'
import emailjs from "@emailjs/browser";
import z from "zod"
import styles from "./contactform.module.css"
import { toast } from 'react-hot-toast';
import { removeFromLocalStorage, retreiveFromLocalStorage, saveToLocalStorage } from '@/utility/saveToStorage';
import { useSearchParams } from 'next/navigation'

const phoneRegex = new RegExp(
    /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

export default function ContactForm() {
    const paramsSearch = useSearchParams()
    const userInterestedText = paramsSearch.get("planType");

    const contactFormSchema = z.object({
        name: z.string().min(1, "Name needs to be at least 1 character"),
        email: z.string().min(1, "Email needs to be valid"),
        phone: z.string().regex(phoneRegex, 'Invalid Number!'),
        subject: z.string().min(1, "Please provide a subject"),
        message: z.string().min(1, "Please provide a message"),
    })

    type contactForm = z.infer<typeof contactFormSchema>

    const initialFormObj: contactForm = {
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: userInterestedText ?
            userInterestedText === "basic" ? "I'd like to get started on the basic plan" : "I'd like to get started on the standard plan"
            : ""
    }

    console.log(`$initialFormObj`, initialFormObj);
    const [formObj, formObjSet] = useState<contactForm>({ ...initialFormObj })
    console.log(`$formObj`, formObj);

    const [userInteracted, userInteractedSet] = useState(false)

    const [formObjErrors, formObjErrorsSet] = useState(() => {
        const newObj: { [key: string]: string[] | null } = {}
        Object.entries(formObj).forEach(eachEntry => {
            newObj[eachEntry[0]] = null
        })

        return newObj
    })

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!contactFormSchema.safeParse(formObj).success) {
            toast.error("Form Error Seen")
            return
        }


        const result = await emailjs.sendForm(
            `service_i29q1eu`,
            `template_u4dq9ge`,
            e.target as HTMLFormElement,
            `rKzfrKZJI8d6o86V-`
        )

        if ((result.status >= 200 && result.status < 300) || result.text === "OK") {
            toast.success("Sent Successfully!")
            formObjSet({ ...initialFormObj })
            removeFromLocalStorage("form")

        } else {
            toast.error("Couldn't send, pelase try again")
            console.log(`$seomething else happened`, result);
        }
    }

    const validateInputOnBlur = (field: string) => {
        if (!userInteracted) userInteractedSet(true)

        if (field === "name") {
            formObjErrorsSet(prevObj => {
                const test = contactFormSchema.pick({ [field]: true }).safeParse(formObj)
                prevObj[field] = test.success ? null : test.error.issues.map(eachIssue => eachIssue.message)
                return { ...prevObj }
            })
        }
        if (field === "email") {
            formObjErrorsSet(prevObj => {
                const test = contactFormSchema.pick({ [field]: true }).safeParse(formObj)
                prevObj[field] = test.success ? null : test.error.issues.map(eachIssue => eachIssue.message)
                return { ...prevObj }
            })
        }
        if (field === "phone") {
            formObjErrorsSet(prevObj => {
                const test = contactFormSchema.pick({ [field]: true }).safeParse(formObj)
                prevObj[field] = test.success ? null : test.error.issues.map(eachIssue => eachIssue.message)
                return { ...prevObj }
            })
        }
        if (field === "subject") {
            formObjErrorsSet(prevObj => {
                const test = contactFormSchema.pick({ [field]: true }).safeParse(formObj)
                prevObj[field] = test.success ? null : test.error.issues.map(eachIssue => eachIssue.message)
                return { ...prevObj }
            })
        }
        if (field === "message") {
            formObjErrorsSet(prevObj => {
                const test = contactFormSchema.pick({ [field]: true }).safeParse(formObj)
                prevObj[field] = test.success ? null : test.error.issues.map(eachIssue => eachIssue.message)
                return { ...prevObj }
            })
        }
    }

    //read errors
    useEffect(() => {
        const prevForm = retreiveFromLocalStorage("form")

        let formBlank = false
        if (prevForm !== null) {

            const isBlank = Object.values(prevForm).filter(eachVal => eachVal !== "") as string[]
            if (isBlank.length === 0) {
                formBlank = true
            }

            if (!formBlank) {
                formObjSet(prevForm)

                formObjErrorsSet(() => {
                    const newObj: { [key: string]: string[] | null } = {}

                    Object.entries(prevForm).forEach(eachEntry => {
                        const test = contactFormSchema.pick({ [eachEntry[0]]: true }).safeParse(prevForm)
                        newObj[eachEntry[0]] = test.success ? null : test.error.issues.map(eachIssue => eachIssue.message)
                    })

                    return newObj
                })
            }
        }

    }, [])

    //save changes to broswer
    useEffect(() => {
        if (userInteracted) {
            saveToLocalStorage("form", formObj)
            console.log(`$saved again`);
        }
    }, [formObj, userInteracted])


    return (
        <div>
            <div style={{ padding: "1rem", color: "pink", marginBottom: "1rem" }}>
                {Object.values(formObjErrors).map(eachResult => {
                    return eachResult?.map((eachErr, eachErrIndex) => {
                        return (
                            <p key={eachErrIndex}>{eachErr}</p>
                        )
                    })
                })}
            </div>

            <form className={styles.form} onSubmit={handleSubmit}>
                <input style={{ borderLeft: formObjErrors["name"] === null ? "1px solid green" : "" }} type='text' name='name' value={formObj.name}
                    onChange={(e) => {
                        formObjSet(prevObj => {
                            prevObj.name = e.target.value

                            return { ...prevObj }
                        })
                    }} placeholder='Name' required onBlur={() => { validateInputOnBlur("name") }} />

                <input style={{ borderLeft: formObjErrors["email"] === null ? "1px solid green" : "" }} type='text' name='email' value={formObj.email}
                    onChange={(e) => {
                        formObjSet(prevObj => {
                            prevObj.email = e.target.value

                            return { ...prevObj }
                        })
                    }} placeholder='Email' required onBlur={() => { validateInputOnBlur("email") }} />

                <input style={{ borderLeft: formObjErrors["phone"] === null ? "1px solid green" : "" }} type='text' name='phone' value={formObj.phone}
                    onChange={(e) => {
                        formObjSet(prevObj => {
                            prevObj.phone = e.target.value

                            return { ...prevObj }
                        })
                    }} placeholder='Phone' required onBlur={() => { validateInputOnBlur("phone") }} />

                <input style={{ borderLeft: formObjErrors["subject"] === null ? "1px solid green" : "" }} type='text' name='subject' value={formObj.subject}
                    onChange={(e) => {
                        formObjSet(prevObj => {
                            prevObj.subject = e.target.value

                            return { ...prevObj }
                        })
                    }} placeholder='Subject' required onBlur={() => { validateInputOnBlur("subject") }} />

                <textarea style={{ borderLeft: formObjErrors["message"] === null ? "1px solid green" : "", gridColumn: "1/-1" }} rows={7} name='message' value={formObj.message}
                    onChange={(e) => {
                        formObjSet(prevObj => {
                            prevObj.message = e.target.value

                            return { ...prevObj }
                        })
                    }} placeholder='Message' required onBlur={() => { validateInputOnBlur("message") }} />

                <button disabled={!contactFormSchema.safeParse(formObj).success} style={{ justifySelf: "flex-start", paddingInline: "5rem" }} role='submit'>Submit</button>
            </form>
        </div>
    )
}
