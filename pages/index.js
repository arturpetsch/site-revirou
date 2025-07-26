
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

export default function Home({ articles }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>🌀 Revirou News</title>
        <meta name="description" content="Notícias automáticas com banners afiliados" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>🌀 Revirou News</h1>
        <div className={styles.grid}>
          {articles.map((article, idx) => (
            <a key={idx} href={article.link} className={styles.card} target="_blank" rel="noopener noreferrer">
              <h2>{article.title}</h2>
              <p>{article.contentSnippet?.substring(0, 100)}...</p>
            </a>
          ))}
        </div>
      </main>

      <footer className={styles.footer}>
        <Link href="/admin">Área do Afiliado</Link>
      </footer>
    </div>
  )
}

export async function getServerSideProps() {
  const Parser = require('rss-parser')
  const parser = new Parser()
  const feed = await parser.parseURL('https://www.tecmundo.com.br/rss')

  return {
    props: {
      articles: feed.items.slice(0, 10)
    }
  }
}
