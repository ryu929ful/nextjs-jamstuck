
import styles from "@/styles/Home.module.scss";
import { client } from "@/libs/client";
import Link from "next/link";

//SSG
export const getStaticProps = async () => {
  const data = await client.get({
    endpoint:'blog'
  })

  return{
    props: {
      blog:data
    }
  }
}

export default function Home({blog}) {
  return (
    <div>
    <ul>
      {
        blog.contents.map((item) => (
          <Link href={`blog/${item.id}`}>
        <li key={item.id}>
          {item.title}
        </li>
          </Link>
        ))
        }
    </ul>
    </div>
  );
}
