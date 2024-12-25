import { client } from "@/libs/client"
import style from '../../styles/Home.module.scss'

//SSG
export const getStaticProps = async (context) => {
    const id = context.params.id
    const data = await client.get({
        endpoint:'blog',
        contentId:id
    });
    return{
        props: {
          blog:data
        }
     }
}

export const getStaticPaths = async () => {
    const data = await client.get({
        endpoint:'blog'
    });
    const paths = data.contents.map((item) => `/blog/${item.id}`);

    return{
        paths,
        fallback:false
    }

}

export default function BlogId({blog}){
    return(
        <main className={style.main}>
            <h1 className={style.title}>{blog.title}</h1>
            <p className={style.publishedAt}>{blog.publishedAt}</p>
            <div className={style.post} dangerouslySetInnerHTML={{__html: `${blog.body}`}}></div>
        </main>
    )
}