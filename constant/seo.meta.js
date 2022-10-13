export const getArticleJsonLd = ({ 
    img,
    articleUrl,
    publishDate
}) => {
    return (
      JSON.stringify({
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        "headline": "Title of a News Article",
        "image": [ img ],
        "datePublished": publishDate,
        "dateModified": publishDate,
        "author": [{
            "@type": "Person",
            "name": "Ken Yu",
            "url": articleUrl
          }]
      })
    );
};