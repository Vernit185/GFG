export const teamTiers = [
  {
    tier: 1,
    tierName: "Executive Leadership",
    members: [
      {
        id: 1,
        name: "HARSH LAL",
        role: "President",
        department: "Computer Engineering",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80",
        avatarBg: "#2f9e44",
        initials: "PM",
        linkedin: "https://linkedin.com/in/prithviraj-more",
        github: "https://github.com",
        instagram: "https://instagram.com"
      },
      {
        id: 2,
        name: "SAISH WALAVALKAR",
        role: "President",
        department: "Information Technology",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80",
        avatarBg: "#2563eb",
        initials: "AC",
        linkedin: "https://linkedin.com/in/anuj-chandak",
        github: "https://github.com",
        instagram: "https://instagram.com"
      }
    ]
  },
  {
    tier: 2,
    tierName: "Technical Leadership",
    members: [
      {
        id: 3,
        name: "Meet Ramjiyani",
        role: "Technical Head",
        department: "Computer Engineering",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=80",
        avatarBg: "#7c3aed",
        initials: "KA",
        linkedin: "https://linkedin.com/in/ketan-agrawal",
        github: "https://github.com",
        instagram: "https://instagram.com"
      },
      {
        id: 4,
        name: "NIRBHAY GAJABI",
        role: "Technical Head",
        department: "AI & ML",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&auto=format&fit=crop&q=80",
        avatarBg: "#0891b2",
        initials: "DB",
        linkedin: "https://linkedin.com/in/digvijay-bhadgale",
        github: "https://github.com",
        instagram: "https://instagram.com"
      },
      {
        id: 5,
        name: "SHAMAL DIGHOLE",
        role: "EVENT HEAD",
        department: "Computer Engineering",
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&auto=format&fit=crop&q=80",
        avatarBg: "#059669",
        initials: "PK",
        linkedin: "https://linkedin.com/in/parth-kathane",
        github: "https://github.com",
        instagram: "https://instagram.com"
      }
    ]
  },
  {
    tier: 3,
    tierName: "Domain Heads",
    members: [
      {
        id: 6,
        name: "VED DHAPORKAR",
        role: "SOCIAL MEDIA & PHOTOGRAPHY HEAD",
        department: "Information Technology",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=80",
        avatarBg: "#db2777",
        initials: "AT",
        linkedin: "https://linkedin.com/in/adinaa-thaware",
        github: "https://github.com",
        instagram: "https://instagram.com"
      },
      {
        id: 7,
        name: "ANUSKA MISRA",
        role: "DESIGN HEAD",
        department: "Computer Engineering",
        image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=80",
        avatarBg: "#ea580c",
        initials: "AR",
        linkedin: "https://linkedin.com/in/ananya-rajankar",
        github: "https://github.com",
        instagram: "https://instagram.com"
      },
      {
        id: 8,
        name: "PARTH BENDRE",
        role: "MARKETING & SPONSORSHIP HEAD",
        department: "AI & DS",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80",
        avatarBg: "#4f46e5",
        initials: "SP",
        linkedin: "https://linkedin.com/in/siddhika-pujari",
        github: "https://github.com",
        instagram: "https://instagram.com"
      }
    ]
  }
];

export const teamMembers = teamTiers.flatMap((tier) => tier.members);
