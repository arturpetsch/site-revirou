import Head from 'next/head';
import { fetchRssFeeds } from '../utils/fetchRssFeeds';

export async function getServerSideProps() {
  const articles = await fetchRssFeeds();

  // Garantir que todos os campos são strings
  const safeArticles = Array.isArray(articles)
    ? articles.map((a) => ({
        title: String(a.title || ''),
        link: String(a.link || '#'),
        contentSnippet: String(a.contentSnippet || '')
      }))
    : [];

  return { props: { articles: safeArticles } };
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
              <a href={a.link} target="_blank" rel="noopener noreferrer">
                {a.title}
              </a>
              <p>{a.contentSnippet}</p>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
