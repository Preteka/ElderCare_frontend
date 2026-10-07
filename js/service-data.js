/**
 * ElderCare - Service Data
 * Central data source for all service-related pages.
 * Used by: services.html, service-details.html, booking.html, schedule.html, review.html, payment.html
 */

const EC_SERVICES = [
  {
    id: "day-care",
    alias: ["daycare", "day-care-companionship"],
    title: "Day Care & Companionship",
    category: "Care & Comfort",
    eyebrow: "FULL-DAY SUPPORT",
    shortDescription: "Comfortable daytime care with meaningful activities, companionship and attentive support.",
    fullDescription: "Our Day Care & Companionship service offers a warm, structured daytime environment where seniors feel truly at home. From morning arrival to afternoon departure, every hour is thoughtfully planned around comfort, gentle engagement and personalised attention. Families can carry on with their daily responsibilities knowing their loved ones are safe, socially engaged and cared for by dedicated professionals.",
    image: "assets/images/service_daycare.jpg",
    price: 12000,
    registrationFee: 500,
    duration: "Monthly Enrollment",
    schedule: "Monday – Saturday",
    availability: "8:00 AM – 6:00 PM",
    included: [
      { title: "Personal Attention", desc: "Dedicated caregivers attending to comfort, daily routines and individual care needs." },
      { title: "Daily Companionship", desc: "Meaningful conversations, peer bonding and social circles that uplift spirits." },
      { title: "Activity Participation", desc: "Gentle morning exercises, arts, crafts, cognitive games and storytelling." },
      { title: "Meal & Nutrition Support", desc: "Fresh, wholesome lunches, morning herbal tea and nutritious afternoon snacks." },
      { title: "Family Communication", desc: "Daily photo highlights, arrival & departure updates and progress summaries." },
      { title: "Daily Routine Support", desc: "Assistance with hydration, rest intervals, mobility and medication reminders." }
    ],
    features: [
      "Daily personalised check-in on arrival",
      "Meaningful companionship & conversation",
      "Structured activity participation",
      "Nutritious meal and refreshment support",
      "Regular family status updates",
      "End-of-day summary report",
      "Safe, supervised environment"
    ],
    benefits: [
      { title: "Peace of Mind for Families", description: "Families can continue their work and daily routines knowing their loved one is in a secure, compassionate and loving environment." },
      { title: "Enriching Social Connections", description: "Regular interaction with welcoming peers reduces feelings of isolation and brings back vibrant smiles." },
      { title: "Comforting Daily Structure", description: "A predictable, soothing routine helps maintain mental clarity, emotional calm and physical energy." },
      { title: "Personalised & Dignified Care", description: "Every senior is treated with deep respect and individual attention tailored to their unique habits and preferences." }
    ]
  },
  {
    id: "activity-programs",
    alias: ["activity", "activities", "senior-activity-programs"],
    title: "Senior Activity Programs",
    category: "Enrichment & Joy",
    eyebrow: "ENGAGEMENT & MOVEMENT",
    shortDescription: "Engaging activities designed to encourage movement, creativity, confidence and social connection.",
    fullDescription: "Our Senior Activity Programs are thoughtfully crafted to spark joy, build confidence and keep minds and bodies gently active. From morning gentle yoga and creative arts to group games and music sessions, every activity is senior-friendly, inclusive and designed to celebrate each participant's unique abilities.",
    image: "assets/images/service_activity.jpg",
    price: 8000,
    registrationFee: 500,
    duration: "Monthly Enrollment",
    schedule: "Monday – Friday",
    availability: "9:00 AM – 5:00 PM",
    included: [
      { title: "Gentle Yoga & Movement", desc: "Light chair yoga, balance training and gentle stretching tailored for seniors." },
      { title: "Creative Arts & Crafts", desc: "Painting, pottery, sketching and tactile craft sessions that inspire creativity." },
      { title: "Cognitive Games & Quizzes", desc: "Memory games, word puzzles, chess and chess clubs that sharpen the mind." },
      { title: "Music & Cultural Circles", desc: "Classical music listening, sing-alongs, bhajans and festive celebrations." },
      { title: "Nature & Gardening", desc: "Sensory garden walks, potted plant nurturing and fresh outdoor air." },
      { title: "Social Story Circles", desc: "Facilitated sharing circles where seniors exchange stories and life wisdom." }
    ],
    features: [
      "Gentle morning yoga & stretching sessions",
      "Creative arts, crafts & painting",
      "Indoor games and group activities",
      "Music, dance and cultural programs",
      "Gardening and nature therapy",
      "Storytelling and memory sharing circles",
      "Celebrations and seasonal events"
    ],
    benefits: [
      { title: "Physical Wellness & Mobility", description: "Gentle movement and activity programs support mobility, balance, flexibility and joint health." },
      { title: "Creative Joy & Self-Expression", description: "Art, music and storytelling activities offer meaningful outlets for creativity and accomplishment." },
      { title: "Deep Social Bonds", description: "Group activities foster genuine, lasting friendships and a profound sense of community belonging." },
      { title: "Cognitive Agility", description: "Mentally engaging challenges help keep minds sharp, curious, stimulated and connected." }
    ]
  },
  {
    id: "wellness-checkins",
    alias: ["wellness", "wellness-check-ins", "health"],
    title: "Wellness & Daily Check-ins",
    category: "Holistic Wellbeing",
    eyebrow: "HEALTH OBSERVATION",
    shortDescription: "Regular wellbeing observations and supportive daily check-ins to help families stay informed.",
    fullDescription: "Our Wellness & Daily Check-in service provides gentle, non-invasive health observations throughout the day. Our caring team monitors energy levels, mood, hydration, and general comfort, providing families with meaningful updates and flagging any changes that need attention.",
    image: "assets/images/service_wellness.jpg",
    price: 6000,
    registrationFee: 500,
    duration: "Monthly Enrollment",
    schedule: "Monday – Saturday",
    availability: "8:00 AM – 6:00 PM",
    included: [
      { title: "Morning Vitals & Mood Check", desc: "Gentle check on pulse, blood pressure, temperature and general comfort." },
      { title: "Hydration & Diet Tracking", desc: "Consistent monitoring of fluid intake, appetite and nourishment throughout the day." },
      { title: "Rest & Sleep Observations", desc: "Noting rest intervals, energy patterns and afternoon relaxation levels." },
      { title: "Medication Reminders", desc: "Friendly, timely reminders to ensure prescribed regimens are maintained." },
      { title: "Daily Digital Wellness Card", desc: "Comprehensive summary shared directly with family members every evening." },
      { title: "Proactive Family Alerts", desc: "Immediate notification if any significant change in mood or vitals is observed." }
    ],
    features: [
      "Morning and afternoon wellness check-ins",
      "Mood and energy level observations",
      "Hydration and nutrition monitoring",
      "Rest and comfort assessments",
      "Daily wellness summary to family",
      "Alert notifications for changes",
      "Coordination with family care team"
    ],
    benefits: [
      { title: "Early Observation", description: "Regular observations help identify small changes before they develop into larger concerns." },
      { title: "Family Reassurance", description: "Families feel deeply reassured knowing dedicated staff are watching over their loved one daily." },
      { title: "Holistic Health Focus", description: "We monitor emotional, physical and social wellbeing in an integrated, caring approach." },
      { title: "Transparent Communication", description: "Any changes or concerns are communicated to families promptly, warmly and clearly." }
    ]
  },
  {
    id: "meals-nutrition",
    alias: ["meals", "nutrition", "meals-nutrition-support"],
    title: "Meals & Nutrition Support",
    category: "Nutrition & Dining",
    eyebrow: "NOURISHMENT & CARE",
    shortDescription: "Balanced meals, refreshments and thoughtful support around daily nutrition.",
    fullDescription: "Good nutrition is central to senior wellbeing. Our Meals & Nutrition Support service provides carefully planned, balanced, and delicious meals throughout the day. Our kitchen team accommodates dietary preferences, cultural needs, and medical requirements, ensuring every meal feels both nourishing and enjoyable.",
    image: "assets/images/service_health.jpg",
    price: 5000,
    registrationFee: 500,
    duration: "Monthly Enrollment",
    schedule: "Monday – Saturday",
    availability: "Breakfast, Lunch & Afternoon Tea",
    included: [
      { title: "Fresh Morning Refreshments", desc: "Herbal teas, seasonal fruits, porridge and warm traditional breakfast options." },
      { title: "Wholesome Warm Lunch", desc: "Dietitian-approved balanced meals with fresh vegetables, lentils and whole grains." },
      { title: "Afternoon Tea & Snacks", desc: "Light, digestible snacks paired with warm herbal infusions and beverages." },
      { title: "Dietary Customization", desc: "Diabetic-friendly, low sodium, renal diet and soft food preparations available." },
      { title: "Assisted Dining Support", desc: "Patient, encouraging dining assistance for seniors needing gentle help." },
      { title: "Hydration Station Access", desc: "Continuous access to warm water, infused waters and tender coconut water." }
    ],
    features: [
      "Balanced, freshly prepared morning tea",
      "Nutritious, wholesome lunch service",
      "Afternoon refreshments and snacks",
      "Dietary preference accommodation",
      "Cultural meal adaptations",
      "Soft diet and special requirement support",
      "Hydration reminders throughout the day"
    ],
    benefits: [
      { title: "Enhanced Vitality & Health", description: "Consistent, balanced nutrition directly supports digestive health, immunity and daily energy." },
      { title: "Joyful Social Dining", description: "Shared mealtimes become uplifting social gatherings that seniors genuinely look forward to." },
      { title: "Tailored to Individual Needs", description: "We accommodate individual medical and cultural dietary needs with meticulous care." },
      { title: "Hassle-Free for Caregivers", description: "Takes the pressure off families to prepare specialised midday meals for senior relatives." }
    ]
  },
  {
    id: "family-support",
    alias: ["family", "family-support-updates"],
    title: "Family Support & Updates",
    category: "Family Connection",
    eyebrow: "STAYING CONNECTED",
    shortDescription: "Stay connected with regular updates about your loved one's day, activities and wellbeing.",
    fullDescription: "We believe families should always feel connected to their loved one's day at ElderCare. Our Family Support & Updates service provides regular, meaningful communication, from daily activity highlights and photo updates to wellness summaries and care team conversations, keeping families informed, reassured and involved.",
    image: "assets/images/home2_family_experience.jpg",
    price: 4000,
    registrationFee: 500,
    duration: "Monthly Enrollment",
    schedule: "Monday – Saturday",
    availability: "Real-time updates throughout the day",
    included: [
      { title: "Arrival & Departure Alerts", desc: "Automated check-in notifications so you always know when your loved one arrives." },
      { title: "Photo & Activity Highlights", desc: "Daily photo moments capturing smiles, crafts and social activities." },
      { title: "Weekly Wellbeing Briefing", desc: "Consolidated weekly insights into participation, mood, appetite and engagement." },
      { title: "Direct Caregiver Messaging", desc: "Dedicated contact channel to speak with your senior's primary care assistant." },
      { title: "Family Consultation Sessions", desc: "Scheduled monthly discussions to align on evolving preferences and care goals." },
      { title: "Emergency Support Protocol", desc: "Rapid, coordinated response team with immediate family notification procedures." }
    ],
    features: [
      "Morning arrival confirmation",
      "Daily activity summary messages",
      "Photo highlights from the day",
      "Afternoon wellbeing update",
      "End-of-day departure notification",
      "Weekly family summary report",
      "Direct line to care team during hours"
    ],
    benefits: [
      { title: "Constant Emotional Connection", description: "Families stay closely involved and emotionally connected regardless of distance or busy schedules." },
      { title: "Reduced Caregiver Anxiety", description: "Frequent, transparent, positive updates eliminate the worry of wondering how your loved one is doing." },
      { title: "True Partnership in Care", description: "We treat families as active collaborators, listening to insights and adjusting care continuously." },
      { title: "Complete Transparency", description: "Detailed logs and photos ensure you have full visibility into daily center life." }
    ]
  },
  {
    id: "personalised-care",
    alias: ["personalised", "personalized", "personalized-care", "custom-care"],
    title: "Personalised Senior Care",
    category: "Bespoke Care",
    eyebrow: "TAILORED JUST FOR THEM",
    shortDescription: "Flexible care options designed around individual routines, preferences and family requirements.",
    fullDescription: "No two seniors are the same. Our Personalised Senior Care service creates an individual care plan built around your loved one's unique personality, daily routine, preferences and specific needs. Whether it's additional support with mobility, extra one-on-one time or specialised routine accommodations, we shape care around the person, not the program.",
    image: "assets/images/about_senior_activity.jpg",
    price: 15000,
    registrationFee: 500,
    duration: "Monthly Enrollment",
    schedule: "Flexible Days (Mon – Sat)",
    availability: "Custom hours tailored to family schedule",
    included: [
      { title: "One-on-One Dedicated Care", desc: "Assigned personal caregiver focused on your loved one's unique pace and comfort." },
      { title: "Customised Daily Routine", desc: "Flexible arrival times, custom nap schedules and personalized daily pacing." },
      { title: "Special Interest Facilitation", desc: "Dedicated guidance for specific hobbies, gardening, chess, music or reading." },
      { title: "Specialized Mobility Support", desc: "Support for walking aids, wheelchair transfers and physio-recommended exercises." },
      { title: "Monthly Care Plan Review", desc: "Comprehensive monthly review with family to adapt to changing senior needs." },
      { title: "Priority Care Coordinator", desc: "Direct point of contact for all scheduling, dietary and medical notes." }
    ],
    features: [
      "Individual care plan creation",
      "Personalised daily routine design",
      "One-on-one dedicated caregiver time",
      "Special interest and hobby support",
      "Mobility assistance and support",
      "Flexible arrival and departure times",
      "Regular care plan reviews and updates"
    ],
    benefits: [
      { title: "True Person-Centered Care", description: "The entire daily schedule and care activities are structured exclusively around your loved one." },
      { title: "Familiarity & Comfort", description: "Maintaining familiar habits and personal routines provides reassuring emotional stability." },
      { title: "Flexible Scheduling", description: "We adapt to your family's dynamic calendar and changing weekly requirements." },
      { title: "Continuous Care Evolution", description: "Care plans evolve smoothly as your loved one's preferences and physical needs change over time." }
    ]
  }
];

/**
 * Find service by ID or alias
 */
function getServiceById(id) {
  if (!id) return EC_SERVICES[0];
  const cleanId = String(id).trim().toLowerCase();
  return EC_SERVICES.find(s =>
    s.id === cleanId ||
    (s.alias && s.alias.includes(cleanId))
  ) || EC_SERVICES[0];
}

/**
 * Format currency in Indian Rupees
 */
function formatCurrency(amount) {
  const val = Number(amount) || 0;
  return "₹" + val.toLocaleString("en-IN");
}
