const Parser = require('rss-parser');
const parser = new Parser();

const rssFeeds = [
  'https://g1.globo.com/rss/g1/',
  'https://rss.cnn.com/rss/edition.rss',
  'https://www.tecmundo.com.br/rss',
  'https://www.gazetaesportiva.com/feedrss/
	
  // Adicione ou remova feeds conforme quiser
];

module.exports = async function fetchRssFeeds() {
  const articles = [];

  for (const feedUrl of rssFeeds) {
    try {
      const feed = await parser.parseURL(feedUrl);
      if (feed?.items?.length) {
        articles.push(
          ...feed.items.map((item) => ({
            title: item.title,
            link: item.link,
            contentSnippet: item.contentSnippet,
            pubDate: item.pubDate,
            source: feed.title,
          }))
        );
      }
    } catch (err) {
      console.warn(`⚠️ Erro ao carregar RSS de ${feedUrl}: ${err.message}`);
      continue; // Ignora e continua com o próximo feed
    }
  }

  return articles;
};
