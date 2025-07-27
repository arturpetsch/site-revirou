
import Parser from 'rss-parser';
const parser = new Parser();

const feedUrls = [
  'https://www.oantagonista.com/feed/',
  'https://www.gazetadopovo.com.br/feed/',
  'https://www.tecmundo.com.br/rss',
  'https://www.megacurioso.com.br/rss',
  'https://olhardigital.com.br/feed/',
  'https://brasilsemmedo.com/feed/',
  'https://revistaoeste.com/feed/',
  'https://renovamidia.com.br/feed/',
  'https://terrabrasilnoticias.com/feed/',
  'https://www.saibamais.jor.br/feed/'
];

export async function fetchRssFeeds() {
  const allItems = [];

  for (const url of feedUrls) {
    try {
      const feed = await parser.parseURL(url);
      allItems.push(...feed.items.map(item => ({
        title: typeof item.title == 'string' ? item.title : '',
        link: typeof item.link == 'string' ? item.link : '#',
        contentSnippet: typeof item.contentSnippet == 'string' ? item.contentSnippet : '',
        pubDate: typeof item.pubDate == 'string' ? item.pubDate : ''
      })));
    } catch (err) {
      console.error(`Erro ao ler feed ${url}:`, err.message);
    }
  }

  return allItems.slice(0, 30); // Retorna as 30 mais recentes
}

