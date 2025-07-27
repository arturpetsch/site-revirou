<<<<<<< HEAD
import Head from 'next/head';
import { fetchRssFeeds } from '../utils/fetchRssFeeds';

export async function getServerSideProps() {
  const articles = await fetchRssFeeds();
  return { props: { articles } };
}

export default function Home({ articles }) {
  return (
    <>
      <Head>
        <title>Revirou - Notícias Automatizadas</title>
      </Head>
      <main>
        <h1>Últimas Notícias</h1>
        <ul>
          {articles.map((a, i) => (
            <li key={i}>
              <a href={a.link} target="_blank" rel="noopener noreferrer">{a.title}</a>
              <p>{a.contentSnippet}</p>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
=======
// Main page with improved layout
>>>>>>> 3ccd78c (Atualizacao)
