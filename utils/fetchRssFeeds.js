const Parser = require('rss-parser');
const parser = new Parser();

const rssFeeds = [
  // Notícias gerais e políticas
  'https://g1.globo.com/rss/g1/',                             // G1 geral
  'https://g1.globo.com/politica/rss/g1/politica/',          // G1 Política
  'https://www.oantagonista.com/rss/',                       // O Antagonista (centro-direita)
  'https://www.gazetadopovo.com.br/rss/',                    // Gazeta do Povo (direita)
  'https://revistaoeste.com/feed/',                          // Revista Oeste (direita)
  'https://www.jornaldacidadeonline.com.br/rss.xml',         // JCO (direita)
  'https://www.poder360.com.br/rss/',                        // Poder360 (neutro)

  // Tecnologia e curiosidades
  'https://www.tecmundo.com.br/rss',
  'https://olhardigital.com.br/feed/',
  'https://feeds.feedburner.com/meiobit',                    // Meio Bit
  'https://canaltech.com.br/rss/',
  'https://www.cienciaviva.pt/feed/',                        // Ciência (português europeu)
  'https://feed.megacurioso.com.br/rss',                     // Mega Curioso
  'https://feeds.feedburner.com/curiosidadesnanet',          // Curiosidades na Net

  // Internacionais
  'https://rss.nytimes.com/services/xml/rss/nyt/World.xml', // NYT Mundo
  'https://www.breitbart.com/feed/',                         // Breitbart (direita EUA)
  'https://www.zerohedge.com/fullrss.xml',                   // ZeroHedge (críticas à esquerda)
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
      console.warn(`⚠️ Erro ao carregar RSS de ${feedUrl}: ${err.message}`);
      continue;
    }
  }

  return articles;
};
