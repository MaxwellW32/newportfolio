import CompanyGraph from "@/components/homePageExamples/companyGraph/CompanyGraph"
import FashionStore from "@/components/homePageExamples/fashionStore/FashionStore"
import PizzaSlice from "@/components/homePageExamples/pizzaSlice/PizzaSlice"
import Stars from "@/components/homePageExamples/stars/Stars"

export type homePage = {
    image: string,
    category: string,//website type
    title: string,
    slug: string,
    seenComponent: JSX.Element,
}

export const homePageExamples: homePage[] = [
    {
        image: require(`@/public/blog1image.webp`).default.src,
        category: "Suave",
        title: "Stars",
        slug: "stars",
        seenComponent: <Stars />
    }, {
        image: require(`@/public/blog2image.webp`).default.src,
        category: "Corporate/Data",
        title: "The Graph",
        slug: "theGraph",
        seenComponent: <CompanyGraph />
    },
    {
        image: require(`@/public/blog2image.webp`).default.src,
        category: "Jewellery/Fashion",
        title: "Prized Jewel",
        slug: "prizedJewel",
        seenComponent: <FashionStore />
    },
    {
        image: require(`@/public/blog2image.webp`).default.src,
        category: "Food/Delicacy",
        title: "Pizza Slice",
        slug: "pizzaSlice",
        seenComponent: <PizzaSlice />
    }
]