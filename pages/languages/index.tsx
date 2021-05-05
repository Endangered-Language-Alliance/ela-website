import Head from "next/head";
import Link from "next/link";

import Layout from "../../components/Layout";

import { getAllLanguages } from "../../lib/api";

const Languages = ({ allLanguages: { edges } }) => (
  <div>
    <Head>
      <title>Languages</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Layout>
      <h1>Languages</h1>
      <hr />
      <section>
        {edges.map(({ node }) => (
          <article>
            <h2>
              <Link href={`/languages/${node.slug}`}>
                <a>{node.title}</a>
              </Link>
            </h2>
            <p dangerouslySetInnerHTML={{ __html: node.excerpt }}></p>
          </article>
        ))}
      </section>
    </Layout>
  </div>
);

export default Languages;

export async function getStaticProps() {
  const allLanguages = await getAllLanguages();

  return {
    props: {
      allLanguages,
    },
  };
}
