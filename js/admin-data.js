/**
 * ElderCare - Admin Data Store & LocalStorage Synchronization
 * Central repository of mock/demo data for the entire ElderCare Admin Portal.
 * Interoperable with the User Dashboard and Public Website.
 */

// Initial Seed Data
const EC_ADMIN_DEFAULT_DATA = {
  admin: {
    name: "ElderCare Admin",
    role: "Super Administrator",
    email: "admin@eldercare.org",
    phone: "+91 94432 12345",
    avatar: "../assets/images/founder_avatar.jpg",
    department: "Operations & Senior Care Management",
    lastLogin: "Today at 08:30 AM"
  },
  stats: {
    totalSeniors: 128,
    seniorsTrend: "+8 this month",
    todayAttendance: 94,
    attendanceTrend: "92% attendance rate",
    activeServices: 6,
    servicesTrend: "All services operational",
    pendingEnrollments: 12,
    enrollmentsTrend: "4 submitted today",
    wellnessReports: 18,
    wellnessTrend: "100% checks completed",
    pendingPayments: 5,
    paymentsTrend: "₹45,000 pending"
  },
  weeklyAttendance: [
    { day: "Mon", date: "Oct 5", present: 92, absent: 10, total: 102, percent: 90 },
    { day: "Tue", date: "Oct 6", present: 96, absent: 6, total: 102, percent: 94 },
    { day: "Wed", date: "Oct 7", present: 94, absent: 8, total: 102, percent: 92 },
    { day: "Thu", date: "Oct 8", present: 88, absent: 14, total: 102, percent: 86 },
    { day: "Fri", date: "Oct 9", present: 95, absent: 7, total: 102, percent: 93 },
    { day: "Sat", date: "Oct 10", present: 82, absent: 20, total: 102, percent: 80 }
  ],
  seniors: [
    {
      id: "SEN-001",
      name: "Lakshmi Devi",
      preferredName: "Amma",
      age: 72,
      gender: "Female",
      dob: "1954-04-12",
      photo: "../assets/images/commitment_couple.jpg",
      familyId: "USR-001",
      familyName: "Preteka",
      familyEmail: "preteka.s@example.com",
      familyPhone: "+91 98765 43210",
      relationship: "Daughter",
      serviceId: "day-care",
      serviceName: "Day Care & Companionship",
      enrollmentId: "EC-00124",
      status: "Active",
      schedule: "Mon – Sat (8:00 AM – 5:00 PM)",
      attendanceToday: "Present",
      checkInTime: "09:05 AM",
      checkOutTime: "—",
      interests: "Classical Music, Gardening, Gentle Yoga, Story Circles",
      dietary: "Vegetarian, Low Sodium, Mild Spices, Fresh Fruits",
      mobility: "Independent (Walking stick for long garden strolls)",
      emergencyContact: "Preteka (Daughter) • +91 98765 43210",
      careNotes: "Enjoys chamomile tea at 4 PM interval; loves social storytelling with peers."
    },
    {
      id: "SEN-002",
      name: "Ramanathan K.",
      preferredName: "Nana",
      age: 76,
      gender: "Male",
      dob: "1950-08-19",
      photo: "../assets/images/about_values_excellence.jpg",
      familyId: "USR-002",
      familyName: "Anitha Sharma",
      familyEmail: "anitha.sharma@example.com",
      familyPhone: "+91 98123 45678",
      relationship: "Daughter",
      serviceId: "activity-programs",
      serviceName: "Senior Activity Programs",
      enrollmentId: "EC-00123",
      status: "Active",
      schedule: "Mon – Fri (9:00 AM – 5:00 PM)",
      attendanceToday: "Present",
      checkInTime: "08:50 AM",
      checkOutTime: "—",
      interests: "Chess, Carnatic Sing-alongs, Memory Puzzles, Newspaper Reading",
      dietary: "Diabetic friendly, Whole grains, No refined sugar",
      mobility: "Fully Independent",
      emergencyContact: "Anitha Sharma • +91 98123 45678",
      careNotes: "Passionate chess player; loves leading morning crossword quizzes."
    },
    {
      id: "SEN-003",
      name: "Meenakshi Ammal",
      preferredName: "Patti",
      age: 69,
      gender: "Female",
      dob: "1957-11-03",
      photo: "../assets/images/service_activity.jpg",
      familyId: "USR-003",
      familyName: "Ramesh Kumar",
      familyEmail: "ramesh.k@example.com",
      familyPhone: "+91 98456 78901",
      relationship: "Son",
      serviceId: "wellness-checkins",
      serviceName: "Wellness & Daily Check-ins",
      enrollmentId: "EC-00122",
      status: "Active",
      schedule: "Mon – Sat (9:00 AM – 2:00 PM)",
      attendanceToday: "Present",
      checkInTime: "09:15 AM",
      checkOutTime: "—",
      interests: "Crafts, Knitting, Devotional Chanting, Potted Plants",
      dietary: "Pure Vegetarian, Soft food options, Herbal warm teas",
      mobility: "Assisted for stairs, uses walker occasionally",
      emergencyContact: "Ramesh Kumar • +91 98456 78901",
      careNotes: "Hydration check at 11:30 AM; enjoys listening to morning prayers."
    },
    {
      id: "SEN-004",
      name: "Sundaram V.",
      preferredName: "Thatha",
      age: 81,
      gender: "Male",
      dob: "1945-02-14",
      photo: "../assets/images/service_daycare.jpg",
      familyId: "USR-004",
      familyName: "Geetha Sundar",
      familyEmail: "geetha.s@example.com",
      familyPhone: "+91 98765 12345",
      relationship: "Daughter-in-law",
      serviceId: "personalised-care",
      serviceName: "Personalised Senior Care",
      enrollmentId: "EC-00121",
      status: "Active",
      schedule: "Flexible Days (Mon – Sat)",
      attendanceToday: "Late",
      checkInTime: "10:10 AM",
      checkOutTime: "—",
      interests: "Classic Tamil Literature, Walking in Courtyard, Carnatic Flute",
      dietary: "Low spice, warm boiled vegetables, curd rice",
      mobility: "Gentle walking assistance required on incline paths",
      emergencyContact: "Geetha Sundar • +91 98765 12345",
      careNotes: "Requires comfortable 1 PM quiet resting chair; prefers afternoon silence."
    },
    {
      id: "SEN-005",
      name: "Kalyani S.",
      preferredName: "Mami",
      age: 74,
      gender: "Female",
      dob: "1952-06-25",
      photo: "../assets/images/testimonial_avatar.jpg",
      familyId: "USR-005",
      familyName: "Karthik V.",
      familyEmail: "karthik.v@example.com",
      familyPhone: "+91 97890 23456",
      relationship: "Son",
      serviceId: "meals-nutrition",
      serviceName: "Meals & Nutrition Support",
      enrollmentId: "EC-00120",
      status: "Active",
      schedule: "Mon – Sat (11:30 AM – 3:30 PM)",
      attendanceToday: "Present",
      checkInTime: "11:20 AM",
      checkOutTime: "—",
      interests: "Culinary sharing, Social chatting, Light hand stretching",
      dietary: "Dietitian customized, Renal support, Low potassium",
      mobility: "Independent",
      emergencyContact: "Karthik V. • +91 97890 23456",
      careNotes: "Enjoys sharing recipes during lunch social hour."
    },
    {
      id: "SEN-006",
      name: "Balasubramanian R.",
      preferredName: "Appa",
      age: 78,
      gender: "Male",
      dob: "1948-09-10",
      photo: "../assets/images/about_hero_senior.jpg",
      familyId: "USR-006",
      familyName: "Deepa Balan",
      familyEmail: "deepa.b@example.com",
      familyPhone: "+91 98765 87654",
      relationship: "Daughter",
      serviceId: "day-care",
      serviceName: "Day Care & Companionship",
      enrollmentId: "EC-00119",
      status: "Inactive",
      schedule: "Mon – Sat (On Medical Leave)",
      attendanceToday: "Absent",
      checkInTime: "—",
      checkOutTime: "—",
      interests: "Historical fiction, Card games, Classical Violin",
      dietary: "Standard vegetarian",
      mobility: "Independent",
      emergencyContact: "Deepa Balan • +91 98765 87654",
      careNotes: "On temporary medical leave for knee rehab until next Monday."
    },
    {
      id: "SEN-007",
      name: "Sarada Natarajan",
      preferredName: "Sarada",
      age: 70,
      gender: "Female",
      dob: "1956-03-22",
      photo: "../assets/images/service_wellness.jpg",
      familyId: "USR-007",
      familyName: "Suresh Natarajan",
      familyEmail: "suresh.n@example.com",
      familyPhone: "+91 98234 56789",
      relationship: "Son",
      serviceId: "family-support",
      serviceName: "Family Support & Updates",
      enrollmentId: "EC-00118",
      status: "Active",
      schedule: "Mon – Sat (9:00 AM – 5:00 PM)",
      attendanceToday: "Present",
      checkInTime: "08:55 AM",
      checkOutTime: "—",
      interests: "Botanical sketching, Watercolor painting, Classical music",
      dietary: "Vegetarian, high fiber, fresh fruit salads",
      mobility: "Fully Independent",
      emergencyContact: "Suresh Natarajan • +91 98234 56789",
      careNotes: "Loves painting garden flowers during afternoon creative workshop."
    },
    {
      id: "SEN-008",
      name: "Venkataraman G.",
      preferredName: "GV Sir",
      age: 83,
      gender: "Male",
      dob: "1943-12-05",
      photo: "../assets/images/founder_avatar.jpg",
      familyId: "USR-008",
      familyName: "Vijay Venkat",
      familyEmail: "vijay.v@example.com",
      familyPhone: "+91 98111 22334",
      relationship: "Son",
      serviceId: "personalised-care",
      serviceName: "Personalised Senior Care",
      enrollmentId: "EC-00117",
      status: "Active",
      schedule: "Mon – Fri (8:30 AM – 4:30 PM)",
      attendanceToday: "Present",
      checkInTime: "08:45 AM",
      checkOutTime: "—",
      interests: "Mathematics riddles, Sanskrit shlokas, Evening walks",
      dietary: "Soft South Indian, warm soups, light porridge",
      mobility: "Independent with walking cane",
      emergencyContact: "Vijay Venkat • +91 98111 22334",
      careNotes: "Enjoys discussing world history; loves morning herbal tea."
    }
  ],
  users: [
    {
      id: "USR-001",
      name: "Preteka",
      email: "preteka.s@example.com",
      phone: "+91 98765 43210",
      altPhone: "+91 91234 56780",
      relationship: "Daughter",
      seniorId: "SEN-001",
      seniorName: "Lakshmi Devi",
      serviceName: "Day Care & Companionship",
      address: "42, Orchid Meadows, Avinashi Road, Coimbatore",
      status: "Active",
      joinedDate: "15 Jun 2026",
      avatar: "../assets/images/testimonial_avatar.jpg"
    },
    {
      id: "USR-002",
      name: "Anitha Sharma",
      email: "anitha.sharma@example.com",
      phone: "+91 98123 45678",
      altPhone: "+91 98123 00000",
      relationship: "Daughter",
      seniorId: "SEN-002",
      seniorName: "Ramanathan K.",
      serviceName: "Senior Activity Programs",
      address: "18, Green Palms, Race Course, Coimbatore",
      status: "Active",
      joinedDate: "20 Jun 2026",
      avatar: "../assets/images/about_team_anitha.jpg"
    },
    {
      id: "USR-003",
      name: "Ramesh Kumar",
      email: "ramesh.k@example.com",
      phone: "+91 98456 78901",
      altPhone: "+91 98456 11111",
      relationship: "Son",
      seniorId: "SEN-003",
      seniorName: "Meenakshi Ammal",
      serviceName: "Wellness & Daily Check-ins",
      address: "7B, Jasmine Heights, RS Puram, Coimbatore",
      status: "Active",
      joinedDate: "02 Jul 2026",
      avatar: "../assets/images/founder_avatar.jpg"
    },
    {
      id: "USR-004",
      name: "Geetha Sundar",
      email: "geetha.s@example.com",
      phone: "+91 98765 12345",
      altPhone: "+91 98765 22222",
      relationship: "Daughter-in-law",
      seniorId: "SEN-004",
      seniorName: "Sundaram V.",
      serviceName: "Personalised Senior Care",
      address: "104, Maple Woods, Saibaba Colony, Coimbatore",
      status: "Active",
      joinedDate: "18 Jul 2026",
      avatar: "../assets/images/about_team_kavitha.jpg"
    },
    {
      id: "USR-005",
      name: "Karthik V.",
      email: "karthik.v@example.com",
      phone: "+91 97890 23456",
      altPhone: "+91 97890 33333",
      relationship: "Son",
      seniorId: "SEN-005",
      seniorName: "Kalyani S.",
      serviceName: "Meals & Nutrition Support",
      address: "29, Lotus Avenue, Peelamedu, Coimbatore",
      status: "Active",
      joinedDate: "01 Aug 2026",
      avatar: "../assets/images/about_values_excellence.jpg"
    },
    {
      id: "USR-006",
      name: "Deepa Balan",
      email: "deepa.b@example.com",
      phone: "+91 98765 87654",
      altPhone: "+91 98765 44444",
      relationship: "Daughter",
      seniorId: "SEN-006",
      seniorName: "Balasubramanian R.",
      serviceName: "Day Care & Companionship",
      address: "15, Silver Springs, Gandhipuram, Coimbatore",
      status: "Inactive",
      joinedDate: "10 Aug 2026",
      avatar: "../assets/images/service_wellness.jpg"
    },
    {
      id: "USR-007",
      name: "Suresh Natarajan",
      email: "suresh.n@example.com",
      phone: "+91 98234 56789",
      altPhone: "+91 98234 99999",
      relationship: "Son",
      seniorId: "SEN-007",
      seniorName: "Sarada Natarajan",
      serviceName: "Family Support & Updates",
      address: "56, Royal Residency, Ramanathapuram, Coimbatore",
      status: "Active",
      joinedDate: "12 Sep 2026",
      avatar: "../assets/images/commitment_couple.jpg"
    }
  ],
  enrollments: [
    {
      id: "EC-00124",
      familyId: "USR-001",
      familyName: "Preteka",
      familyEmail: "preteka.s@example.com",
      familyPhone: "+91 98765 43210",
      seniorId: "SEN-001",
      seniorName: "Lakshmi Devi",
      seniorAge: 72,
      serviceId: "day-care",
      serviceName: "Day Care & Companionship",
      servicePrice: 12000,
      registrationFee: 500,
      totalAmount: 12500,
      paymentStatus: "Paid",
      paymentMethod: "UPI Auto-Debit",
      paymentDate: "07 Oct 2026",
      status: "Pending Review",
      schedule: "Monday – Saturday (8:00 AM – 5:00 PM)",
      submittedDate: "07 Oct 2026",
      startDate: "15 Oct 2026",
      notes: "Family requested morning pickup coordination and chamomile tea interval.",
      mobility: "Independent (walking stick for outdoor walks)",
      dietary: "Vegetarian, mild spice, low sodium",
      emergencyContact: "Preteka (Daughter) • +91 98765 43210"
    },
    {
      id: "EC-00123",
      familyId: "USR-002",
      familyName: "Anitha Sharma",
      familyEmail: "anitha.sharma@example.com",
      familyPhone: "+91 98123 45678",
      seniorId: "SEN-002",
      seniorName: "Ramanathan K.",
      seniorAge: 76,
      serviceId: "activity-programs",
      serviceName: "Senior Activity Programs",
      servicePrice: 8000,
      registrationFee: 500,
      totalAmount: 8500,
      paymentStatus: "Paid",
      paymentMethod: "Credit Card (•••• 8912)",
      paymentDate: "06 Oct 2026",
      status: "Approved",
      schedule: "Monday – Friday (9:00 AM – 5:00 PM)",
      submittedDate: "06 Oct 2026",
      startDate: "12 Oct 2026",
      notes: "Senior is excited for the morning chess circle and devotional sing-alongs.",
      mobility: "Fully Independent",
      dietary: "Diabetic friendly, whole grains",
      emergencyContact: "Anitha Sharma • +91 98123 45678"
    },
    {
      id: "EC-00122",
      familyId: "USR-003",
      familyName: "Ramesh Kumar",
      familyEmail: "ramesh.k@example.com",
      familyPhone: "+91 98456 78901",
      seniorId: "SEN-003",
      seniorName: "Meenakshi Ammal",
      seniorAge: 69,
      serviceId: "wellness-checkins",
      serviceName: "Wellness & Daily Check-ins",
      servicePrice: 6000,
      registrationFee: 500,
      totalAmount: 6500,
      paymentStatus: "Paid",
      paymentMethod: "Net Banking",
      paymentDate: "05 Oct 2026",
      status: "Active",
      schedule: "Monday – Saturday (9:00 AM – 2:00 PM)",
      submittedDate: "05 Oct 2026",
      startDate: "06 Oct 2026",
      notes: "Daily hydration tracking and resting observation recorded daily.",
      mobility: "Assisted for steps, uses walker occasionally",
      dietary: "Pure vegetarian, soft diet options",
      emergencyContact: "Ramesh Kumar • +91 98456 78901"
    },
    {
      id: "EC-00121",
      familyId: "USR-004",
      familyName: "Geetha Sundar",
      familyEmail: "geetha.s@example.com",
      familyPhone: "+91 98765 12345",
      seniorId: "SEN-004",
      seniorName: "Sundaram V.",
      seniorAge: 81,
      serviceId: "personalised-care",
      serviceName: "Personalised Senior Care",
      servicePrice: 15000,
      registrationFee: 500,
      totalAmount: 15500,
      paymentStatus: "Paid",
      paymentMethod: "UPI Transfer",
      paymentDate: "04 Oct 2026",
      status: "Active",
      schedule: "Flexible Days (Mon – Sat)",
      submittedDate: "04 Oct 2026",
      startDate: "05 Oct 2026",
      notes: "Personalized care assistant assigned: Sister Anitha.",
      mobility: "Gentle walking assistance required on incline paths",
      dietary: "Low spice, warm boiled vegetables, curd rice",
      emergencyContact: "Geetha Sundar • +91 98765 12345"
    },
    {
      id: "EC-00120",
      familyId: "USR-005",
      familyName: "Karthik V.",
      familyEmail: "karthik.v@example.com",
      familyPhone: "+91 97890 23456",
      seniorId: "SEN-005",
      seniorName: "Kalyani S.",
      seniorAge: 74,
      serviceId: "meals-nutrition",
      serviceName: "Meals & Nutrition Support",
      servicePrice: 5000,
      registrationFee: 500,
      totalAmount: 5500,
      paymentStatus: "Pending",
      paymentMethod: "Pending Invoice",
      paymentDate: "—",
      status: "More Information Required",
      schedule: "Monday – Saturday (11:30 AM – 3:30 PM)",
      submittedDate: "03 Oct 2026",
      startDate: "Pending",
      notes: "Awaiting updated renal dietitian prescription from family before final onboarding.",
      mobility: "Independent",
      dietary: "Renal support diet, low potassium",
      emergencyContact: "Karthik V. • +91 97890 23456"
    },
    {
      id: "EC-00119",
      familyId: "USR-006",
      familyName: "Deepa Balan",
      familyEmail: "deepa.b@example.com",
      familyPhone: "+91 98765 87654",
      seniorId: "SEN-006",
      seniorName: "Balasubramanian R.",
      seniorAge: 78,
      serviceId: "day-care",
      serviceName: "Day Care & Companionship",
      servicePrice: 12000,
      registrationFee: 500,
      totalAmount: 12500,
      paymentStatus: "Refunded",
      paymentMethod: "UPI Refund",
      paymentDate: "30 Sep 2026",
      status: "Rejected",
      schedule: "Monday – Saturday",
      submittedDate: "28 Sep 2026",
      startDate: "Cancelled",
      notes: "Family requested cancellation due to senior traveling out of city for 3 months.",
      mobility: "Independent",
      dietary: "Standard vegetarian",
      emergencyContact: "Deepa Balan • +91 98765 87654"
    },
    {
      id: "EC-00118",
      familyId: "USR-007",
      familyName: "Suresh Natarajan",
      familyEmail: "suresh.n@example.com",
      familyPhone: "+91 98234 56789",
      seniorId: "SEN-007",
      seniorName: "Sarada Natarajan",
      seniorAge: 70,
      serviceId: "family-support",
      serviceName: "Family Support & Updates",
      servicePrice: 4000,
      registrationFee: 500,
      totalAmount: 4500,
      paymentStatus: "Paid",
      paymentMethod: "Credit Card",
      paymentDate: "25 Sep 2026",
      status: "Active",
      schedule: "Monday – Saturday (9:00 AM – 5:00 PM)",
      submittedDate: "25 Sep 2026",
      startDate: "26 Sep 2026",
      notes: "Daily photo highlights and activity reports active.",
      mobility: "Fully Independent",
      dietary: "Vegetarian, high fiber",
      emergencyContact: "Suresh Natarajan • +91 98234 56789"
    }
  ],
  services: [
    {
      id: "day-care",
      title: "Day Care & Companionship",
      category: "Care & Comfort",
      eyebrow: "FULL-DAY SUPPORT",
      shortDescription: "Comfortable daytime care with meaningful activities, companionship and attentive support.",
      price: 12000,
      registrationFee: 500,
      duration: "Monthly Enrollment",
      schedule: "Monday – Saturday (8:00 AM – 6:00 PM)",
      activeEnrollments: 42,
      capacity: 50,
      status: "Active",
      image: "../assets/images/service_daycare.jpg"
    },
    {
      id: "activity-programs",
      title: "Senior Activity Programs",
      category: "Enrichment & Joy",
      eyebrow: "ENGAGEMENT & MOVEMENT",
      shortDescription: "Engaging activities designed to encourage movement, creativity, confidence and social connection.",
      price: 8000,
      registrationFee: 500,
      duration: "Monthly Enrollment",
      schedule: "Monday – Friday (9:00 AM – 5:00 PM)",
      activeEnrollments: 34,
      capacity: 40,
      status: "Active",
      image: "../assets/images/service_activity.jpg"
    },
    {
      id: "wellness-checkins",
      title: "Wellness & Daily Check-ins",
      category: "Holistic Wellbeing",
      eyebrow: "HEALTH OBSERVATION",
      shortDescription: "Regular wellbeing observations and supportive daily check-ins to help families stay informed.",
      price: 6000,
      registrationFee: 500,
      duration: "Monthly Enrollment",
      schedule: "Monday – Saturday (8:00 AM – 6:00 PM)",
      activeEnrollments: 28,
      capacity: 35,
      status: "Active",
      image: "../assets/images/service_wellness.jpg"
    },
    {
      id: "meals-nutrition",
      title: "Meals & Nutrition Support",
      category: "Nutrition & Dining",
      eyebrow: "NOURISHMENT & CARE",
      shortDescription: "Balanced meals, refreshments and thoughtful support around daily nutrition.",
      price: 5000,
      registrationFee: 500,
      duration: "Monthly Enrollment",
      schedule: "Monday – Saturday (Breakfast, Lunch & Tea)",
      activeEnrollments: 22,
      capacity: 30,
      status: "Active",
      image: "../assets/images/service_health.jpg"
    },
    {
      id: "family-support",
      title: "Family Support & Updates",
      category: "Family Connection",
      eyebrow: "STAYING CONNECTED",
      shortDescription: "Stay connected with regular updates about your loved one's day, activities and wellbeing.",
      price: 4000,
      registrationFee: 500,
      duration: "Monthly Enrollment",
      schedule: "Monday – Saturday (Real-time updates)",
      activeEnrollments: 30,
      capacity: 45,
      status: "Active",
      image: "../assets/images/home2_family_experience.jpg"
    },
    {
      id: "personalised-care",
      title: "Personalised Senior Care",
      category: "Bespoke Care",
      eyebrow: "TAILORED JUST FOR THEM",
      shortDescription: "Flexible care options designed around individual routines, preferences and family requirements.",
      price: 15000,
      registrationFee: 500,
      duration: "Monthly Enrollment",
      schedule: "Flexible Days (Monday – Saturday)",
      activeEnrollments: 18,
      capacity: 20,
      status: "Active",
      image: "../assets/images/about_senior_activity.jpg"
    }
  ],
  todaySchedule: [
    { time: "09:00 AM", title: "Senior Arrivals & Welcome Circle", desc: "Warm check-in, vitality greeting, and morning herbal infusions in the reception courtyard.", status: "completed", type: "Arrival" },
    { time: "10:00 AM", title: "Morning Movement & Chair Yoga", desc: "Gentle joint mobility exercises, breathing practices, and balance support led by Coach Rajesh.", status: "completed", type: "Movement" },
    { time: "11:30 AM", title: "Wellness Observations & Fruit Refreshment", desc: "Hydration check, recorded mood observations, and seasonal fresh fruit bowl serving.", status: "completed", type: "Wellness" },
    { time: "01:00 PM", title: "Warm Lunch & Social Conversation", desc: "Balanced South Indian meal followed by a 45-minute soothing relaxation interval in the quiet lounge.", status: "completed", type: "Dining" },
    { time: "03:00 PM", title: "Creative Painting & Tactile Pottery", desc: "Engaging watercolor botanical art and clay modeling circle encouraging sensory stimulation.", status: "upcoming", type: "Creative" },
    { time: "04:00 PM", title: "Music & Memory Sing-Along", desc: "Cherished Carnatic and folk melodies, interactive rhythm instruments, and tea interval.", status: "upcoming", type: "Social" },
    { time: "05:00 PM", title: "Departures & Daily Family Care Log", desc: "Farewell circle, evening refreshments, and automated digital summary transmission to families.", status: "upcoming", type: "Departure" }
  ],
  activities: [
    {
      id: "ACT-001",
      name: "Morning Movement & Chair Yoga",
      category: "Movement",
      date: "Today",
      time: "10:00 AM",
      participants: 28,
      maxParticipants: 35,
      status: "Completed",
      facilitator: "Coach Rajesh",
      location: "Main Activity Hall",
      description: "Senior-friendly gentle stretching and guided pranayama deep breathing to nurture flexibility and calm focus."
    },
    {
      id: "ACT-002",
      name: "Memory Games & Crossword Circle",
      category: "Memory",
      date: "Today",
      time: "11:30 AM",
      participants: 18,
      maxParticipants: 20,
      status: "Completed",
      facilitator: "Sister Kavitha",
      location: "Library & Cognitive Lounge",
      description: "Cognitive puzzle games, proverbs recall, and collaborative crossword solving that spark friendly laughter."
    },
    {
      id: "ACT-003",
      name: "Creative Painting & Clay Art",
      category: "Creative",
      date: "Today",
      time: "03:00 PM",
      participants: 22,
      maxParticipants: 25,
      status: "Upcoming",
      facilitator: "Art Lead Meera",
      location: "Garden Craft Studio",
      description: "Tactile clay pottery and botanical watercolor painting celebrating local autumn flowers and foliage."
    },
    {
      id: "ACT-004",
      name: "Music & Memory Sing-Along",
      category: "Social",
      date: "Today",
      time: "04:00 PM",
      participants: 15,
      maxParticipants: 20,
      status: "Upcoming",
      facilitator: "Care Assistant Priya",
      location: "Music Courtyard",
      description: "Interactive devotional and classical songs sing-along with tambura and gentle rhythm percussion."
    },
    {
      id: "ACT-005",
      name: "Sensory Nature & Garden Walk",
      category: "Wellness",
      date: "Tomorrow",
      time: "10:30 AM",
      participants: 20,
      maxParticipants: 25,
      status: "Scheduled",
      facilitator: "Sister Anitha",
      location: "Botanical Sensory Garden",
      description: "Guided morning stroll along herbal garden paths touching aromatic basil, jasmine, and lemongrass."
    },
    {
      id: "ACT-006",
      name: "Board Games & Word Puzzles",
      category: "Entertainment",
      date: "Friday",
      time: "02:30 PM",
      participants: 16,
      maxParticipants: 20,
      status: "Scheduled",
      facilitator: "Care Team ElderCare",
      location: "Recreation Hub",
      description: "Classic carrom, chess, snakes & ladders, and word puzzle tournaments in friendly pairs."
    }
  ],
  wellnessObservations: [
    {
      id: "WEL-001",
      seniorId: "SEN-001",
      seniorName: "Lakshmi Devi",
      date: "07 Oct 2026",
      time: "10:15 AM",
      mood: "Positive & Cheerful",
      energy: "Good",
      participation: "Active",
      hydration: "Good (3 glasses herbal water)",
      generalObservation: "Lakshmi was smiling throughout morning yoga and engaged happily with peers during the tea interval.",
      recordedBy: "Care Lead Kavitha (Care Coordinator)"
    },
    {
      id: "WEL-002",
      seniorId: "SEN-002",
      seniorName: "Ramanathan K.",
      date: "07 Oct 2026",
      time: "11:00 AM",
      mood: "Enthusiastic",
      energy: "High",
      participation: "Active",
      hydration: "Adequate",
      generalObservation: "Won both rounds of morning chess; actively encouraged fellow seniors to try the puzzle game.",
      recordedBy: "Nurse Priya"
    },
    {
      id: "WEL-003",
      seniorId: "SEN-003",
      seniorName: "Meenakshi Ammal",
      date: "07 Oct 2026",
      time: "11:30 AM",
      mood: "Relaxed",
      energy: "Moderate",
      participation: "Attentive",
      hydration: "Good",
      generalObservation: "Walked comfortably in courtyard with light assistance; enjoyed warm ginger-tulsi tea.",
      recordedBy: "Sister Anitha"
    },
    {
      id: "WEL-004",
      seniorId: "SEN-004",
      seniorName: "Sundaram V.",
      date: "07 Oct 2026",
      time: "11:45 AM",
      mood: "Calm & Content",
      energy: "Moderate",
      participation: "Needs Encouragement",
      hydration: "Adequate",
      generalObservation: "Arrived slightly late but settled comfortably; rested peacefully during the quiet observation interval.",
      recordedBy: "Care Lead Kavitha"
    },
    {
      id: "WEL-005",
      seniorId: "SEN-005",
      seniorName: "Kalyani S.",
      date: "07 Oct 2026",
      time: "12:15 PM",
      mood: "Cheerful",
      energy: "Good",
      participation: "Active",
      hydration: "Good",
      generalObservation: "Awaiting final medical record confirmation; enjoyed sharing stories during the pre-lunch gathering.",
      recordedBy: "Dietitian Sunita"
    }
  ],
  familyUpdates: [
    {
      id: "FUP-001",
      seniorName: "Lakshmi Devi",
      familyName: "Preteka",
      update: "Lakshmi participated actively in today's music and chair yoga session with wonderful cheerfulness.",
      time: "11:45 AM",
      status: "Sent & Read",
      author: "Care Lead Kavitha"
    },
    {
      id: "FUP-002",
      seniorName: "Ramanathan K.",
      familyName: "Anitha Sharma",
      update: "Ravi enjoyed the morning chess championship and completed all puzzles with flying colors.",
      time: "11:15 AM",
      status: "Sent & Read",
      author: "Nurse Priya"
    },
    {
      id: "FUP-003",
      seniorName: "Meenakshi Ammal",
      familyName: "Ramesh Kumar",
      update: "Meena joined the creative garden walkthrough and enjoyed fresh herbal infusion.",
      time: "10:30 AM",
      status: "Delivered",
      author: "Sister Anitha"
    },
    {
      id: "FUP-004",
      seniorName: "Sundaram V.",
      familyName: "Geetha Sundar",
      update: "Sundaram settled in comfortably and is enjoying the afternoon reading circle.",
      time: "10:20 AM",
      status: "Delivered",
      author: "Care Lead Kavitha"
    }
  ],
  attentionItems: [
    {
      id: "ATT-001",
      type: "New Enrollment",
      title: "New Enrollment Review Required",
      seniorName: "Lakshmi Devi",
      familyName: "Preteka",
      serviceName: "Day Care & Companionship",
      date: "Submitted today",
      priority: "High",
      enrollmentId: "EC-00124",
      action: "Review"
    },
    {
      id: "ATT-002",
      type: "Info Request",
      title: "Dietary Information Awaiting Verification",
      seniorName: "Kalyani S.",
      familyName: "Karthik V.",
      serviceName: "Meals & Nutrition Support",
      date: "Submitted 3 days ago",
      priority: "Medium",
      enrollmentId: "EC-00120",
      action: "Follow Up"
    },
    {
      id: "ATT-003",
      type: "Payment Issue",
      title: "Invoice Reminder Needed (₹5,500)",
      seniorName: "Kalyani S.",
      familyName: "Karthik V.",
      serviceName: "Meals & Nutrition Support",
      date: "Due today",
      priority: "Medium",
      enrollmentId: "EC-00120",
      action: "Send Reminder"
    },
    {
      id: "ATT-004",
      type: "Schedule Change",
      title: "Medical Leave Notification (1 Week)",
      seniorName: "Balasubramanian R.",
      familyName: "Deepa Balan",
      serviceName: "Day Care & Companionship",
      date: "Notified yesterday",
      priority: "Low",
      enrollmentId: "EC-00119",
      action: "View Details"
    }
  ],
  reports: [
    {
      id: "REP-001",
      title: "Daily Attendance & Check-in Summary",
      type: "Attendance Reports",
      date: "07 Oct 2026",
      recordsCount: "94 Records",
      period: "Today (Oct 07)",
      fileSize: "680 KB",
      status: "Generated",
      summary: "94 Seniors Present (92% attendance rate), 8 Absent, 2 Late."
    },
    {
      id: "REP-002",
      title: "Weekly Activity Participation Report",
      type: "Activity Reports",
      date: "05 Oct 2026",
      recordsCount: "128 Records",
      period: "Week of Sep 28 – Oct 04",
      fileSize: "1.4 MB",
      status: "Generated",
      summary: "High participation in Chair Yoga (88%) and Classical Music Sing-Along (82%)."
    },
    {
      id: "REP-003",
      title: "Monthly Recorded Wellness Observations",
      type: "Wellness Reports",
      date: "30 Sep 2026",
      recordsCount: "340 Logs",
      period: "Month of September 2026",
      fileSize: "2.8 MB",
      status: "Generated",
      summary: "Consolidated mood, energy, and hydration observations across all 6 day-care programs."
    },
    {
      id: "REP-004",
      title: "Quarterly Enrollment & Family Intake Summary",
      type: "Enrollment Reports",
      date: "30 Sep 2026",
      recordsCount: "48 Enrollments",
      period: "Q3 2026 (Jul – Sep)",
      fileSize: "1.9 MB",
      status: "Generated",
      summary: "42 Approved enrollments, 4 Pending review, 2 Withdrawn."
    },
    {
      id: "REP-005",
      title: "Monthly Revenue & Billing Reconciliation",
      type: "Billing Reports",
      date: "30 Sep 2026",
      recordsCount: "128 Invoices",
      period: "Month of September 2026",
      fileSize: "1.1 MB",
      status: "Generated",
      summary: "Total Revenue ₹8,40,000 | Paid ₹7,95,000 | Pending ₹45,000."
    },
    {
      id: "REP-006",
      title: "Comprehensive Center Operations Monthly Summary",
      type: "Monthly Summary",
      date: "30 Sep 2026",
      recordsCount: "Comprehensive",
      period: "September 2026",
      fileSize: "4.2 MB",
      status: "Generated",
      summary: "Full operational digest including staff ratios, meals served, and family satisfaction ratings (99.2%)."
    }
  ],
  billing: {
    totalRevenue: 840000,
    formattedTotalRevenue: "₹8,40,000",
    paidAmount: 795000,
    formattedPaidAmount: "₹7,95,000",
    pendingAmount: 45000,
    formattedPendingAmount: "₹45,000",
    overdueAmount: 0,
    formattedOverdueAmount: "₹0",
    transactions: [
      { id: "TXN-2026-104", enrollmentId: "EC-00124", familyName: "Preteka", seniorName: "Lakshmi Devi", serviceName: "Day Care & Companionship", amount: "₹12,500", date: "07 Oct 2026", status: "Paid", method: "UPI Auto-Debit" },
      { id: "TXN-2026-103", enrollmentId: "EC-00123", familyName: "Anitha Sharma", seniorName: "Ramanathan K.", serviceName: "Senior Activity Programs", amount: "₹8,500", date: "06 Oct 2026", status: "Paid", method: "Credit Card" },
      { id: "TXN-2026-102", enrollmentId: "EC-00122", familyName: "Ramesh Kumar", seniorName: "Meenakshi Ammal", serviceName: "Wellness & Daily Check-ins", amount: "₹6,500", date: "05 Oct 2026", status: "Paid", method: "Net Banking" },
      { id: "TXN-2026-101", enrollmentId: "EC-00121", familyName: "Geetha Sundar", seniorName: "Sundaram V.", serviceName: "Personalised Senior Care", amount: "₹15,500", date: "04 Oct 2026", status: "Paid", method: "UPI Transfer" },
      { id: "TXN-2026-100", enrollmentId: "EC-00120", familyName: "Karthik V.", seniorName: "Kalyani S.", serviceName: "Meals & Nutrition Support", amount: "₹5,500", date: "03 Oct 2026", status: "Pending", method: "Invoice Sent" },
      { id: "TXN-2026-099", enrollmentId: "EC-00118", familyName: "Suresh Natarajan", seniorName: "Sarada Natarajan", serviceName: "Family Support & Updates", amount: "₹4,500", date: "25 Sep 2026", status: "Paid", method: "Credit Card" },
      { id: "TXN-2026-098", enrollmentId: "EC-00117", familyName: "Vijay Venkat", seniorName: "Venkataraman G.", serviceName: "Personalised Senior Care", amount: "₹15,500", date: "20 Sep 2026", status: "Paid", method: "UPI Auto-Debit" }
    ]
  },
  messages: [
    {
      id: "MSG-001",
      familyId: "USR-001",
      familyName: "Preteka",
      seniorName: "Lakshmi Devi",
      preview: "Could you share this week's activity report and photos?",
      time: "11:42 AM",
      unread: true,
      thread: [
        { sender: "Preteka", time: "11:42 AM", text: "Good morning! Could you share this week's activity report and photos of Lakshmi Devi during the craft session?" },
        { sender: "Admin", time: "11:45 AM", text: "Hello Preteka, absolutely! Her weekly photo journal has been compiled and is ready in your family reports section. She made a beautiful painted clay vase today!" }
      ]
    },
    {
      id: "MSG-002",
      familyId: "USR-002",
      familyName: "Anitha Sharma",
      seniorName: "Ramanathan K.",
      preview: "Please confirm tomorrow's morning pick-up schedule.",
      time: "10:15 AM",
      unread: false,
      thread: [
        { sender: "Anitha Sharma", time: "10:15 AM", text: "Hello team, please confirm if the morning transport route will arrive at 8:15 AM as usual tomorrow?" },
        { sender: "Admin", time: "10:20 AM", text: "Hi Anitha, yes! Driver Murugan will arrive at exactly 8:15 AM in front of Green Palms. All schedules are on time." }
      ]
    },
    {
      id: "MSG-003",
      familyId: "USR-003",
      familyName: "Ramesh Kumar",
      seniorName: "Meenakshi Ammal",
      preview: "Thank you for the warm update regarding her walking progress.",
      time: "Yesterday",
      unread: false,
      thread: [
        { sender: "Ramesh Kumar", time: "Yesterday · 04:30 PM", text: "Thank you so much for the detailed observation on Meenakshi's walking progress. It brings our family tremendous peace of mind." },
        { sender: "Admin", time: "Yesterday · 05:00 PM", text: "You are most welcome, Ramesh! She is doing wonderfully and is a joy to have in our daily group." }
      ]
    },
    {
      id: "MSG-004",
      familyId: "USR-004",
      familyName: "Geetha Sundar",
      seniorName: "Sundaram V.",
      preview: "Requesting minor dietary adjustment for Friday afternoon.",
      time: "05 Oct",
      unread: false,
      thread: [
        { sender: "Geetha Sundar", time: "05 Oct · 02:00 PM", text: "Good afternoon. On Friday, please provide warm barley water instead of chamomile tea for Sundaram." },
        { sender: "Admin", time: "05 Oct · 02:30 PM", text: "Noted with thanks, Geetha. We have updated the kitchen schedule and care lead notes for Friday." }
      ]
    }
  ],
  notifications: [
    {
      id: "NOTIF-001",
      type: "enrollment",
      title: "New Enrollment Submitted",
      message: "Preteka submitted enrollment EC-00124 for Lakshmi Devi (Day Care & Companionship).",
      time: "25 mins ago",
      read: false,
      link: "enrollments.html"
    },
    {
      id: "NOTIF-002",
      type: "payment",
      title: "Payment Received",
      message: "Received ₹12,500 from Preteka via UPI Auto-Debit for October.",
      time: "1 hour ago",
      read: false,
      link: "billing.html"
    },
    {
      id: "NOTIF-003",
      type: "wellness",
      title: "Wellness Observation Logged",
      message: "Care Lead Kavitha recorded morning observations for 28 seniors.",
      time: "2 hours ago",
      read: false,
      link: "wellness.html"
    },
    {
      id: "NOTIF-004",
      type: "message",
      title: "New Family Message",
      message: "Preteka sent a query regarding weekly activity reports.",
      time: "3 hours ago",
      read: true,
      link: "messages.html"
    },
    {
      id: "NOTIF-005",
      type: "schedule",
      title: "Schedule Updated",
      message: "Creative Pottery & Painting activity moved to 03:00 PM today.",
      time: "5 hours ago",
      read: true,
      link: "schedules.html"
    }
  ],
  settings: {
    adminName: "ElderCare Admin",
    adminEmail: "admin@eldercare.org",
    adminPhone: "+91 94432 12345",
    adminRole: "Administrator",
    theme: "light",
    direction: "ltr",
    enrollmentAlerts: true,
    paymentAlerts: true,
    familyMessagesAlerts: true,
    wellnessAlerts: true,
    demoMode: true
  }
};

/**
 * Loads admin data from localStorage or initializes with default schema
 */
function getAdminData() {
  try {
    const raw = localStorage.getItem("eldercare_admin_data");
    if (raw) {
      const parsed = JSON.parse(raw);
      return Object.assign({}, EC_ADMIN_DEFAULT_DATA, parsed);
    }
  } catch (e) {
    console.error("Error parsing eldercare_admin_data from localStorage", e);
  }

  // Seed default admin data
  saveAdminData(EC_ADMIN_DEFAULT_DATA);
  return EC_ADMIN_DEFAULT_DATA;
}

/**
 * Saves entire admin data object to localStorage
 */
function saveAdminData(data) {
  try {
    localStorage.setItem("eldercare_admin_data", JSON.stringify(data));
  } catch (e) {
    console.error("Error saving eldercare_admin_data to localStorage", e);
  }
}

/**
 * Resets admin data to default demo state
 */
function resetAdminData() {
  saveAdminData(EC_ADMIN_DEFAULT_DATA);
  return EC_ADMIN_DEFAULT_DATA;
}

/**
 * Formats currency in Indian Rupee standard format
 */
function formatCurrency(amount) {
  if (typeof amount !== "number") {
    amount = parseInt(amount, 10) || 0;
  }
  return "₹" + amount.toLocaleString("en-IN");
}

/**
 * Formats standard date
 */
function formatCurrentDate() {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return new Date().toLocaleDateString('en-GB', options);
}

// Auto-initialize on file load
(function initAdminStorage() {
  getAdminData();
})();
