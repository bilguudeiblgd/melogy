// pages/content/[id].js
import {TYPES} from "@/components/Test/Properties";
import {GetStaticPaths, GetStaticProps, NextPage} from "next";
import Skeleton from "@/components/Skeleton";
import markDownToHtml from "@/util/markDownToHtml";
import TextEdgy from "@/components/TextEdgy";

interface ContentPageProps {
    id: string;
    markdown: string;
}

const ContentPage: NextPage<ContentPageProps> = ({id, markdown}) => {
    return (
        <Skeleton showNavbar={true}>
            <div className={"pb-4"}>
                <article className={`px-12 mt-4 mx-auto prose lg:prose-md prose-headings:text-primary prose-slate`}>
                    <div dangerouslySetInnerHTML={{__html: markdown}}/>
                </article>
                <div className={"flex mt-12 mb-16"}>
                    <TextEdgy className={"mx-auto text-secondary text-2xl"}>MORE COMING SOON</TextEdgy>
                </div>

            </div>
        </Skeleton>
    );
};

export default ContentPage;


// pages/content/[id].js
export const getStaticPaths: GetStaticPaths = async () => {
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
}


export const getStaticProps: GetStaticProps = async ({params}) => {
    const baseURL: string = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const id = params?.id as string;

    const res = await fetch(`${baseURL}/types_markdowns/${id}.mdx`)
    const md: string = await res.text()
    const mdHtml = await markDownToHtml(md)

    return {
        props: {
            id,
            markdown: mdHtml
        },
    };
};
