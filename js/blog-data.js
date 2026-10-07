/**
 * ElderCare - Centralized Blog Data Store
 * Contains all 6 comprehensive editorial articles with structured content blocks
 */

const BLOG_POSTS = [
  {
    id: "meaningful-days",
    title: "Creating Meaningful Days for Older Adults",
    category: "Care & Wellness",
    excerpt: "Discover thoughtful ways to craft daily routines, purposeful hobbies, gentle movement, and emotional wellbeing that bring genuine purpose and vitality to senior life.",
    image: "assets/images/blog_1.jpg",
    author: "Priya Sharma",
    authorRole: "Family Wellness Writer",
    authorBio: "Priya writes about senior wellbeing, meaningful activities, and practical ways families can support healthy, joyful aging with dignity and warmth.",
    authorImage: "assets/images/founder_avatar.jpg",
    date: "October 08, 2026",
    readTime: "5 min read",
    content: [
      {
        type: "paragraph",
        text: "As we journey into our senior years, the rhythm of daily life inevitably transforms. The structured demands of formal careers and child-rearing yield to open, quiet hours that can either be a source of tranquil renewal or an unexpected trigger for isolation and restlessness. Cultivating truly meaningful days for older adults is not about filling calendars with busywork; it is about honoring individuality, nurturing genuine agency, and designing moments of authentic connection that reaffirm their enduring worth."
      },
      {
        type: "heading",
        text: "The Power of a Purpose-Driven Morning Routine"
      },
      {
        type: "paragraph",
        text: "A comforting, predictable morning structure anchors the emotional tone of the entire day. Waking up to soft natural light, enjoying a warm cup of herbal tea or filtered coffee, and engaging in gentle joint mobility exercises can invigorate both body and mind. Predictability reduces cognitive fatigue, especially for seniors experiencing early-stage memory changes, providing a secure scaffolding within which spontaneity can safely flourish."
      },
      {
        type: "quote",
        text: "When an older adult wakes up knowing they have a role to play, a conversation to look forward to, and a craft to continue, their physical and mental vitality flourishes."
      },
      {
        type: "heading",
        text: "Nurturing Personal Hobbies and Lifelong Passions"
      },
      {
        type: "paragraph",
        text: "Passions do not retire when we do. Whether it is tending to indoor potted herbs, delicate watercolor painting, knitting warm blankets for newborns, or engaging in strategic games of chess, creative hobbies stimulate neurological pathways and deliver a deep sense of tangible accomplishment. Adapting tools—such as ergonomic paintbrushes or large-print books—ensures that sensory or motor changes never bar someone from pursuing what they love."
      },
      {
        type: "list",
        items: [
          "Sensory gardening with fragrant jasmine, tulsi, and easy-to-manage container planters",
          "Collaborative craft sessions where elders share generational wisdom and storytelling",
          "Gentle daily walking clubs that blend light cardiovascular health with social camaraderie",
          "Music appreciation circles celebrating timeless melodies and classical rhythms"
        ]
      },
      {
        type: "heading",
        text: "Balancing Independence with Gentle Support"
      },
      {
        type: "paragraph",
        text: "One of the greatest gifts caregivers and day centers can provide is preserving a senior's autonomy. Simple choices—such as selecting their midday meal, deciding which activity to participate in, or organizing their reading corner—reinforce personal dignity. When families and care professionals partner to foster this supportive ecosystem, every day becomes a vibrant celebration of lived experience, laughter, and lasting peace."
      }
    ]
  },
  {
    id: "family-connection",
    title: "How Families Can Stay Connected From Anywhere",
    category: "Family Support",
    excerpt: "Practical guidance and digital tools for long-distance families to maintain heart-to-heart closeness, receive regular care updates, and support their aging parents.",
    image: "assets/images/home2_family_experience.jpg",
    author: "Rajesh Mehra",
    authorRole: "Caregiver Support Specialist",
    authorBio: "Rajesh specializes in family counseling and care coordination, helping relatives navigate geographic distance while staying deeply involved in day-to-day senior care.",
    authorImage: "assets/images/testimonial_avatar.jpg",
    date: "October 04, 2026",
    readTime: "6 min read",
    content: [
      {
        type: "paragraph",
        text: "In our interconnected global world, it is increasingly common for adult children to live in different cities or continents from their aging parents. While career opportunities and modern lifestyles may create geographic distance, emotional bonds do not have to weaken. With intentional communication strategies, empathetic listening, and collaborative care partnerships, families can remain deeply woven into the fabric of their loved ones' daily lives."
      },
      {
        type: "heading",
        text: "Establishing Reliable, Low-Stress Touchpoints"
      },
      {
        type: "paragraph",
        text: "Consistency matters far more than duration when it comes to long-distance communication. A brief, daily 10-minute video check-in at a predictable time creates an anticipated ritual of joy. Avoid sporadic, rushed calls that feel transactional; instead, foster casual, open-ended conversations where seniors feel comfortable sharing the small happenings of their day—from the morning bird songs to a funny interaction during lunch."
      },
      {
        type: "quote",
        text: "Distance is measured in miles, but connection is measured in attentiveness. Hearing a familiar voice and receiving regular updates transforms loneliness into peace of mind."
      },
      {
        type: "heading",
        text: "Leveraging Visuals and Digital Care Reports"
      },
      {
        type: "paragraph",
        text: "Photographs bridge generations effortlessly. Sending digital picture frames loaded with real-time snapshots of grandchildren, family celebrations, and weekend outings helps elders feel present in every milestone. Furthermore, modern senior day care centers provide daily digital activity logs, meal summaries, and vital sign overviews so family members can stay informed without feeling anxious."
      },
      {
        type: "list",
        items: [
          "Scheduled weekly multi-generational video calls including grandchildren and pets",
          "Shared digital photo albums updated with daily family moments and video greetings",
          "Transparent coordination with day care facilitators regarding mood and health updates",
          "Surprise care packages containing familiar homemade snacks, handwritten notes, and soft apparel"
        ]
      },
      {
        type: "heading",
        text: "Partnering with Local Care Communities"
      },
      {
        type: "paragraph",
        text: "Knowing that your loved one spends their daylight hours surrounded by attentive professionals, peer camaraderie, and joyful recreation relieves immense caregiver guilt. When families maintain proactive, compassionate dialogue with day care staff, distance becomes manageable, and seniors flourish within a secure circle of double-layered support."
      }
    ]
  },
  {
    id: "senior-activities",
    title: "Why Social Activities Matter for Senior Wellbeing",
    category: "Activities",
    excerpt: "Exploring the transformative cognitive and emotional benefits of group games, art sessions, storytelling circles, and lasting friendships in a day care community.",
    image: "assets/images/about_senior_activity.jpg",
    author: "Kavitha Raman",
    authorRole: "Senior Engagement Lead",
    authorBio: "Kavitha designs sensory, cognitive, and social engagement programs that inspire creativity, self-confidence, and laughter in older adults.",
    authorImage: "assets/images/about_team_kavitha.jpg",
    date: "September 29, 2026",
    readTime: "5 min read",
    content: [
      {
        type: "paragraph",
        text: "Humans are inherently social beings, and our need for belonging, shared laughter, and meaningful conversation never diminishes with age. For many seniors, retirement and the shrinking of social networks can lead to chronic loneliness—a condition clinical research links to elevated cardiovascular risks, cognitive decline, and depressive symptoms. Structured social activities serve as a vibrant antidote, renewing energy and igniting newfound friendships."
      },
      {
        type: "heading",
        text: "Cognitive Agility Through Play and Collaboration"
      },
      {
        type: "paragraph",
        text: "Group games, memory trivia, crossword challenges, and strategic board play are far more than mere entertainment. They actively engage multiple lobes of the brain, promoting neuroplasticity, memory retention, and quick problem-solving. When seniors laugh together over a friendly match of carrom or word association, their bodies release endorphins that naturally reduce stress hormones and soothe physical discomfort."
      },
      {
        type: "quote",
        text: "Shared laughter is the shortest bridge between two souls. Watching seniors build vibrant new friendships at this stage of life is deeply moving."
      },
      {
        type: "heading",
        text: "Creative Expression and Emotional Resonance"
      },
      {
        type: "paragraph",
        text: "Artistic workshops—including pottery sculpting, devotional music choirs, botanical pressing, and culinary demonstrations—give older adults a safe outlet to express emotions, reminisce about fond memories, and explore hidden talents. Group storytelling circles provide an esteemed platform where elders are celebrated as generational guardians of wisdom and cultural lore."
      },
      {
        type: "list",
        items: [
          "Interactive memory circles that stimulate reminiscence through vintage songs and heritage items",
          "Expressive art and pottery workshops tailored for varying levels of fine-motor dexterity",
          "Festive cultural celebrations and inter-generational community storytelling days",
          "Gentle cooperative sports, chair yoga routines, and rhythm-based musical movement"
        ]
      },
      {
        type: "heading",
        text: "A Sense of Belonging and Renewed Purpose"
      },
      {
        type: "paragraph",
        text: "When an elder steps into a welcoming activity center where peers greet them by name and staff listen attentively to their stories, their self-esteem surges. Being part of a supportive community replaces isolation with vibrant anticipation, proving that every stage of life holds abundant potential for joy, discovery, and companionship."
      }
    ]
  },
  {
    id: "healthy-aging",
    title: "Simple Wellness Habits That Support Healthy Aging",
    category: "Senior Health",
    excerpt: "Evidence-informed lifestyle rituals including gentle stretching, intentional hydration, balanced nutrition, and restorative rest to maintain daily vitality.",
    image: "assets/images/service_wellness.jpg",
    author: "Dr. Anitha Venkat",
    authorRole: "Wellness Coordinator & Physiotherapist",
    authorBio: "Dr. Anitha focuses on preventative senior health, gentle mobility rehabilitation, and holistic wellness routines tailored for aging bodies.",
    authorImage: "assets/images/about_team_anitha.jpg",
    date: "September 22, 2026",
    readTime: "6 min read",
    content: [
      {
        type: "paragraph",
        text: "Healthy aging is rarely the result of drastic transformations; rather, it is nurtured through small, consistent, daily lifestyle habits that honor the natural rhythm of the human body. As metabolic rates shift, bone density naturally declines, and sleep patterns evolve, incorporating gentle, restorative routines into everyday life helps seniors preserve their physical resilience, mental clarity, and independent mobility."
      },
      {
        type: "heading",
        text: "Hydration and Mindful Senior Nutrition"
      },
      {
        type: "paragraph",
        text: "With advancing age, the brain's thirst-signaling mechanisms gradually diminish, making mild dehydration a common yet overlooked cause of fatigue, dizziness, and sudden confusion. Keeping fresh water, herbal infusions, and electrolyte-rich coconut water within comfortable reach is essential. Complementing hydration with easily digestible, nutrient-dense meals rich in lean proteins, fiber, antioxidants, and essential omega-3 fatty acids fuels sustained cellular vitality."
      },
      {
        type: "quote",
        text: "Nourishing the aging body with gentle movement, balanced hydration, and peaceful rest creates an enduring foundation for graceful, active longevity."
      },
      {
        type: "heading",
        text: "Gentle Movement and Joint Flexibility"
      },
      {
        type: "paragraph",
        text: "Prolonged sedentary periods stiffen connective tissues and compromise balance. Low-impact physical activity—such as supervised walking, therapeutic seated stretching, and gentle range-of-motion exercises—enhances joint lubrication and strengthens core stabilizing muscles, significantly lowering the risk of accidental slips and falls."
      },
      {
        type: "list",
        items: [
          "Consistent sipping of warm water, fresh herbal teas, and clear broths throughout the day",
          "Balanced, colorful plates featuring steamed greens, wholesome lentils, and fresh fruits",
          "Daily 15-minute gentle stretching sessions to maintain spinal and hamstring mobility",
          "Creating tranquil evening sleep rituals with dim lighting and screen-free relaxation"
        ]
      },
      {
        type: "heading",
        text: "The Restorative Power of Quality Sleep"
      },
      {
        type: "paragraph",
        text: "Adequate, undisturbed sleep allows the brain to clear metabolic waste and consolidates memory. Encouraging seniors to bask in 20 minutes of morning sunlight helps regulate their natural circadian rhythm. By coupling physical nourishment with emotional peace, healthy aging becomes an empowering, fulfilling journey."
      }
    ]
  },
  {
    id: "staying-active",
    title: "The Importance of Staying Active Every Day",
    category: "Care & Wellness",
    excerpt: "How low-impact physical movement, daily walking, assisted stretching, and posture exercises preserve functional independence and reduce fall risks for seniors.",
    image: "assets/images/blog_3.jpg",
    author: "Dr. Anitha Venkat",
    authorRole: "Wellness Coordinator & Physiotherapist",
    authorBio: "Dr. Anitha focuses on preventative senior health, gentle mobility rehabilitation, and holistic wellness routines tailored for aging bodies.",
    authorImage: "assets/images/about_team_anitha.jpg",
    date: "September 15, 2026",
    readTime: "5 min read",
    content: [
      {
        type: "paragraph",
        text: "Movement is medicine at every stage of life, but for seniors, regular daily activity is the single most effective protector of functional independence. Staying active does not require rigorous gym regimens or strenuous physical exertion. Gentle, purposeful, and safe movement integrated seamlessly into each morning and afternoon sustains muscular strength, maintains joint flexibility, and elevates emotional wellbeing."
      },
      {
        type: "heading",
        text: "Preserving Mobility and Reducing Fall Risks"
      },
      {
        type: "paragraph",
        text: "Falls represent one of the primary health concerns for older adults, often leading to prolonged hospitalizations and loss of confidence. Daily balance and posture routines—such as heel-to-toe walking along a safe handrail, gentle calf raises, and seated core engagements—enhance proprioception (the body's awareness in space) and fortify the stabilizer muscles around hips and ankles."
      },
      {
        type: "quote",
        text: "When an older adult maintains the strength to stand tall, walk confidently, and move freely, they preserve the freedom to enjoy life on their own terms."
      },
      {
        type: "heading",
        text: "Cardiovascular Health and Mood Elevation"
      },
      {
        type: "paragraph",
        text: "Moderate walking in lush garden courtyards or rhythmic movement to uplifting music stimulates healthy circulation, regulates blood pressure, and boosts oxygen delivery to the brain. Furthermore, physical movement triggers the release of serotonin and dopamine, naturally alleviating anxiety and dispelling feelings of sluggishness."
      },
      {
        type: "list",
        items: [
          "Supervised garden walking paths with comfortable resting benches and shade",
          "Therapeutic chair yoga focusing on gentle neck, shoulder, and spinal alignment",
          "Low-resistance band exercises that rebuild grip and arm strength for daily tasks",
          "Rhythm-based light aerobics designed to combine cognitive cues with physical steps"
        ]
      },
      {
        type: "heading",
        text: "Building Confidence Through Daily Consistency"
      },
      {
        type: "paragraph",
        text: "The key to sustainable senior fitness is encouragement and enjoyment. When seniors exercise alongside supportive peers and caring physiotherapists, hesitation dissolves into shared motivation. Every step taken today is an investment in tomorrow's independence, dignity, and vibrant freedom of movement."
      }
    ]
  },
  {
    id: "day-at-eldercare",
    title: "A Day at ElderCare: Care, Connection and Joy",
    category: "ElderCare Life",
    excerpt: "An intimate behind-the-scenes walkthrough of morning welcomes, wellness checks, shared culinary delights, creative workshops, and peaceful evening transitions.",
    image: "assets/images/blog_2.jpg",
    author: "Priya Sharma",
    authorRole: "Family Wellness Writer",
    authorBio: "Priya writes about senior wellbeing, meaningful activities, and practical ways families can support healthy, joyful aging with dignity and warmth.",
    authorImage: "assets/images/founder_avatar.jpg",
    date: "September 08, 2026",
    readTime: "7 min read",
    content: [
      {
        type: "paragraph",
        text: "Ever wondered what a typical day looks like inside our ElderCare Senior Day Care & Activity Center? From the moment our doors open each morning to the warm farewells at dusk, every hour is mindfully curated to balance compassionate wellness oversight, intellectual stimulation, nourishing meals, and heartwarming peer camaraderie in a home-like sanctuary."
      },
      {
        type: "heading",
        text: "8:30 AM – 9:30 AM: Warm Welcomes and Vitality Checks"
      },
      {
        type: "paragraph",
        text: "The day begins with bright smiles, personal greetings, and a gentle transition from home. Our dedicated nursing team conducts routine wellness observations—checking blood pressure, hydration status, and morning medication schedules—with gentle warmth. Members then gather in the sunlit lounge over freshly brewed herbal teas and wholesome traditional breakfast bites."
      },
      {
        type: "quote",
        text: "ElderCare isn't just a facility—it is an extended family where every senior is seen, celebrated, and deeply cared for throughout their day."
      },
      {
        type: "heading",
        text: "10:00 AM – 12:30 PM: Gentle Movement, Mind Games and Creative Arts"
      },
      {
        type: "paragraph",
        text: "Late mornings hum with joyful energy. In one wing, our physiotherapists lead rhythmic chair yoga and balance exercises. In the creative studio, members paint vibrant terracotta pots, practice calligraphy, or participate in stimulating group trivia that sparks spirited laughter and nostalgic storytelling."
      },
      {
        type: "list",
        items: [
          "Physiotherapist-guided movement sessions tailored to individual mobility levels",
          "Chef-curated hot, balanced lunches crafted to cater to low-sodium and diabetic preferences",
          "Quiet afternoon relaxation in ergonomic recliner suites with calming soft music",
          "Inter-generational story exchanges, live music performances, and festival celebrations"
        ]
      },
      {
        type: "heading",
        text: "1:00 PM – 5:30 PM: Shared Feasts, Restorative Rest and Evening Joy"
      },
      {
        type: "paragraph",
        text: "After a wholesome, chef-prepared hot lunch shared family-style, members enjoy a peaceful siesta in our climate-controlled quiet suites. The late afternoon brings evening tea, light snacks, gardening circles, and board games. Before departure, our team updates digital daily reports for families, ensuring relatives receive detailed insights into their loved one's joyful day."
      }
    ]
  }
];

// Helper functions for blog queries
function getAllBlogPosts() {
  return BLOG_POSTS;
}

function getBlogPostById(id) {
  if (!id) return null;
  return BLOG_POSTS.find(post => post.id.toLowerCase() === id.toLowerCase()) || null;
}

function getRelatedBlogPosts(currentId, limit = 3) {
  const current = getBlogPostById(currentId);
  if (!current) return BLOG_POSTS.slice(0, limit);
  
  // First match same category, excluding current
  const sameCategory = BLOG_POSTS.filter(p => p.id !== current.id && p.category === current.category);
  const otherPosts = BLOG_POSTS.filter(p => p.id !== current.id && p.category !== current.category);
  
  const combined = [...sameCategory, ...otherPosts];
  return combined.slice(0, limit);
}

function getRecentBlogPosts(limit = 3) {
  return BLOG_POSTS.slice(0, limit);
}

function getBlogCategories() {
  const categories = ["All", ...new Set(BLOG_POSTS.map(p => p.category))];
  return categories;
}
