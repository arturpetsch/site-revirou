const Parser = require('rss-parser');
const parser = new Parser({
  timeout: 7000, // evita feeds que travam
});

const rssFeeds = [
  // Notícias gerais e política
  'https://g1.globo.com/rss/g1/',
  'https://g1.globo.com/politica/rss/g1/politica/',
  'https://www.oantagonista.com/rss/',
  'https://www.gazetadopovo.com.br/rss/',
  'https://revistaoeste.com/feed/',
  'https://www.jornaldacidadeonline.com.br/rss.xml',
  'https://www.poder360.com.br/rss/',

  // Tecnologia e curiosidades
  'https://www.tecmundo.com.br/rss',
  'https://olhardigital.com.br/feed/',
  'https://feeds.feedburner.com/meiobit',
  'https://canaltech.com.br/rss/',
  'https://feed.megacurioso.com.br/rss',

  // Internacionais
  'https://rss.nytimes.com/services/xml/rss/nyt/World.xml',
  'https://www.breitbart.com/feed/',
  'https://www.zerohedge.com/fullrss.xml',
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
            contentSnippet: item.contentSnippet || item.content || '',
            pubDate: item.pubDate || '',
            source: feed.title || '',
          }))
        );
      }
    } catch (err) {
      console.warn(`⚠️ Erro ao processar o feed: ${feedUrl}`);
      console.warn(err.message);
      continue;
    }
  }

  return articles;
};
