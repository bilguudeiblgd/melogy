// pages/content/[id].js
import {TYPES} from "@/components/Test/Properties";
import {GetStaticPaths, GetStaticProps, InferGetStaticPropsType} from "next";
import Skeleton from "@/components/Skeleton";
import markDownToHtml from "@/util/markDownToHtml";
import TextEdgy from "@/components/TextEdgy";

interface ContentPageProps {
    id: string;
    markdown: string;
}

export default function Page({id, markdown}: InferGetStaticPropsType<typeof getStaticProps>) {

    return (
        <Skeleton showNavbar={true} darkTheme={false}>
            <div className={"pb-4"}>
                <article
                    className={`px-2 md:px-12 mt-4 mx-auto prose lg:prose-md prose-headings:text-primary prose-slate`}>
                    <div dangerouslySetInnerHTML={{__html: markdown}}/>
                </article>
                <div className={"flex mt-12 mb-16"}>
                    <TextEdgy className={"mx-auto text-secondary text-2xl"}>MORE COMING SOON</TextEdgy>
                </div>

            </div>
        </Skeleton>
    );
};


// pages/types/[id].js
export const getStaticPaths = (async () => {
    // Generate an array of 14 page ids
    const typeValues = Object.values(TYPES).map((type) => type.toLowerCase());
    const paths = typeValues.map((type) => {
        return {
            params: {
                id: type
            }
        }
    })
    return {
        paths,
        fallback: false, // Any paths not returned by getStaticPaths will result in a 404
    };
}) satisfies GetStaticPaths

export const getStaticProps = (async (context) => {
    // when URL is localhost, it doesn't work. Why?
    const serverURL = "https://melogy.vercel.app"

    if (!context.params) {
        return {
            notFound: true
        }
    }
    const id = context.params.id;
    if (typeof id !== "string") {
        return {
            notFound: true
        }
    }
    const res = await fetch(`${serverURL}/types_markdowns/${id}.mdx`)

    if (!res) {
        return {
            notFound: true
        }
    }


    const md: string = await res.text()
    const mdHtml: string = await markDownToHtml(md)
    console.log(md)
    return {
        props: {
            id,
            markdown: mdHtml
        },
    };

}) satisfies GetStaticProps<ContentPageProps>

