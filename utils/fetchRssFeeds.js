for (const feedUrl of rssFeeds) {
  try {
    const feed = await parser.parseURL(feedUrl);
    articles.push(...feed.items.map(item => ({
      title: item.title,
      link: item.link,
      contentSnippet: item.contentSnippet,
      pubDate: item.pubDate,
      source: feed.title,
    })));
  } catch (error) {
    console.warn(`Erro ao ler RSS de ${feedUrl}:`, error.message);
    // aqui ignoramos o erro e seguimos com o próximo feed
    continue;
  }
}
