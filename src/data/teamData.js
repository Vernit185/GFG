export const teamTiers = [
  {
    tier: 1,
    tierName: "Executive Leadership",
    members: [
      {
        id: 1,
        name: "SAISH WALAVALKAR",
        role: "President",
        department: "Information Technology",
        image: "https://res.cloudinary.com/dvkwaq6y/image/upload/v1788426382/Team%20Members/team_saish_walavalkar.jpg",
        avatarBg: "#2563eb",
        initials: "SW",
        linkedin: "https://www.linkedin.com/in/saish-walavalkar-3ab869336/",
        github: "https://github.com/Saishhh02",
        instagram: "https://www.instagram.com/saish_walavalkar/"
      },
      {
        id: 2,
        name: "HARSH LAL",
        role: "President",
        department: "Computer Engineering",
        image: "https://res.cloudinary.com/dvkwaq6y/image/upload/v1788426382/Team%20Members/team_harsh_lal.jpg",
        avatarBg: "#2f9e44",
        initials: "HL",
        linkedin: "https://in.linkedin.com/in/harshh-lal",
        github: "https://github.com/Harshh-Lal",
        instagram: "https://www.instagram.com/harshh_lal?igsi=aGt5ejQ4bTEzdDk4"
      }
    ]
  },
  {
    tier: 2,
    tierName: "Technical Leadership",
    members: [
      {
        id: 3,
        name: "MEET RAMJIYANI",
        role: "Technical Head",
        department: "Computer Engineering",
        image: "https://res.cloudinary.com/dvkwaq6y/image/upload/v1788426384/Team%20Members/team_meet_ramjiyani.jpg",
        avatarBg: "#7c3aed",
        initials: "MR",
        linkedin: "https://www.linkedin.com/in/meet-ramjiyani-80821432b/",
        github: "https://github.com/Meet-Ramjiyani-10",
        instagram: "https://www.instagram.com/meet.patel_10?igsi=dGo5bWRtazFqcGpp"
      },
      {
        id: 4,
        name: "NIRBHAY GAJABI",
        role: "Technical Head",
        department: "AI & ML",
        image: "https://res.cloudinary.com/dvkwaq6y/image/upload/v1788426385/Team%20Members/team_nirbhay_gajabi.jpg",
        avatarBg: "#0891b2",
        initials: "NG",
        linkedin: "https://www.linkedin.com/in/nirbhay-gajabi-30321432b?utm_source=share_via&utm_content=profile&utm_medium=member_android",
        github: "https://github.com/Nirbhay3006",
        instagram: "https://www.instagram.com/nirbhaygajabi?igsi=aXFwbWtmMnBoY2Jy"
      },
      {
        id: 5,
        name: "SHAMAL DIGHOLE",
        role: "EVENT HEAD",
        department: "Computer Engineering",
        image: "https://res.cloudinary.com/dvkwaq6y/image/upload/v1788426385/Team%20Members/team_shamal_dighole.jpg",
        avatarBg: "#059669",
        initials: "SD",
        linkedin: "https://www.linkedin.com/in/shamal-dighole-a2a305377/",
        github: "https://github.com/digholeshamal15",
        instagram: "https://www.instagram.com/shamal_10_15/"
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
        image: "https://res.cloudinary.com/dvkwaq6y/image/upload/v1788426386/Team%20Members/team_ved_dhaporkar.jpg",
        avatarBg: "#db2777",
        initials: "VD",
        linkedin: "https://www.linkedin.com/in/ved-dhapodkar-8837b4293",
        github: "https://github.com/Ved-221",
        instagram: "https://www.instagram.com/ved_dh?igsi=MTA4YW5jcjZlOWg0cg=="
      },
      {
        id: 7,
        name: "ANUSKA MISRA",
        role: "DESIGN HEAD",
        department: "Computer Engineering",
        image: "https://res.cloudinary.com/dvkwaq6y/image/upload/v1788426388/Team%20Members/team_anuska_misra.jpg",
        avatarBg: "#ea580c",
        initials: "AM",
        linkedin: "https://www.linkedin.com/in/anuska-misra-675b85370",
        github: "https://github.com/anuska3006",
        instagram: "https://www.instagram.com/anuska0611?igsi=MWwzb3g0bnR5MDc4Zw=="
      },
      {
        id: 8,
        name: "PARTH BENDRE",
        role: "MARKETING & SPONSORSHIP HEAD",
        department: "AI & DS",
        image: "https://res.cloudinary.com/dvkwaq6y/image/upload/v1788426390/Team%20Members/team_parth_bendre.jpg",
        avatarBg: "#4f46e5",
        initials: "PB",
        linkedin: "https://www.linkedin.com/in/parth-bendre-732abb32a/",
        github: "https://github.com/Parth-404",
        instagram: "https://www.instagram.com/paaarth.bendre/"
      }
    ]
  }
];

export const teamMembers = teamTiers.flatMap((tier) => tier.members);
