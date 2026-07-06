import { Doctor } from './types';

export const MOCK_DOCTORS: Doctor[] = [
  {
    id: 'doc-1',
    firstName: 'Lasantha',
    lastName: 'Senanayake',
    specialization: 'Consultant Psychiatrist',
    languages: ['Sinhala', 'English'],
    gender: 'Male',
    price: 4500,
    profilePicture: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=300&q=80',
    bio: 'With over 15 years of clinical experience, Dr. Lasantha specializes in mood disorders, anxiety, and traumatic stress. He is dedicated to providing an empathetic, non-judgmental space, integrating medical expertise with holistic psychotherapeutic approaches.',
    qualifications: [
      'MD in Psychiatry - University of Colombo',
      'MBBS - University of Peradeniya',
      'Fellow of the Sri Lanka College of Psychiatrists'
    ],
    rating: 4.8,
    reviews: [
      {
        id: 'rev-1-1',
        reviewerNickname: 'Nimali S.',
        rating: 5,
        reviewText: 'Dr. Lasantha is incredibly patient. He listened to my concerns without any judgment and explained my treatment options thoroughly. Highly recommended.',
        relativeDate: '2 days ago'
      },
      {
        id: 'rev-1-2',
        reviewerNickname: 'Ahamed',
        rating: 4,
        reviewText: 'Very helpful session. The system kept me completely anonymous which made it much easier to share.',
        relativeDate: '1 week ago'
      }
    ],
    slots: [
      {
        id: 'slot-1-1',
        timeRange: '09:00 AM - 09:45 AM',
        price: 4500,
        duration: 45,
        extraTimePrice: 1500,
        extraTimeMinutes: 15
      },
      {
        id: 'slot-1-2',
        timeRange: '10:30 AM - 11:15 AM',
        price: 4500,
        duration: 45,
        extraTimePrice: 1500,
        extraTimeMinutes: 15
      },
      {
        id: 'slot-1-3',
        timeRange: '02:00 PM - 02:45 PM',
        price: 4800,
        duration: 45,
        extraTimePrice: 1500,
        extraTimeMinutes: 15
      }
    ]
  },
  {
    id: 'doc-2',
    firstName: 'Nivarthana',
    lastName: 'Balachandran',
    specialization: 'Clinical Psychologist',
    languages: ['Tamil', 'English'],
    gender: 'Female',
    price: 3800,
    profilePicture: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=300&q=80',
    bio: 'Dr. Nivarthana focuses on cognitive behavioral therapy (CBT) and mindfulness-based interventions for adults and adolescents. She provides supportive counseling for grief, relationship difficulties, and stress management.',
    qualifications: [
      'M.Phil. in Clinical Psychology - University of Colombo',
      'B.Sc. (Hons) in Psychology - University of Jaffna',
      'Registered Clinical Psychologist - Sri Lanka Medical Council'
    ],
    rating: 4.9,
    reviews: [
      {
        id: 'rev-2-1',
        reviewerNickname: 'Tharshini K.',
        rating: 5,
        reviewText: 'அற்புதமான சேவை. மிகவும் நிதானமாக என் கருத்துக்களைக் கேட்டு எனக்குப் புரியும்படி வழிகாட்டினார். மிக்க நன்றி!',
        relativeDate: '4 days ago'
      },
      {
        id: 'rev-2-2',
        reviewerNickname: 'Anonymous Thambi',
        rating: 5,
        reviewText: 'The video consultation was seamless. Highly professional and truly privacy-focused.',
        relativeDate: '3 weeks ago'
      }
    ],
    slots: [
      {
        id: 'slot-2-1',
        timeRange: '04:00 PM - 04:45 PM',
        price: 3800,
        duration: 45
      },
      {
        id: 'slot-2-2',
        timeRange: '05:00 PM - 05:45 PM',
        price: 3800,
        duration: 45
      }
    ]
  },
  {
    id: 'doc-3',
    firstName: 'Shenali',
    lastName: 'Perera',
    specialization: 'Clinical Counselor',
    languages: ['Sinhala', 'English'],
    gender: 'Female',
    price: 2500,
    profilePicture: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    bio: 'Shenali is passionate about assisting individuals navigating life transitions, career burnout, and self-esteem challenges. She utilizes a collaborative, person-centered therapeutic approach tailored to each unique journey.',
    qualifications: [
      'Advanced Diploma in Psychological Counseling - SLF',
      'BA (Hons) in Psychology - University of Kelaniya'
    ],
    rating: 4.7,
    reviews: [
      {
        id: 'rev-3-1',
        reviewerNickname: 'Devinda P.',
        rating: 5,
        reviewText: 'හිතට ලොකු සහනයක් ලැබුණා. Shenali මිස් ඉතාම සුහදශීලීව කතා කළා. පෞද්ගලිකත්වය උපරිමයෙන් සුරැකෙන බව සහතිකයි.',
        relativeDate: 'Yesterday'
      },
      {
        id: 'rev-3-2',
        reviewerNickname: 'Anura',
        rating: 4,
        reviewText: 'Decent session. Practical advice was given. The UI is simple to use.',
        relativeDate: '2 weeks ago'
      }
    ],
    slots: [
      {
        id: 'slot-3-1',
        timeRange: '08:30 AM - 09:15 AM',
        price: 2500,
        duration: 45,
        extraTimePrice: 800,
        extraTimeMinutes: 15
      },
      {
        id: 'slot-3-2',
        timeRange: '01:30 PM - 02:15 PM',
        price: 2500,
        duration: 45,
        extraTimePrice: 800,
        extraTimeMinutes: 15
      }
    ]
  },
  {
    id: 'doc-4',
    firstName: 'Mohamed',
    lastName: 'Rizwan',
    specialization: 'Medical Officer (Psychiatry Diploma)',
    languages: ['Sinhala', 'Tamil', 'English'],
    gender: 'Male',
    price: 3000,
    profilePicture: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=300&q=80',
    bio: 'Dr. Rizwan has extensive experience working in state hospitals and handles general psychological wellness, medicine reviews, and stress counseling. He is fluent in Sinhala, Tamil, and English, making care accessible to everyone.',
    qualifications: [
      'Diploma in Psychiatry - Postgraduate Institute of Medicine, Colombo',
      'MBBS - Faculty of Medicine, University of Ruhuna'
    ],
    rating: 4.6,
    reviews: [
      {
        id: 'rev-4-1',
        reviewerNickname: 'Fathima R.',
        rating: 5,
        reviewText: 'Highly knowledgeable doctor who can speak all three languages perfectly. Felt safe and comfortable.',
        relativeDate: '5 days ago'
      },
      {
        id: 'rev-4-2',
        reviewerNickname: 'Suresh L.',
        rating: 4,
        reviewText: 'He explained the mind-body connection clearly. Excellent mental health support.',
        relativeDate: '1 month ago'
      }
    ],
    slots: [
      {
        id: 'slot-4-1',
        timeRange: '11:00 AM - 11:30 AM',
        price: 3000,
        duration: 30,
        extraTimePrice: 1000,
        extraTimeMinutes: 15
      },
      {
        id: 'slot-4-2',
        timeRange: '03:00 PM - 03:30 PM',
        price: 3000,
        duration: 30
      }
    ]
  },
  {
    id: 'doc-5',
    firstName: 'Thusitha',
    lastName: 'Wickramasinghe',
    specialization: 'Psychologist',
    languages: ['Sinhala', 'English'],
    gender: 'Male',
    price: 2800,
    profilePicture: 'https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&w=300&q=80',
    bio: 'Thusitha specializes in personal development, youth counseling, and coping mechanisms for high-pressure corporate environments. He employs non-pharmacological, evidence-based therapy sessions.',
    qualifications: [
      'M.Sc. in Applied Psychology - University of Coventry',
      'BA in Psychology - University of Sri Jayewardenepura'
    ],
    rating: 4.5,
    reviews: [
      {
        id: 'rev-5-1',
        reviewerNickname: 'Nishan',
        rating: 5,
        reviewText: 'Excellent session for work-related anxiety. Practical steps to manage breathing and daily triggers.',
        relativeDate: '3 days ago'
      }
    ],
    slots: [
      {
        id: 'slot-5-1',
        timeRange: '09:00 AM - 09:45 AM',
        price: 2800,
        duration: 45
      }
    ]
  },
  {
    id: 'doc-6',
    firstName: 'Amali',
    lastName: 'Jayasooriya',
    specialization: 'Counselor',
    languages: ['Sinhala', 'English'],
    gender: 'Female',
    price: 1800,
    profilePicture: 'https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?auto=format&fit=crop&w=300&q=80',
    bio: 'Amali is a dedicated counselor focusing on relationship counseling, family dynamics, and general life stress. She is committed to ensuring every conversation is confidential and supportive.',
    qualifications: [
      'Diploma in Counseling & Psychotherapy - National Institute of Social Development',
      'Member of Sri Lanka National Association of Counselors'
    ],
    rating: 4.7,
    reviews: [
      {
        id: 'rev-6-1',
        reviewerNickname: 'Anonymous Podi',
        rating: 5,
        reviewText: 'Heema sith sahanyak labuna. Safe space to discuss internal family issues.',
        relativeDate: '6 days ago'
      },
      {
        id: 'rev-6-2',
        reviewerNickname: 'Dilini',
        rating: 4,
        reviewText: 'Very soft spoken and gave me good thinking exercises.',
        relativeDate: '2 weeks ago'
      }
    ],
    slots: [
      {
        id: 'slot-6-1',
        timeRange: '10:00 AM - 10:45 AM',
        price: 1800,
        duration: 45,
        extraTimePrice: 500,
        extraTimeMinutes: 15
      },
      {
        id: 'slot-6-2',
        timeRange: '02:00 PM - 02:45 PM',
        price: 1800,
        duration: 45,
        extraTimePrice: 500,
        extraTimeMinutes: 15
      }
    ]
  },
  {
    id: 'doc-7',
    firstName: 'Kabilan',
    lastName: 'Selvaraj',
    specialization: 'Counselor',
    languages: ['Tamil', 'English'],
    gender: 'Male',
    price: 2000,
    profilePicture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    bio: 'Kabilan specializes in student mental health, exam anxiety, and self-confidence coaching. He works with simple cognitive restructuring tools and supportive talking therapy.',
    qualifications: [
      'Higher National Diploma in Psychology - ICBT Campus',
      'Professional Member of the Association of Professional Counselors Sri Lanka'
    ],
    rating: 4.4,
    reviews: [
      {
        id: 'rev-7-1',
        reviewerNickname: 'Ravi',
        rating: 4,
        reviewText: 'Helped me overcome exam stress. Simple and approachable counselor.',
        relativeDate: '1 week ago'
      }
    ],
    slots: [
      {
        id: 'slot-7-1',
        timeRange: '03:00 PM - 03:45 PM',
        price: 2000,
        duration: 45
      }
    ]
  },
  {
    id: 'doc-8',
    firstName: 'Devinda',
    lastName: 'De Silva',
    specialization: 'Consultant Psychiatrist',
    languages: ['Sinhala', 'English'],
    gender: 'Male',
    price: 5000,
    profilePicture: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    bio: 'Dr. Devinda De Silva is a senior consultant with 20 years of experience managing psychiatric illnesses, addiction recovery, and sleep disorders. He balances biological interventions with supportive medical psychotherapy.',
    qualifications: [
      'MD in Psychiatry - PGIM, Colombo',
      'MBBS - University of Colombo',
      'International Fellow of the American Psychiatric Association'
    ],
    rating: 4.9,
    reviews: [
      {
        id: 'rev-8-1',
        reviewerNickname: 'Prasanna',
        rating: 5,
        reviewText: 'Highest level of professionalism. Highly structured treatment that solved my insomnia completely.',
        relativeDate: '3 days ago'
      },
      {
        id: 'rev-8-2',
        reviewerNickname: 'Amma G.',
        rating: 5,
        reviewText: 'ඉතාම කරුණාවන්ත වෛද්‍යවරයෙක්. අපේ ප්‍රශ්න වලට හොඳින් සවන් දුන්නා.',
        relativeDate: '2 weeks ago'
      }
    ],
    slots: [
      {
        id: 'slot-8-1',
        timeRange: '05:00 PM - 05:45 PM',
        price: 5000,
        duration: 45,
        extraTimePrice: 2000,
        extraTimeMinutes: 15
      },
      {
        id: 'slot-8-2',
        timeRange: '06:00 PM - 06:45 PM',
        price: 5000,
        duration: 45,
        extraTimePrice: 2000,
        extraTimeMinutes: 15
      }
    ]
  },
  {
    id: 'doc-9',
    firstName: 'Fathima',
    lastName: 'Nabeela',
    specialization: 'Clinical Counselor',
    languages: ['Tamil', 'English'],
    gender: 'Female',
    price: 2200,
    profilePicture: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=300&q=80',
    bio: 'Fathima focuses on women’s mental health, postpartum distress, and trauma-informed supportive therapy. She aims to empower patients with tools to build resilience in difficult family circumstances.',
    qualifications: [
      'Diploma in Child & Family Counseling - SLF',
      'BS in Psychology & Counseling - Aquinas College'
    ],
    rating: 4.6,
    reviews: [
      {
        id: 'rev-9-1',
        reviewerNickname: 'Ayesha',
        rating: 5,
        reviewText: 'A deeply compassionate counselor. I felt safe expressing my feelings without shame.',
        relativeDate: '5 days ago'
      }
    ],
    slots: [
      {
        id: 'slot-9-1',
        timeRange: '10:00 AM - 10:45 AM',
        price: 2200,
        duration: 45
      }
    ]
  },
  {
    id: 'doc-10',
    firstName: 'Priyantha',
    lastName: 'Herath',
    specialization: 'Clinical Psychologist',
    languages: ['Sinhala', 'English'],
    gender: 'Male',
    price: 3600,
    profilePicture: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80',
    bio: 'Dr. Priyantha utilizes cognitive rehabilitation, behavioral therapies, and psychological testing. He is a senior practitioner specializing in chronic stress, depression, and cognitive behavioral therapy.',
    qualifications: [
      'PhD in Clinical Psychology - University of Kelaniya',
      'M.Phil. in Psychology - PGIM, Colombo',
      'Chartered Clinical Psychologist - Sri Lanka Psychological Association'
    ],
    rating: 4.8,
    reviews: [
      {
        id: 'rev-10-1',
        reviewerNickname: 'Manoj',
        rating: 5,
        reviewText: 'He explained my anxiety triggers using easy diagrams. Excellent clinical approach.',
        relativeDate: '4 days ago'
      }
    ],
    slots: [
      {
        id: 'slot-10-1',
        timeRange: '08:00 AM - 08:45 AM',
        price: 3600,
        duration: 45,
        extraTimePrice: 1200,
        extraTimeMinutes: 15
      },
      {
        id: 'slot-10-2',
        timeRange: '01:00 PM - 01:45 PM',
        price: 3600,
        duration: 45,
        extraTimePrice: 1200,
        extraTimeMinutes: 15
      }
    ]
  }
];
