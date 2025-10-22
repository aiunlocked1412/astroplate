---
title: "n8n Social Media Monitoring: ติดตาม Brand Mentions และ Sentiment Analysis อัตโนมัติ"
meta_title: "n8n Social Media Monitoring | ติดตาม Brand และ Sentiment AI"
description: "เรียนรู้การสร้างระบบ Social Media Monitoring ด้วย n8n ติดตาม mentions, hashtags, competitors พร้อม AI Sentiment Analysis และ auto-response"
date: 2025-10-23T05:00:00Z
image: "/images/blog-default.svg"
categories: ["n8n", "Social Media", "AI"]
author: "AI Unlocked Team"
tags: ["n8n", "social media monitoring", "sentiment analysis", "brand monitoring", "AI", "คอร์ส n8n"]
draft: false
---

# n8n Social Media Monitoring: ติดตาม Brand Mentions และ Sentiment Analysis อัตโนมัติ

การติดตามว่าคนพูดถึง brand, สินค้า หรือบริการของคุณบน Social Media อย่างไรเป็นสิ่งสำคัญ แต่การทำ manual monitoring ข้าม Facebook, Twitter, Instagram, Reddit และแพลตฟอร์มอื่นๆ ใช้เวลามากและมักพลาดข้อมูลสำคัญ

ด้วย **n8n** และ **AI** คุณสามารถสร้างระบบ **Social Media Monitoring** ที่:
- ติดตาม brand mentions อัตโนมัติ
- วิเคราะห์ sentiment (บวก/ลบ/เป็นกลาง)
- แจ้งเตือนเมื่อมี crisis หรือ viral content
- ตอบกลับอัตโนมัติหรือ route ให้ team
- Track competitors
- Generate insights และ reports

บทความนี้จะสอนการสร้าง social listening system ที่ช่วยให้คุณรู้ทุกอย่างที่เกิดขึ้นกับ brand แบบ real-time

## สารบัญ

- [ทำไมต้องทำ Social Media Monitoring?](#why-monitoring)
- [Social Platforms ที่รองรับ](#platforms)
- [เครื่องมือและ APIs](#tools-apis)
- [สถาปัตยกรรมระบบ](#architecture)
- [Workflow 1: Brand Mentions Monitoring](#brand-mentions)
- [Workflow 2: Sentiment Analysis with AI](#sentiment-analysis)
- [Workflow 3: Crisis Detection & Alerting](#crisis-detection)
- [Workflow 4: Competitor Monitoring](#competitor-monitoring)
- [Workflow 5: Auto-response System](#auto-response)
- [Analytics & Reporting](#analytics)
- [Best Practices](#best-practices)
- [กรณีศึกษา: E-commerce Brand](#case-study)
- [FAQ](#faq)
- [สรุป](#conclusion)

## ทำไมต้องทำ Social Media Monitoring? {#why-monitoring}

### ปัญหาของ Manual Monitoring

1. **Time-consuming** - เช็คหลายแพลตฟอร์มใช้เวลาหลายชั่วโมง/วัน
2. **Miss important mentions** - ไม่สามารถดูทุกโพสต์ได้
3. **Slow response** - ตอบช้า พลาดโอกาส หรือ crisis ลุกลาม
4. **No insights** - ไม่มีข้อมูลวิเคราะห์เชิงลึก
5. **Can't track competitors** - ไม่รู้ว่าคู่แข่งทำอะไร

### ประโยชน์ของ Auto Monitoring

✅ **Real-time alerts** - รู้ทันทีเมื่อมีคนพูดถึง
✅ **Sentiment analysis** - เข้าใจ emotion ของลูกค้า
✅ **Crisis prevention** - จับ negative trends ก่อนลุกลาม
✅ **Competitive intelligence** - ติดตามคู่แข่ง
✅ **Data-driven decisions** - insights จากข้อมูลจริง
✅ **Save time** - ประหยัดเวลา 10-20 ชม./สัปดาห์

### Use Cases

**Brand Protection:**
- ติดตาม negative reviews
- จัดการ PR crisis
- Fake news/misinformation

**Customer Service:**
- ตอบคำถามลูกค้าทันที
- Handle complaints
- Provide support

**Marketing:**
- ค้นหา influencers
- Track campaign performance
- Identify trends

**Sales:**
- ค้นหา leads
- Monitor buying signals
- Competitive positioning

## Social Platforms ที่รองรับ {#platforms}

### 1. Twitter (X)

**API:**
- Twitter API v2
- Search tweets, mentions, hashtags
- Real-time streaming

**n8n Node:** ✅ Official

**Free tier:** 1,500 tweets/month (2024)
**Paid:** $100/month (50K tweets)

### 2. Facebook/Instagram

**API:**
- Meta Graph API
- Page mentions, comments
- Instagram mentions (Business accounts)

**n8n Node:** ✅ Official

**Limitations:** ต้องเป็น Business page/account

### 3. Reddit

**API:**
- Reddit API
- Search posts, comments
- Subreddit monitoring

**n8n Node:** ⚠️ Via HTTP

**Free tier:** 100 requests/minute

### 4. YouTube

**API:**
- YouTube Data API
- Search videos, comments
- Channel monitoring

**n8n Node:** ✅ Official

**Free tier:** 10,000 units/day

### 5. TikTok

**API:**
- TikTok Business API
- Limited (mainly for ads)

**n8n Node:** ⚠️ Via HTTP

**Alternative:** Web scraping (ระวังละเมิด ToS)

### 6. LinkedIn

**API:**
- LinkedIn API
- Company page monitoring

**n8n Node:** ⚠️ Limited

**Free tier:** Restricted

### 7. Brand Monitoring Tools

**ใช้ tools ที่รวมหลาย platforms:**

**Brand24:**
- Monitor all platforms
- Sentiment analysis built-in
- API available

**Mention:**
- Similar to Brand24
- Good API

**Meltwater, Brandwatch:**
- Enterprise-level
- Expensive

## เครื่องมือและ APIs {#tools-apis}

### Monitoring APIs

**1. Twitter API v2**
```javascript
// Search recent tweets
GET https://api.twitter.com/2/tweets/search/recent
?query=AIUnlocked OR @AIUnlocked
&max_results=100
```

**2. Reddit API**
```javascript
// Search posts
GET https://oauth.reddit.com/search
?q=AIUnlocked&sort=new&limit=100
```

**3. YouTube Data API**
```javascript
// Search videos
GET https://www.googleapis.com/youtube/v3/search
?part=snippet&q=AIUnlocked&type=video
```

### Sentiment Analysis

**OpenAI ChatGPT** ⭐ แนะนำ
- เข้าใจบริบทดี
- Multi-language
- ราคา: ~$0.01 per analysis

**Google Cloud Natural Language API**
- Sentiment score + magnitude
- Entity recognition

**Azure Text Analytics**
- Sentiment analysis
- Key phrase extraction

**Local models:**
- Hugging Face Transformers
- ฟรี แต่ต้อง host เอง

### Data Storage

- **Google Sheets** (ง่าย, visual)
- **Airtable** (flexible database)
- **PostgreSQL** (scalable, analytics)
- **BigQuery** (big data analytics)

## สถาปัตยกรรมระบบ {#architecture}

### Complete Monitoring System

```
Schedule Trigger (every 15 min)
    ↓
Multi-platform Search
    ├─→ Twitter API
    ├─→ Facebook/Instagram API
    ├─→ Reddit API
    └─→ YouTube API
    ↓
Collect & Deduplicate
    ↓
AI Sentiment Analysis
    ↓
Filter & Classify
    ├─→ Crisis (urgent) → Immediate alert
    ├─→ Negative → Route to support team
    ├─→ Positive → Thank you auto-reply
    └─→ Neutral → Archive
    ↓
Save to Database
    ↓
Generate Reports
    ↓
Send Notifications
```

### Data Flow

```
Raw mentions → Clean data → Sentiment → Classification → Action
```

## Workflow 1: Brand Mentions Monitoring {#brand-mentions}

### Setup: Monitor "AI Unlocked" mentions across platforms

**1. Schedule Trigger**

```javascript
// Cron: Every 15 minutes
Schedule Trigger:
  Interval: 15 minutes
```

**2. Twitter Search**

```javascript
// HTTP Request - Twitter API v2
Method: GET
URL: https://api.twitter.com/2/tweets/search/recent

Headers:
  Authorization: Bearer {{ $credentials.twitter.bearerToken }}

Query Parameters:
  query: (AIUnlocked OR "AI Unlocked" OR @AIUnlocked) -is:retweet
  max_results: 100
  tweet.fields: created_at,author_id,public_metrics,entities
  expansions: author_id
  start_time: {{ $json.lastCheckTime }} // ISO 8601 format

// Response:
{
  "data": [
    {
      "id": "1234567890",
      "text": "Just finished the AI course from @AIUnlocked - amazing! 🚀",
      "created_at": "2025-10-23T10:30:00.000Z",
      "author_id": "987654321",
      "public_metrics": {
        "like_count": 15,
        "retweet_count": 3,
        "reply_count": 2
      }
    }
  ],
  "includes": {
    "users": [
      {
        "id": "987654321",
        "username": "john_doe",
        "name": "John Doe"
      }
    ]
  }
}
```

**3. Facebook/Instagram Search**

```javascript
// Facebook Graph API
// Search page mentions

Method: GET
URL: https://graph.facebook.com/v18.0/{{ PAGE_ID }}/tagged

Query Parameters:
  fields: message,from,created_time,permalink_url,reactions.summary(true)
  access_token: {{ $credentials.facebook.token }}
  since: {{ $json.lastCheckTime }}
```

**4. Reddit Search**

```javascript
// Reddit API
Method: GET
URL: https://oauth.reddit.com/search

Headers:
  Authorization: Bearer {{ $credentials.reddit.token }}
  User-Agent: n8n-bot/1.0

Query Parameters:
  q: "AI Unlocked"
  sort: new
  limit: 100
  t: hour // time filter (hour, day, week)
```

**5. Combine All Results**

```javascript
// Merge Node
Mode: Merge By Index
Input 1: Twitter data
Input 2: Facebook data
Input 3: Reddit data

// Or Function Node - Combine all
const allMentions = [
  ...$items('twitter').map(t => ({ ...t.json, source: 'twitter' })),
  ...$items('facebook').map(f => ({ ...f.json, source: 'facebook' })),
  ...$items('reddit').map(r => ({ ...r.json, source: 'reddit' }))
];

return allMentions.map(m => ({ json: m }));
```

**6. Deduplicate**

```javascript
// Code Node - Remove duplicates
const seen = new Set();
const unique = [];

$input.all().forEach(item => {
  // Create unique key (text + author)
  const key = `${item.json.text}-${item.json.author}`;

  if (!seen.has(key)) {
    seen.add(key);
    unique.push(item);
  }
});

return unique;
```

**7. Enrich Data**

```javascript
// Code Node - Standardize format
const standardized = $input.all().map(item => {
  const data = item.json;

  return {
    json: {
      id: data.id,
      source: data.source,
      text: data.text || data.message || data.body,
      author: data.author || data.from?.name || data.author_username,
      author_id: data.author_id || data.from?.id,
      created_at: data.created_at || data.created_time,
      url: data.url || data.permalink_url,
      engagement: {
        likes: data.public_metrics?.like_count || data.reactions?.summary?.total_count || data.score,
        comments: data.public_metrics?.reply_count || data.comments?.count || data.num_comments,
        shares: data.public_metrics?.retweet_count || 0
      },
      raw: data
    }
  };
});

return standardized;
```

## Workflow 2: Sentiment Analysis with AI {#sentiment-analysis}

### AI-powered Sentiment Detection

**1. OpenAI Sentiment Analysis**

```javascript
// OpenAI Chat Node
Model: gpt-4
Temperature: 0.3

System Message:
You are a sentiment analysis expert.
Analyze social media posts and return sentiment classification.

User Message:
Analyze the sentiment of this social media post:

Text: "{{ $json.text }}"
Author: {{ $json.author }}
Platform: {{ $json.source }}

Return JSON format:
{
  "sentiment": "positive" | "negative" | "neutral",
  "confidence": 0.95, // 0-1
  "emotion": "joy" | "anger" | "sadness" | "fear" | "surprise" | "neutral",
  "urgency": "low" | "medium" | "high",
  "topics": ["topic1", "topic2"],
  "reasoning": "brief explanation"
}

Consider:
- Sarcasm and context
- Emojis and tone
- Cultural nuances
- Intent (complaint, praise, question, etc.)

// Example Output:
{
  "sentiment": "positive",
  "confidence": 0.92,
  "emotion": "joy",
  "urgency": "low",
  "topics": ["course quality", "learning experience"],
  "reasoning": "User expresses genuine satisfaction with the AI course using positive words and emojis"
}
```

**2. Add Sentiment to Data**

```javascript
// Code Node - Merge sentiment with original data
const items = $input.all();

const enriched = items.map((item, index) => {
  const sentiment = $items('sentiment')[index].json;

  return {
    json: {
      ...item.json,
      sentiment: sentiment.sentiment,
      sentiment_confidence: sentiment.confidence,
      emotion: sentiment.emotion,
      urgency: sentiment.urgency,
      topics: sentiment.topics,
      sentiment_reasoning: sentiment.reasoning
    }
  };
});

return enriched;
```

**3. Calculate Sentiment Score**

```javascript
// Code Node - Numerical sentiment score
// -1 (very negative) to +1 (very positive)

const calculateScore = (sentiment, confidence) => {
  const baseScores = {
    'positive': 1,
    'neutral': 0,
    'negative': -1
  };

  return baseScores[sentiment] * confidence;
};

items.forEach(item => {
  item.json.sentiment_score = calculateScore(
    item.json.sentiment,
    item.json.sentiment_confidence
  );
});

return items;
```

## Workflow 3: Crisis Detection & Alerting {#crisis-detection}

### Detect and Alert on Negative Trends

**1. Crisis Detection Logic**

```javascript
// Code Node - Detect crisis signals

const detectCrisis = (items) => {
  const now = Date.now();
  const last24h = items.filter(i =>
    (now - new Date(i.json.created_at)) < 24 * 60 * 60 * 1000
  );

  // Crisis indicators:
  const negativePosts = last24h.filter(i => i.json.sentiment === 'negative');
  const negativeRate = negativePosts.length / last24h.length;

  const highEngagement = negativePosts.filter(i =>
    i.json.engagement.likes + i.json.engagement.comments + i.json.engagement.shares > 100
  );

  const urgentPosts = last24h.filter(i => i.json.urgency === 'high');

  // Crisis if:
  // 1. > 50% negative in last 24h
  // 2. OR > 5 high-engagement negative posts
  // 3. OR > 10 high-urgency posts

  const isCrisis =
    negativeRate > 0.5 ||
    highEngagement.length > 5 ||
    urgentPosts.length > 10;

  return {
    isCrisis,
    negativeCount: negativePosts.length,
    negativeRate: (negativeRate * 100).toFixed(1) + '%',
    highEngagementNegative: highEngagement.length,
    urgentCount: urgentPosts.length,
    topNegativePosts: negativePosts
      .sort((a, b) => b.json.engagement.likes - a.json.engagement.likes)
      .slice(0, 5)
  };
};

const crisisData = detectCrisis($input.all());

return { json: crisisData };
```

**2. IF Node - Check if Crisis**

```javascript
// IF Node
{{ $json.isCrisis === true }}
```

**3. Send Crisis Alert**

```javascript
// Slack Node - Critical Alert
Channel: #social-media-crisis
Message:
🚨 SOCIAL MEDIA CRISIS DETECTED! 🚨

Negative Rate: {{ $json.negativeRate }}
Negative Posts (24h): {{ $json.negativeCount }}
High Engagement Negative: {{ $json.highEngagementNegative }}
Urgent Posts: {{ $json.urgentCount }}

Top Negative Posts:
{{ $json.topNegativePosts.map(p => `
• ${p.text.substring(0, 100)}...
  Source: ${p.source}
  Engagement: ${p.engagement.likes} likes
  URL: ${p.url}
`).join('\n') }}

@channel - Please investigate immediately!

[View Full Report] [Take Action]
```

**4. Email to Management**

```javascript
// Gmail Node
To: management@company.com
Subject: 🚨 Social Media Crisis Alert - Immediate Action Required
Body:
[HTML formatted email with details, graphs, action items]
```

**5. Create Incident Ticket**

```javascript
// Jira / Linear / ClickUp Node
Create Issue:
  Title: Social Media Crisis - {{ $now }}
  Description: Crisis details...
  Priority: Critical
  Assignee: Social Media Manager
  Labels: crisis, social-media, urgent
```

## Workflow 4: Competitor Monitoring {#competitor-monitoring}

### Track what competitors are doing

**1. Competitor Keywords**

```javascript
// Set Node - Competitor keywords
const competitors = [
  { name: 'CompetitorA', keywords: ['CompetitorA', '@competitorA', 'hashtag1'] },
  { name: 'CompetitorB', keywords: ['CompetitorB', '@competitorB', 'hashtag2'] },
  { name: 'CompetitorC', keywords: ['CompetitorC', '@competitorC', 'hashtag3'] }
];

return competitors.map(c => ({ json: c }));
```

**2. Search for Each Competitor**

```javascript
// Loop through competitors
// Twitter API search for each

Query: {{ $json.keywords.join(' OR ') }}
```

**3. Analyze Competitor Activity**

```javascript
// Code Node - Analyze what they're doing

const analyzeCompetitor = (posts) => {
  return {
    totalPosts: posts.length,
    avgEngagement: calculateAvg(posts.map(p => p.engagement.total)),
    topPosts: posts.sort((a, b) => b.engagement.total - a.engagement.total).slice(0, 5),
    commonTopics: extractTopics(posts),
    sentiment: {
      positive: posts.filter(p => p.sentiment === 'positive').length,
      negative: posts.filter(p => p.sentiment === 'negative').length,
      neutral: posts.filter(p => p.sentiment === 'neutral').length
    },
    trends: detectTrends(posts)
  };
};
```

**4. Compare with Your Brand**

```javascript
// Code Node - Competitive analysis
const comparison = {
  yourBrand: analyzeCompetitor(yourPosts),
  competitorA: analyzeCompetitor(competitorAPosts),
  competitorB: analyzeCompetitor(competitorBPosts),

  insights: {
    whoIsWinning: determineLeader([yourBrand, competitorA, competitorB]),
    engagementGap: calculateGap(yourBrand, competitors),
    opportunitiesDetected: findOpportunities(competitors)
  }
};
```

**5. Weekly Competitor Report**

```javascript
// Google Sheets Node - Update dashboard
Sheet: Competitor Intelligence
Data:
  Week: {{ $json.week }}
  Your Engagement: {{ $json.yourBrand.avgEngagement }}
  Competitor A: {{ $json.competitorA.avgEngagement }}
  Competitor B: {{ $json.competitorB.avgEngagement }}
  Insights: {{ $json.insights.summary }}
```

## Workflow 5: Auto-response System {#auto-response}

### Automatically respond to mentions

**1. Filter Mentions Needing Response**

```javascript
// IF Node - Response criteria
{{
  $json.sentiment === 'positive' ||
  ($json.sentiment === 'neutral' && $json.text.includes('?')) ||
  ($json.sentiment === 'negative' && $json.urgency === 'high')
}}
```

**2. Generate Appropriate Response**

```javascript
// OpenAI Chat Node
Model: gpt-4
Temperature: 0.7

System Message:
You are the social media manager for AI Unlocked.
Brand voice: Friendly, helpful, professional.

Generate an appropriate response to this social media post:

Original Post:
{{ $json.text }}

Sentiment: {{ $json.sentiment }}
Emotion: {{ $json.emotion }}
Topics: {{ $json.topics.join(', ') }}

Guidelines:
- If positive: Thank them warmly
- If question: Provide helpful answer or direct to support
- If negative: Acknowledge concern, apologize if needed, offer solution
- Keep it concise (< 280 chars for Twitter)
- Use appropriate tone for platform
- Include call-to-action when relevant

Return only the response text, no JSON.

// Example Output:
"Thank you so much for the kind words! 😊 We're thrilled the course helped you. Keep learning and feel free to reach out if you have questions! 🚀"
```

**3. Human Approval (Optional)**

```javascript
// For sensitive/negative posts, get human approval

// Slack Node - Request approval
Channel: #social-media-responses
Message:
📝 Response Draft - Approval Needed

Original Post:
{{ $json.text }}

Draft Response:
{{ $json.draftResponse }}

Sentiment: {{ $json.sentiment }}
Urgency: {{ $json.urgency }}

Approve: /approve {{ $json.id }}
Edit: /edit {{ $json.id }}
Reject: /reject {{ $json.id }}

// Wait for approval
// Webhook receives approval command
```

**4. Post Response**

```javascript
// Switch Node - Route by platform

// Twitter:
Twitter Node - Reply to Tweet
Reply To: {{ $json.tweet_id }}
Text: {{ $json.response }}

// Facebook:
Facebook Node - Comment on Post
Post ID: {{ $json.post_id }}
Message: {{ $json.response }}

// Instagram:
Instagram Node - Comment
Media ID: {{ $json.media_id }}
Text: {{ $json.response }}
```

**5. Log Response**

```javascript
// Google Sheets Node - Log all responses
Sheet: Response Log
Data:
  Date: {{ $now }}
  Platform: {{ $json.source }}
  Original Post: {{ $json.text }}
  Our Response: {{ $json.response }}
  Sentiment: {{ $json.sentiment }}
  Approved By: {{ $json.approver || 'Auto' }}
```

## Analytics & Reporting {#analytics}

### Daily/Weekly Reports

**1. Aggregate Metrics**

```javascript
// Code Node - Calculate daily metrics
const today = $input.all();

const metrics = {
  date: new Date().toISOString().split('T')[0],
  totalMentions: today.length,
  byPlatform: {
    twitter: today.filter(i => i.json.source === 'twitter').length,
    facebook: today.filter(i => i.json.source === 'facebook').length,
    instagram: today.filter(i => i.json.source === 'instagram').length,
    reddit: today.filter(i => i.json.source === 'reddit').length
  },
  sentiment: {
    positive: today.filter(i => i.json.sentiment === 'positive').length,
    neutral: today.filter(i => i.json.sentiment === 'neutral').length,
    negative: today.filter(i => i.json.sentiment === 'negative').length
  },
  avgSentimentScore: calculateAvg(today.map(i => i.json.sentiment_score)),
  totalEngagement: sumEngagement(today),
  topPosts: today.sort((a, b) => b.json.engagement.total - a.json.engagement.total).slice(0, 10),
  topTopics: extractFrequentTopics(today),
  responseRate: calculateResponseRate(today)
};

return { json: metrics };
```

**2. Save to Database**

```javascript
// PostgreSQL Node
INSERT INTO daily_metrics (
  date, total_mentions, positive, neutral, negative,
  avg_sentiment_score, total_engagement, response_rate
) VALUES (
  :date, :totalMentions, :positive, :neutral, :negative,
  :avgSentimentScore, :totalEngagement, :responseRate
)
```

**3. Generate Visual Report**

```javascript
// Google Sheets Node - Update dashboard
Sheet: Analytics Dashboard

// Create charts:
- Line chart: Mentions over time
- Pie chart: Sentiment distribution
- Bar chart: Platform breakdown
- Table: Top posts
```

**4. Weekly Summary Email**

```javascript
// Schedule: Every Monday 9 AM

// Gmail Node
To: team@company.com
Subject: 📊 Social Media Weekly Report - {{ $json.weekStart }} to {{ $json.weekEnd }}

Body:
<!DOCTYPE html>
<html>
<body>
  <h2>Social Media Performance - Week {{ $json.weekNumber }}</h2>

  <h3>Overview</h3>
  <ul>
    <li>Total Mentions: {{ $json.totalMentions }} ({{ $json.changePercent }}% vs last week)</li>
    <li>Avg Sentiment: {{ $json.avgSentiment }} ({{ $json.sentimentTrend }})</li>
    <li>Response Rate: {{ $json.responseRate }}%</li>
  </ul>

  <h3>Sentiment Breakdown</h3>
  <ul>
    <li>Positive: {{ $json.positive }} ({{ $json.positivePercent }}%)</li>
    <li>Neutral: {{ $json.neutral }} ({{ $json.neutralPercent }}%)</li>
    <li>Negative: {{ $json.negative }} ({{ $json.negativePercent }}%)</li>
  </ul>

  <h3>Top Performing Posts</h3>
  {{ $json.topPosts.map(post => `
    <div style="border: 1px solid #ddd; padding: 10px; margin: 10px 0;">
      <p><strong>${post.source}</strong> - ${post.engagement.total} engagements</p>
      <p>${post.text}</p>
      <a href="${post.url}">View Post</a>
    </div>
  `).join('') }}

  <h3>Key Insights</h3>
  <ul>
    {{ $json.insights.map(insight => `<li>${insight}</li>`).join('') }}
  </ul>

  <p><a href="https://dashboard.company.com/social">View Full Dashboard</a></p>
</body>
</html>
```

## Best Practices {#best-practices}

### 1. Keywords & Queries

**Good keyword strategy:**
```javascript
const keywords = [
  // Brand names
  'AIUnlocked',
  'AI Unlocked',
  '@AIUnlocked',

  // Variations & misspellings
  'AI-Unlocked',
  'A.I. Unlocked',

  // Hashtags
  '#AIUnlocked',
  '#AIคอร์ส',

  // Products/Services
  'คอร์ส AI',
  'Vibe Coding',

  // CEO/Founders (if applicable)
  '@FounderName'
];

// Exclude noise:
const excludeKeywords = [
  '-spam',
  '-advertisement',
  '-bot'
];
```

### 2. Rate Limiting

```javascript
// Respect API rate limits

// Twitter: 450 requests / 15 min
// Reddit: 100 requests / min
// Facebook: varies by endpoint

// Solution: Queue + throttle
const REQUESTS_PER_MINUTE = 50;
await sleep(60000 / REQUESTS_PER_MINUTE); // between requests
```

### 3. Data Retention

```javascript
// Keep data organized and clean

// Hot data (last 7 days): Keep all details
// Warm data (7-30 days): Keep aggregated
// Cold data (> 30 days): Archive or delete

// Cleanup workflow:
Schedule: Daily
→ Archive data > 30 days to S3
→ Delete raw data > 90 days
→ Keep only metrics
```

### 4. Alert Fatigue

```javascript
// Avoid too many notifications

// Good alert strategy:
- Crisis: Immediate (Slack + Email + SMS)
- High urgency: Within 1 hour (Slack)
- Medium: Daily digest (Email)
- Low: Weekly report (Email)

// Implement alert throttling:
if (lastAlertSent < 1 hour ago) {
  skip(); // don't spam
}
```

### 5. Privacy & Compliance

```javascript
// Respect user privacy

// Don't store:
- Private messages
- Personal info (unless consent)
- Deleted posts

// Anonymize data:
mentions.forEach(m => {
  m.author = hashUserId(m.author); // anonymize
  delete m.email; // remove PII
});
```

## กรณีศึกษา: E-commerce Brand {#case-study}

### บริษัท: Fashion E-commerce

**ความท้าทาย:**
- ลูกค้าร้องเรียนบน social media → ตอบช้า
- ไม่รู้ว่าคู่แข่งทำอะไร
- พลาด influencer opportunities
- ไม่มีข้อมูล insights

**Solution ด้วย n8n Social Monitoring:**

**Setup:**

```
Platforms Monitored:
- Facebook Page (posts, comments)
- Instagram (mentions, hashtags #brandname)
- Twitter (brand mentions, product names)
- Pantip (forum threads)
- YouTube (video reviews)

Keywords:
- Brand name + variations
- Product names
- Hashtags
- Competitor names

Frequency: Every 15 minutes
```

**Workflows:**

**1. Real-time Monitoring**
```
Every 15 min:
→ Search all platforms
→ AI sentiment analysis
→ Route by sentiment:
  - Negative → Slack alert (support team)
  - Positive → Auto thank-you
  - Question → Draft answer → human approval
→ Save to database
```

**2. Crisis Detection**
```
Daily at 9 AM:
→ Analyze last 24h data
→ Detect negative trends
→ IF crisis:
  → Alert management (email + SMS)
  → Create emergency meeting
  → Prepare PR statement
```

**3. Influencer Discovery**
```
Weekly:
→ Find high-engagement positive posts
→ Identify potential influencers (> 10K followers)
→ Add to prospect list
→ Email marketing team
```

**4. Competitor Intelligence**
```
Weekly:
→ Monitor 3 main competitors
→ Analyze their campaigns
→ Identify what works
→ Generate insights report
```

**ผลลัพธ์ (6 เดือน):**

📊 **Metrics:**
- Monitored: 15,000+ mentions/เดือน
- Response time: 4 hours → 30 minutes (↓ 87.5%)
- Customer satisfaction: 3.2 → 4.5/5 (↑ 40%)

🚨 **Crisis Prevention:**
- จับ 3 potential crises ก่อนลุกลาม
- ประหยัดค่า PR มากกว่า 500,000 บาท

💡 **Insights:**
- ค้นพบ 15 micro-influencers
- ปรับ campaign ตาม feedback → engagement ↑ 60%
- เรียนรู้ competitor strategies

⏱️ **Time Saved:**
- ประหยัดเวลา 20 ชม./สัปดาห์
- Team โฟกัสที่ strategy แทน manual monitoring

💰 **ROI:**
```
ลงทุน:
- n8n: $20/เดือน
- APIs: $50/เดือน
- OpenAI: $100/เดือน
Total: $170/เดือน

ประหยัด/รายได้เพิ่ม:
- เวลา team: ~$2,000/เดือน
- ป้องกัน crisis: ~$10,000/เดือน (เฉลี่ย)
- Influencer partnerships: ~$5,000/เดือน

ROI: ~9,900%
```

## FAQ {#faq}

### Q1: ต้อง monitor 24/7 ไหม?

**A:** ไม่จำเป็น

**แนะนำ:**
- Real-time monitoring: ทุก 15-30 นาที (ช่วงทำงาน)
- Off-hours: ทุก 1-2 ชั่วโมง
- Overnight: ทุก 4-6 ชั่วโมง (หรือปิดก็ได้)

**ยกเว้น:**
- Brand ใหญ่มาก หรือ
- มี crisis ที่กำลังเกิด → monitor ทุก 5-10 นาที

### Q2: Sentiment analysis แม่นยำแค่ไหน?

**A:** ขึ้นกับ AI model

**ChatGPT-4:**
- Accuracy: ~85-90%
- เข้าใจ sarcasm ได้บ้าง
- รองรับภาษาไทยดี

**Tips เพิ่ม accuracy:**
- ให้บริบท (platform, author type)
- ใช้ confidence score threshold
- Human review สำหรับ critical cases

### Q3: ราคาเท่าไหร่?

**Setup พื้นฐาน (SME):**
```
n8n self-hosted: ฟรี + VPS $10
Twitter API: $100/เดือน (50K tweets)
OpenAI API: ~$50/เดือน (sentiment analysis)
Total: ~$160/เดือน
```

**vs SaaS tools:**
- Brand24: $79-399/เดือน
- Mention: $99-999/เดือน
- Brandwatch: $1,000+/เดือน

**n8n ถูกกว่า 5-10 เท่า!**

### Q4: ทำได้หลายภาษาไหม?

**A:** ได้!

**ChatGPT รองรับ:**
- ภาษาไทย ✅
- อังกฤษ ✅
- จีน, ญี่ปุ่น, เกาหลี ✅
- 50+ ภาษาอื่นๆ ✅

**Tip:** ระบุภาษาใน prompt
```
System: "Analyze sentiment of this Thai social media post..."
```

### Q5: Auto-reply ปลอดภัยไหม?

**A:** ปลอดภัย ถ้ามี safeguards

**Best practices:**
- Human approval สำหรับ negative posts
- Limit auto-reply (เช่น แค่ positive/thank you)
- Review AI responses ก่อน deploy
- มี kill switch (หยุด auto-reply ได้ทันที)

**Don't auto-reply:**
- Negative complaints
- Legal issues
- Crisis situations
- Sensitive topics

### Q6: Track competitors ละเมิดกฎหมายไหม?

**A:** ไม่ ถ้าเป็นข้อมูล public

**Legal:**
✅ Monitor public posts
✅ Analyze public data
✅ Competitive intelligence

**Illegal:**
❌ Hack accounts
❌ Scrape private data
❌ Impersonate competitors

**Ethical:**
- ใช้ข้อมูล public เท่านั้น
- Respect ToS ของแต่ละแพลตฟอร์ม
- Don't spam/harass

## สรุป {#conclusion}

Social Media Monitoring ด้วย n8n + AI ช่วยให้คุณรู้ทุกอย่างที่เกิดขึ้นกับ brand แบบ real-time ตอบสนองเร็ว และป้องกัน crisis

### ข้อดีหลัก

✅ **Real-time monitoring** รู้ทันทีเมื่อมีคนพูดถึง
✅ **AI sentiment analysis** เข้าใจ emotions ของลูกค้า
✅ **Crisis prevention** จับปัญหาก่อนลุกลาม
✅ **Auto-response** ตอบลูกค้าเร็วขึ้น
✅ **Competitive intelligence** รู้ว่าคู่แข่งทำอะไร
✅ **Data-driven insights** ตัดสินใจด้วยข้อมูล
✅ **Cost-effective** ถูกกว่า SaaS tools 5-10 เท่า

### เริ่มต้นอย่างไร

1. เลือก platforms ที่สำคัญที่สุด (2-3 platforms)
2. Setup n8n + APIs
3. สร้าง basic monitoring workflow
4. เพิ่ม sentiment analysis
5. Setup alerts
6. Scale up

---

### บทความที่เกี่ยวข้อง

- [n8n Email Marketing Automation](/blog/n8n-email-marketing/)
- [สร้างระบบโพสต์คอนเทนต์อัตโนมัติด้วย n8n](/blog/n8n-ai-content-scheduler/)
- [AI Copywriting สำหรับ Marketing](/blog/ai-copywriting-marketing/)
- [n8n CRM Automation](/blog/n8n-crm-automation/)
- [คอร์ส AI สำหรับผู้เริ่มต้น](/blog/ai-prompt-writing-techniques/)

---

**สนใจเรียนคอร์ส n8n และ AI Automation?** เรียนรู้การสร้างระบบ monitoring และ automation ที่ช่วยปกป้อง brand
👉 [ดูคอร์สออนไลน์](https://aiunlock.co/) | [ติดต่อสอบถาม](/contact/)
