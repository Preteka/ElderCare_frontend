/**
 * ElderCare - Dashboard Demo Data & State Store
 * Provides persistent, realistic mock data for the family user dashboard.
 * Connects with localStorage (eldercare_auth, eldercare_user, eldercare_dashboard_data).
 */

const EC_DEFAULT_DASHBOARD_DATA = {
  user: {
    fullName: "Preteka",
    role: "Family Member",
    email: "preteka.s@example.com",
    phone: "+91 98765 43210",
    altPhone: "+91 91234 56780",
    relationship: "Daughter",
    address: "42, Orchid Meadows, Avinashi Road",
    city: "Coimbatore",
    state: "Tamil Nadu",
    pincode: "641001",
    preferredContact: "Phone & WhatsApp",
    avatar: "../assets/images/testimonial_avatar.jpg"
  },
  senior: {
    fullName: "Lakshmi Devi",
    preferredName: "Amma",
    age: 72,
    dob: "1954-04-12",
    gender: "Female",
    plan: "Day Care & Companionship",
    serviceId: "day-care",
    status: "Active",
    enrollmentId: "EC-EN-2026-8842",
    startDate: "2026-06-01",
    schedule: "Monday – Friday (8:00 AM – 5:00 PM)",
    monthlyFee: 12000,
    registrationFee: 500,
    photo: "../assets/images/commitment_couple.jpg",
    routine: "Morning herbal tea at 8:30 AM, gentle chair yoga at 10:00 AM, wholesome warm lunch at 1:00 PM followed by 45-minute quiet rest, classical music listening and social tea at 4:00 PM.",
    interests: [
      "Classical & Devotional Music",
      "Gardening & Nature Walks",
      "Storytelling & Memory Circles",
      "Gentle Chair Yoga",
      "Creative Clay & Craft Art"
    ],
    activityPreferences: "Loves morning social circles, devotional singing, and gentle walking in the sensory garden.",
    mobilitySupport: "Independent (Uses walking stick for outdoor garden walks)",
    dietaryPreferences: "Vegetarian, low sodium, mild spices, fresh fruits and warm herbal infusions.",
    emergencyContact: "Preteka (Daughter) • +91 98765 43210",
    careNotes: "Loves conversational storytelling with peers; enjoys chamomile tea during the 4:00 PM refreshment interval."
  },
  today: {
    date: new Date().toISOString(),
    attendance: {
      status: "Present",
      checkIn: "09:05 AM",
      checkOutExpected: "05:00 PM",
      checkedInBy: "Nurse Priya (Care Coordinator)"
    },
    activities: {
      planned: 4,
      completed: 2,
      next: "Creative Activity & Pottery • 03:00 PM"
    },
    wellness: {
      status: "Good",
      mood: "Positive & Cheerful",
      energy: "Good",
      participation: "Active",
      lastCheck: "10:15 AM",
      recordedBy: "Care Team ElderCare"
    },
    timeline: [
      { time: "09:00 AM", title: "Arrival & Welcome", desc: "Warm check-in, morning herbal infusion and vitality observation.", status: "completed" },
      { time: "10:00 AM", title: "Morning Activity & Chair Yoga", desc: "Senior-friendly gentle yoga, balance training and breathing exercises.", status: "completed" },
      { time: "11:30 AM", title: "Wellness Check & Fruit Break", desc: "Hydration check, fresh seasonal fruit bowl, and mood observation.", status: "completed" },
      { time: "01:00 PM", title: "Lunch & Social Conversation", desc: "Warm balanced South Indian lunch followed by 45-minute relaxing interval.", status: "completed" },
      { time: "03:00 PM", title: "Creative Activity & Crafts", desc: "Tactile clay pottery, watercolor painting, and cheerful memory sharing.", status: "upcoming" },
      { time: "05:00 PM", title: "Departure & Family Care Log", desc: "Evening herbal tea, farewell circle, and daily digital update sent to family.", status: "upcoming" }
    ]
  },
  schedule: [
    { day: "Wednesday", date: "Oct 7", title: "Creative Activity & Crafts", time: "03:00 PM", type: "Activity", highlight: "Pottery & Painting" },
    { day: "Thursday", date: "Oct 8", title: "Music & Memory Circle", time: "10:30 AM", type: "Enrichment", highlight: "Classical Carnatic Sing-Along" },
    { day: "Friday", date: "Oct 9", title: "Group Wellness & Garden Walk", time: "11:00 AM", type: "Wellness", highlight: "Sensory Garden Therapy" },
    { day: "Saturday", date: "Oct 10", title: "Weekend Art & Cultural Social", time: "10:00 AM", type: "Social", highlight: "Festive Craft Celebration" },
    { day: "Monday", date: "Oct 12", title: "Gentle Movement & Yoga", time: "10:00 AM", type: "Care", highlight: "Mobility & Joint Flexibility" }
  ],
  attendanceStats: {
    present: 18,
    absent: 2,
    totalDays: 20,
    attendanceRate: "90%",
    weekly: [
      { day: "Mon", date: "Oct 5", status: "Present", time: "08:55 AM – 05:05 PM" },
      { day: "Tue", date: "Oct 6", status: "Present", time: "09:02 AM – 04:58 PM" },
      { day: "Wed", date: "Oct 7", status: "Present", time: "09:05 AM – Active" },
      { day: "Thu", date: "Oct 8", status: "Scheduled", time: "09:00 AM – 05:00 PM" },
      { day: "Fri", date: "Oct 9", status: "Scheduled", time: "09:00 AM – 05:00 PM" }
    ]
  },
  activities: [
    { id: "act_1", name: "Morning Chair Yoga & Pranayama", date: "Today", time: "10:00 AM", category: "Enrichment", status: "Completed", desc: "Gentle stretching and guided deep breathing to encourage joint mobility and calm focus." },
    { id: "act_2", name: "Memory Circle & Storytelling", date: "Today", time: "11:30 AM", category: "Social", status: "Completed", desc: "Seniors shared fond childhood memories of festive traditions in a supportive group." },
    { id: "act_3", name: "Creative Painting & Clay Art", date: "Today", time: "03:00 PM", category: "Creativity", status: "Upcoming", desc: "Sensory tactile pottery and watercolor painting to nurture creative expression." },
    { id: "act_4", name: "Classical Music Sing-Along", date: "Tomorrow", time: "10:30 AM", category: "Enrichment", status: "Upcoming", desc: "Interactive vocal session celebrating cherished traditional and devotional melodies." },
    { id: "act_5", name: "Sensory Nature & Garden Walk", date: "Friday", time: "11:00 AM", category: "Wellness", status: "Upcoming", desc: "Guided outdoor walk among fragrant flowering plants and potted garden greenery." },
    { id: "act_6", name: "Board Games & Word Puzzles", date: "Saturday", time: "02:30 PM", category: "Cognitive", status: "Upcoming", desc: "Gentle cognitive stimulation through chess, carrom, and collaborative word games." }
  ],
  wellnessLogs: [
    { id: "w_1", date: "Oct 7, 2026", time: "10:15 AM", mood: "Positive & Cheerful", energy: "Good", participation: "Active", hydration: "Good (3 glasses herbal water)", notes: "Lakshmi was smiling throughout morning yoga and engaged happily in group conversation.", staff: "Sister Kavitha (Care Lead)" },
    { id: "w_2", date: "Oct 6, 2026", time: "02:30 PM", mood: "Relaxed", energy: "Moderate", participation: "Attentive", hydration: "Adequate", notes: "Enjoyed quiet reading after lunch; rested well during the afternoon relaxation period.", staff: "Sister Anitha" },
    { id: "w_3", date: "Oct 5, 2026", time: "11:00 AM", mood: "Enthusiastic", energy: "High", participation: "Active", hydration: "Good", notes: "Active participant in singing circle; walked comfortably in the morning courtyard.", staff: "Sister Kavitha" },
    { id: "w_4", date: "Oct 2, 2026", time: "03:15 PM", mood: "Content", energy: "Good", participation: "Active", hydration: "Good", notes: "Participated in weekend art craft; expressed joy in sharing painted pottery with family.", staff: "Nurse Priya" }
  ],
  familyUpdates: [
    { id: "up_1", title: "Morning Joy & Music Session", text: "Lakshmi had a wonderful morning participating in the devotional music and gentle chair yoga session with her peers.", time: "Today · 11:45 AM", author: "Care Lead Kavitha", avatar: "../assets/images/about_team_kavitha.jpg" },
    { id: "up_2", title: "Lunch & Social Circle", text: "She enjoyed a warm traditional lunch with her group and participated enthusiastically in the storytelling circle.", time: "Today · 01:30 PM", author: "Care Assistant Anitha", avatar: "../assets/images/about_team_anitha.jpg" },
    { id: "up_3", title: "Weekly Progress Reassurance", text: "Weekly summary: Lakshmi has shown vibrant smiles, healthy appetite, and excellent physical balance all week.", time: "Yesterday · 05:00 PM", author: "Center Director", avatar: "../assets/images/founder_avatar.jpg" }
  ],
  reports: [
    { id: "rep_1", title: "Weekly Activity & Social Report", date: "30 September 2026", period: "Week of Sep 24 – 30", type: "Weekly Summary", status: "Available", fileSize: "1.2 MB" },
    { id: "rep_2", title: "Monthly Wellness & Routine Summary", date: "30 September 2026", period: "Month of September 2026", type: "Wellness Log", status: "Available", fileSize: "2.4 MB" },
    { id: "rep_3", title: "September Attendance Record", date: "30 September 2026", period: "Sep 1 – Sep 30, 2026", type: "Attendance", status: "Available", fileSize: "840 KB" },
    { id: "rep_4", title: "Holistic Care Plan & Preference Review", date: "15 September 2026", period: "Quarterly Assessment", type: "Care Plan", status: "Available", fileSize: "1.8 MB" }
  ],
  billing: {
    currentPlan: "Day Care & Companionship",
    monthlyFee: 12000,
    formattedMonthlyFee: "₹12,000",
    billingCycle: "Monthly (10th of every month)",
    nextPaymentDate: "10 October 2026",
    paymentStatus: "Paid",
    statusBadge: "Active • Auto-renew",
    paymentMethod: "UPI / Auto-Debit (•••• 4321)",
    invoices: [
      { invoiceId: "INV-2026-09", month: "September 2026", amount: "₹12,000", date: "10 Sep 2026", status: "Paid", method: "UPI Auto-Debit" },
      { invoiceId: "INV-2026-08", month: "August 2026", amount: "₹12,000", date: "10 Aug 2026", status: "Paid", method: "UPI Auto-Debit" },
      { invoiceId: "INV-2026-07", month: "July 2026", amount: "₹12,000", date: "10 Jul 2026", status: "Paid", method: "Card (••• 8912)" },
      { invoiceId: "INV-2026-06", month: "June 2026 (Enrollment)", amount: "₹12,500", date: "01 Jun 2026", status: "Paid", method: "Net Banking" }
    ]
  },
  messages: [
    {
      id: "msg_1",
      sender: "ElderCare Care Team",
      role: "Care Coordination",
      avatar: "../assets/images/founder_avatar.jpg",
      subject: "Weekly Activity Report Available",
      preview: "Your loved one's weekly activity report and photo journal are now ready for download in your reports section.",
      time: "11:30 AM",
      unread: true,
      messagesHistory: [
        { sender: "ElderCare Care Team", time: "11:30 AM", text: "Good morning Preteka, Lakshmi had an uplifting morning in our yoga circle. Her weekly activity report has been compiled and is ready for your review." },
        { sender: "Preteka", time: "11:42 AM", text: "Thank you so much! It's wonderful to see her smiling and enjoying the music sessions." }
      ]
    },
    {
      id: "msg_2",
      sender: "Family Support Team",
      role: "Family Relations",
      avatar: "../assets/images/about_team_kavitha.jpg",
      subject: "Schedule Confirmation for October",
      preview: "Please let us know if there are any upcoming travel or schedule adjustments for next week.",
      time: "Yesterday",
      unread: false,
      messagesHistory: [
        { sender: "Family Support Team", time: "Yesterday · 04:15 PM", text: "Hello Preteka, we are preparing the upcoming festival celebration schedules for mid-October. Please let us know if Lakshmi will need any transportation adjustment on Friday." },
        { sender: "Preteka", time: "Yesterday · 05:20 PM", text: "Standard timing works perfectly for us. Thank you for checking!" }
      ]
    },
    {
      id: "msg_3",
      sender: "Dining & Nutrition Desk",
      role: "Center Nutritionist",
      avatar: "../assets/images/about_team_anitha.jpg",
      subject: "October Seasonal Menu Update",
      preview: "New fresh seasonal fruits and herbal infusions have been introduced to our morning refreshments.",
      time: "02 Oct",
      unread: false,
      messagesHistory: [
        { sender: "Dining & Nutrition Desk", time: "02 Oct · 09:00 AM", text: "We have updated our morning refreshment menu to include warm ginger-tulsi infusion and fresh pomegranate bowls." }
      ]
    }
  ]
};

/**
 * Loads current dashboard data from localStorage or initializes with defaults
 */
function getDashboardData() {
  try {
    const raw = localStorage.getItem("eldercare_dashboard_data");
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {}

  // Initialize and persist default demo data
  localStorage.setItem("eldercare_dashboard_data", JSON.stringify(EC_DEFAULT_DASHBOARD_DATA));
  
  // Also seed eldercare_auth if missing for seamless login detection
  const auth = (function() {
    try { return JSON.parse(localStorage.getItem('eldercare_auth') || 'null'); } catch(e){ return null; }
  })();

  if (!auth) {
    const demoAuth = {
      userId: "USR_PRETEKA_01",
      fullName: "Preteka",
      email: "preteka.s@example.com",
      phone: "+91 98765 43210",
      loggedIn: true,
      loggedInAt: new Date().toISOString()
    };
    localStorage.setItem('eldercare_auth', JSON.stringify(demoAuth));
  }

  return EC_DEFAULT_DASHBOARD_DATA;
}

/**
 * Saves modified dashboard data to localStorage
 */
function saveDashboardData(data) {
  localStorage.setItem("eldercare_dashboard_data", JSON.stringify(data));
}
