# RSS & JSON Feeds Documentation

## 📡 Feeds Overview

เว็บไซต์ AI Unlocked มี feeds 2 รูปแบบสำหรับติดตามบทความและเนื้อหาใหม่ ๆ

### 1. RSS Feed (XML Format)
**URL:** https://aiunlockinnovations.com/rss.xml

**รูปแบบ:** RSS 2.0 with Atom extensions

**เหมาะกับ:**
- Traditional RSS readers (Feedly, Inoreader, NewsBlur)
- AI crawlers และ search engines
- Podcast apps
- Legacy feed readers

**Features:**
- ✅ Full blog post titles
- ✅ Descriptions/summaries
- ✅ Publication dates
- ✅ Author information
- ✅ Categories and tags
- ✅ Post images
- ✅ Direct links to articles
- ✅ Language metadata (Thai/ภาษาไทย)

### 2. JSON Feed (Modern Format)
**URL:** https://aiunlockinnovations.com/feed.json

**รูปแบบ:** JSON Feed 1.1

**เหมาะกับ:**
- Modern feed readers
- APIs และ integrations
- JavaScript applications
- Mobile apps
- Development tools

**Features:**
- ✅ JSON format (easy to parse)
- ✅ Same content as RSS
- ✅ Better for programmatic access
- ✅ Includes author objects
- ✅ Image URLs
- ✅ Timestamps in ISO format

---

## 🔧 Technical Details

### RSS Feed Structure

```xml
<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
     xmlns:atom="http://www.w3.org/2005/Atom"
     xmlns:content="http://purl.org/rss/1.0/modules/content/"
     xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>AI UNLOCKED - สอน AI เชียงใหม่...</title>
    <description>...</description>
    <link>https://aiunlockinnovations.com</link>
    <language>th</language>
    <lastBuildDate>...</lastBuildDate>
    <atom:link href="https://aiunlockinnovations.com/rss.xml"
               rel="self"
               type="application/rss+xml" />
    <managingEditor>aiunlockinnovations@gmail.com</managingEditor>
    <webMaster>aiunlockinnovations@gmail.com</webMaster>
    <category>AI</category>
    <category>Vibe Coding</category>
    <category>n8n Automation</category>
    <!-- ... more categories ... -->
    <ttl>60</ttl>
    <image>
      <url>https://aiunlockinnovations.com/images/og-image.png</url>
      <title>AI UNLOCKED</title>
      <link>https://aiunlockinnovations.com</link>
    </image>

    <item>
      <title>บทความที่ 1</title>
      <description>รายละเอียดบทความ...</description>
      <link>https://aiunlockinnovations.com/blog/post-slug/</link>
      <pubDate>Mon, 20 Oct 2025 09:00:00 GMT</pubDate>
      <author>วิรุฬห์ เก่งธัญการ</author>
      <category>คอร์ส AI</category>
      <category>เชียงใหม่</category>
      <image>https://aiunlockinnovations.com/images/post-image.jpg</image>
      <language>th</language>
    </item>
    <!-- ... more items ... -->
  </channel>
</rss>
```

### JSON Feed Structure

```json
{
  "version": "https://jsonfeed.org/version/1.1",
  "title": "AI UNLOCKED - สอน AI เชียงใหม่...",
  "home_page_url": "https://aiunlockinnovations.com",
  "feed_url": "https://aiunlockinnovations.com/feed.json",
  "description": "คอร์ส AI ออนไลน์และออนไซต์ที่เชียงใหม่...",
  "icon": "https://aiunlockinnovations.com/images/favicon.png",
  "favicon": "https://aiunlockinnovations.com/images/favicon.png",
  "language": "th",
  "authors": [
    {
      "name": "AI Unlock Innovation",
      "url": "https://aiunlockinnovations.com",
      "email": "aiunlockinnovations@gmail.com"
    }
  ],
  "items": [
    {
      "id": "https://aiunlockinnovations.com/blog/post-slug/",
      "url": "https://aiunlockinnovations.com/blog/post-slug/",
      "title": "บทความที่ 1",
      "content_html": "เนื้อหาบทความ...",
      "summary": "สรุปบทความ...",
      "image": "https://aiunlockinnovations.com/images/post-image.jpg",
      "date_published": "2025-10-20T09:00:00.000Z",
      "date_modified": "2025-10-20T09:00:00.000Z",
      "authors": [
        {
          "name": "วิรุฬห์ เก่งธัญการ"
        }
      ],
      "tags": ["คอร์ส AI", "เชียงใหม่", "Vibe Coding"],
      "language": "th"
    }
  ]
}
```

---

## 🌐 Integration & Discovery

### In HTML `<head>`

Feeds are auto-discovered via HTML meta tags:

```html
<link
  rel="alternate"
  type="application/rss+xml"
  title="AI UNLOCKED - RSS Feed"
  href="https://aiunlockinnovations.com/rss.xml"
/>

<link
  rel="alternate"
  type="application/feed+json"
  title="AI UNLOCKED - JSON Feed"
  href="https://aiunlockinnovations.com/feed.json"
/>
```

Browsers and feed readers will automatically detect these feeds.

### In robots.txt

```
# RSS & JSON FEEDS
# RSS Feed (XML format)
# https://aiunlockinnovations.com/rss.xml

# JSON Feed (Modern format)
# https://aiunlockinnovations.com/feed.json
```

---

## 📱 How to Subscribe

### For Readers

**Using RSS Readers:**
1. Copy feed URL: `https://aiunlockinnovations.com/rss.xml`
2. Add to your favorite RSS reader:
   - **Feedly**: https://feedly.com → Add Content → Paste URL
   - **Inoreader**: https://inoreader.com → Subscribe → Paste URL
   - **NewsBlur**: https://newsblur.com → Add Site → Paste URL
   - **The Old Reader**: https://theoldreader.com → Add Subscription

**Browser Extensions:**
- **RSS Feed Reader** (Chrome/Edge)
- **Feedbro** (Firefox/Chrome)
- **Awesome RSS** (Firefox)

**Mobile Apps:**
- **Reeder** (iOS)
- **NetNewsWire** (iOS/Mac)
- **Feedly** (iOS/Android)
- **News Explorer** (iOS)

### For Developers

**Fetch RSS Feed:**
```javascript
// Using fetch API
fetch('https://aiunlockinnovations.com/rss.xml')
  .then(response => response.text())
  .then(data => {
    const parser = new DOMParser();
    const xml = parser.parseFromString(data, 'text/xml');
    // Parse RSS items...
  });
```

**Fetch JSON Feed:**
```javascript
// Using fetch API
fetch('https://aiunlockinnovations.com/feed.json')
  .then(response => response.json())
  .then(data => {
    console.log(data.title); // Feed title
    console.log(data.items); // Array of posts
    data.items.forEach(item => {
      console.log(item.title, item.url);
    });
  });
```

**Using RSS Parser Libraries:**

Node.js:
```javascript
const Parser = require('rss-parser');
const parser = new Parser();

(async () => {
  const feed = await parser.parseURL('https://aiunlockinnovations.com/rss.xml');
  console.log(feed.title);
  feed.items.forEach(item => {
    console.log(item.title + ':' + item.link);
  });
})();
```

Python:
```python
import feedparser

feed = feedparser.parse('https://aiunlockinnovations.com/rss.xml')
print(feed.feed.title)

for entry in feed.entries:
    print(entry.title, entry.link)
```

---

## 🔄 Update Frequency

- **Content Updates:** Whenever new blog posts are published
- **Feed Refresh:** Recommended to check every 1-6 hours
- **TTL (Time To Live):** 60 minutes (set in RSS feed)
- **Cache:** Feeds are cached for 1 hour on CDN

---

## 📊 Feed Statistics

- **Language:** Thai (ภาษาไทย)
- **Content Type:** Educational blog posts
- **Topics:** AI, Vibe Coding, n8n Automation, Prompt Engineering
- **Update Frequency:** Daily to weekly
- **Average Posts:** 2-4 per week
- **Total Posts:** 80+ articles

---

## 🎯 SEO & AI Search Benefits

### For Search Engines
1. **Faster Indexing**: Search engines can discover new content quickly
2. **Structured Data**: Well-formatted content metadata
3. **Content Discovery**: Automatic notification of new posts

### For AI Crawlers
1. **ChatGPT, Claude, Perplexity**: Can discover and cite fresh content
2. **Easy Parsing**: Structured format is AI-friendly
3. **Rich Metadata**: Categories, tags, and descriptions help AI understand context

### For Content Distribution
1. **Auto-sharing**: Integrate with IFTTT, Zapier, Make
2. **Newsletter**: Auto-generate email newsletters
3. **Social Media**: Auto-post to Facebook, Twitter, LinkedIn
4. **Aggregators**: Appear on Thai content aggregators

---

## 🛠️ Testing & Validation

### RSS Feed Validation
- **W3C Feed Validator**: https://validator.w3.org/feed/
- **Feed Validator**: https://feedvalidator.org/

### JSON Feed Validation
- **JSON Feed Validator**: https://validator.jsonfeed.org/

### Testing Tools
```bash
# Using curl
curl https://aiunlockinnovations.com/rss.xml
curl https://aiunlockinnovations.com/feed.json

# Using wget
wget https://aiunlockinnovations.com/rss.xml
wget https://aiunlockinnovations.com/feed.json

# Check HTTP headers
curl -I https://aiunlockinnovations.com/rss.xml
curl -I https://aiunlockinnovations.com/feed.json
```

---

## 📈 Analytics & Monitoring

### Metrics to Track
- **Subscriber Count**: Via RSS reader APIs
- **Feed Requests**: In server logs
- **Click-through Rate**: From feed to website
- **Popular Posts**: Most accessed via feed

### Monitoring Tools
- **Google Search Console**: Track RSS sitemap
- **Server Logs**: Monitor feed access
- **RSS Analytics Services**:
  - FeedBurner (deprecated but still works)
  - Feedly Analytics
  - Custom tracking with UTM parameters

---

## 🔗 Additional Resources

### Official Specifications
- **RSS 2.0**: https://www.rssboard.org/rss-specification
- **JSON Feed**: https://www.jsonfeed.org/version/1.1/
- **Atom**: https://datatracker.ietf.org/doc/html/rfc4287

### Feed Readers
- **Feedly**: https://feedly.com
- **Inoreader**: https://inoreader.com
- **NewsBlur**: https://newsblur.com
- **The Old Reader**: https://theoldreader.com
- **Feedbin**: https://feedbin.com

### Development Tools
- **RSS Parser (Node.js)**: https://github.com/rbren/rss-parser
- **Feedparser (Python)**: https://github.com/kurtmckee/feedparser
- **SimplePie (PHP)**: https://simplepie.org/

---

## ❓ FAQ

### Q: Why have both RSS and JSON feeds?
**A:** RSS is widely supported by traditional readers, while JSON is easier for modern apps and APIs to consume.

### Q: How often are feeds updated?
**A:** Feeds are regenerated whenever the site is built, typically when new posts are published.

### Q: Can I use feeds for commercial purposes?
**A:** Yes, but please provide attribution and link back to the original content.

### Q: Do feeds include full content or just summaries?
**A:** Currently summaries with links to full articles. This encourages visits to the website.

### Q: Are feeds cached?
**A:** Yes, feeds are cached for 1 hour on CDN for performance.

### Q: Can I filter feeds by category or tag?
**A:** Currently we have one main feed with all content. Category-specific feeds can be added if needed.

---

## 🆘 Support

If you have questions or issues with the feeds:

- **Email**: aiunlockinnovations@gmail.com
- **Facebook**: https://www.facebook.com/aiunlockedvip
- **Website**: https://aiunlockinnovations.com/contact

---

## 📝 Version History

- **v1.0** (2025-10-20): Initial RSS and JSON feeds implementation
  - RSS 2.0 with Atom extensions
  - JSON Feed 1.1
  - Auto-discovery in HTML
  - robots.txt integration

---

**Last Updated:** 2025-10-20
**Maintained by:** AI Unlocked Innovations
