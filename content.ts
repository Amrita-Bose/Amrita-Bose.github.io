// src/data/content.ts

// Personal information
export interface PersonalInfo {
  name: string;
  title: string;
  advisor: string;
  researchTagline: string;
  emails: {
    primary: string;
    secondary: string;
  };
  urls: {
    googleScholar: string;
    orcid: string;
    dblp: string;
    linkedin: string;
  };
}

// Education timeline entry
export interface EducationEntry {
  degree: string;
  institution: string;
  location: string;
  advisor?: string;
  thesis?: string;
  project?: string;
  cgpa?: string;
  dgpa?: string;
  years: string;
  order: number;
}

// Publication with full BibTeX fields
export interface Publication {
  type: 'inproceedings' | 'article' | 'book' | 'incollection';
  citeKey: string;
  author: string;
  title: string;
  year: number;
  booktitle?: string;
  journal?: string;
  pages?: string;
  publisher?: string;
  address?: string;
  doi: string;
  volume?: string;
  editor?: string;
  series?: string;
}

// Experience categories
export interface ExperienceEntry {
  type: 'industry' | 'jrf' | 'jpo' | 'ta';
  role: string;
  employer: string;
  period: string;
  description?: string;
}

// Teaching assistant role
export interface TeachingEntry {
  course: string;
  department: string;
  semester?: string;
  session?: string;
  description?: string;
}

// Conference/workshop presentation
export interface ConferenceEntry {
  event: string;
  location: string;
  dates: string;
  authors?: string;
  paperTitle?: string;
  isBestPaper?: boolean;
}

// Academic service
export interface ServiceEntry {
  type: string;
  publication: string;
  year: number;
  url: string;
}

// Award/recognition
export interface AwardEntry {
  title: string;
  event: string;
  location: string;
  paper?: string;
  year?: number;
}

// Complete content structure
export interface Content {
  personal: PersonalInfo;
  researchInterests: string[];
  education: EducationEntry[];
  publications: Publication[];
  experience: {
    industry: ExperienceEntry[];
    research: ExperienceEntry[];
    teaching: TeachingEntry[];
  };
  conferences: ConferenceEntry[];
  academicService: ServiceEntry[];
  awards: AwardEntry[];
}

export const personal: PersonalInfo = {
  name: "Amrita Bose",
  title: "PhD Candidate, Department of Computer Science and Engineering, IIT Kharagpur",
  advisor: "Prof. Dipanwita Roy Chowdhury",
  researchTagline: "Doctoral researcher focusing on security vulnerabilities in the healthcare domain, particularly implantable and wearable medical devices.",
  emails: {
    primary: "amrita.iitkgpcse@gmail.com",
    secondary: "amrita.bose25@kgpian.iitkgp.ac.in"
  },
  urls: {
    googleScholar: "https://scholar.google.com/citations?user=-Bqxu1AAAAAJ&hl=en&oi=ao", // TODO: Google Scholar URL not provided in CV, owner must update
    orcid: "https://orcid.org/0009-0001-2089-8271",         // TODO: ORCID URL not provided in CV, owner must update
    dblp: "https://dblp.org/pid/393/7088.html",          // TODO: DBLP URL not provided in CV, owner must update
    linkedin: "https://www.linkedin.com/in/b-amrita"       // TODO: LinkedIn URL not provided in CV, owner must update
  }
};

export const researchInterests: string[] = [
  "Applied Cryptography",
  "Cybersecurity",
  "Cryptanalysis",
  "Machine Learning for Security"
];

export const education: EducationEntry[] = [
  {
    degree: "Ph.D, Computer Science and Engineering",
    institution: "Indian Institute of Technology Kharagpur",
    location: "West Bengal, India",
    advisor: "Prof. Dipanwita Roy Chowdhury",
    years: "2025 – Present",
    order: 1
  },
  {
    degree: "MS, Computer Science and Engineering",
    institution: "Indian Institute of Technology Kharagpur",
    location: "West Bengal, India",
    thesis: "Machine Learning Aided Cryptanalysis of Lightweight Symmetric Ciphers",
    advisor: "Prof. Dipanwita Roy Chowdhury",
    cgpa: "9.55/10.00",
    years: "2023–2025",
    order: 2
  },
  {
    degree: "B. Tech, Information Technology",
    institution: "MAKAUT (formerly known as WBUT)",
    location: "Kolkata, West Bengal",
    project: "IoT Based Health Monitoring System",
    dgpa: "9.00/10.00",
    years: "2016–2020",
    order: 3
  }
];

export const publications: Publication[] = [
  {
    type: "inproceedings",
    citeKey: "bose2024deep",
    author: "Amrita Bose, Debranjan Pal and Dipanwita Roy Chowdhury",
    title: "Deep Learning-Based Differential Distinguishers for Cryptographic Sequences",
    year: 2024,
    booktitle: "Proceedings of Progress in Cryptology - INDOCRYPT 2024, 25th International Conference on Cryptology in India, Chennai, India, December 18 – 21, 2024, Proceedings, Part II",
    pages: "114–133",
    publisher: "Springer, Cham",
    address: "Chennai, India",
    doi: "https://doi.org/10.1007/978-3-031-80311-6_6"
  },
  {
    type: "inproceedings",
    citeKey: "bose2024cryptographic",
    author: "Amrita Bose, Debranjan Pal and Dipanwita Roy Chowdhury",
    title: "Cryptographic Distinguishers Through Deep Learning for Lightweight Block Ciphers",
    year: 2024,
    booktitle: "Proceedings of Applications and Techniques in Information Security, 14th International Conference, ATIS 2024, Tamil Nadu, India, November 22 – 23, 2024",
    pages: "47–63",
    publisher: "Springer, Singapore",
    address: "Tamil Nadu, India",
    doi: "https://doi.org/10.1007/978-981-97-9743-1_4"
  }
];

export const industryExperience: ExperienceEntry[] = [
  {
    type: "industry",
    role: "Associate IT Consultant [Application Developer]",
    employer: "ITC Infotech India Ltd., Kolkata, West Bengal, India",
    period: "January 2021 – October 2021"
  }
];

export const researchExperience: ExperienceEntry[] = [
  {
    type: "jpo",
    role: "Junior Project Officer",
    employer: "Department of Computer Science and Engineering, IIT Kharagpur",
    period: "May 2022 – June 2024"
  },
  {
    type: "jrf",
    role: "Junior Research Fellow",
    employer: "Center of Excellence, Safety Engineering and Analytics (CoE-SEA), IIT Kharagpur",
    period: "October 2021 – April 2022"
  }
];

export const teaching: TeachingEntry[] = [
  {
    course: "Programming and Data Structures Lab",
    department: "Department of Computer Science and Engineering, IIT Kharagpur",
    semester: "Autumn 2026, Spring 2026, Autumn 2025, Autumn 2024, Autumn 2023"
  },
  {
    course: "B. Tech Project Mentor",
    department: "Department of Computer Science and Engineering, IIT Kharagpur",
    session: "2025-26",
    description: "Mentored a 4th year student on the project 'Application of Machine Learning in Cryptanalysis'. Assisted in problem formulation, methodology design and implementation"
  },
  {
    course: "Operating Systems Theory and Lab",
    department: "Department of Computer Science and Engineering, IIT Kharagpur",
    semester: "Spring 2024"
  }
];

export const conferences: ConferenceEntry[] = [
  {
    event: "INAE Technology Conclave 2026",
    location: "Bhubaneswar, Odisha, India",
    dates: "July 11-12, 2026",
    authors: "Amrita Bose, Anisha Mitra, Dipanwita Roy Chowdhury",
    paperTitle: "Mitigating Denial of Service Attacks on Legacy Implantable Cardioverter Defibrillators",
    isBestPaper: true
  },
  {
    event: "INDOCRYPT 2024, 25th International Conference on Cryptology in India",
    location: "Chennai, Tamil Nadu, India",
    dates: "December 18–21, 2024",
    authors: "Amrita Bose, Debranjan Pal, Dipanwita Roy Chowdhury",
    paperTitle: "Deep Learning-Based Differential Distinguishers for Cryptographic Sequences"
  },
  {
    event: "ATIS 2024, 14th International Conference on Applications and Techniques in Information Security",
    location: "Thanjavur, Tamil Nadu, India",
    dates: "November 22–23, 2024",
    authors: "Amrita Bose, Debranjan Pal, Dipanwita Roy Chowdhury",
    paperTitle: "Cryptographic Distinguishers Through Deep Learning for Lightweight Block Ciphers"
  },
  {
    event: "CCSS 2025 (CREST Crypto Summer School)",
    location: "TCG Crest, Kolkata, West Bengal, India",
    dates: "June 2025"
  },
  {
    event: "ATTIC 2025 (Advancements in Trusted Information Computing)",
    location: "Indian Institute of Technology Kharagpur",
    dates: "March 2025"
  }
];

export const academicService: ServiceEntry[] = [
  {
    type: "Journal",
    publication: "IEEE Transactions on Information Forensics and Security",
    year: 2025,
    url: "https://publons.com/wos-op/review/author/3g0sx07y/"
  }
];

export const awards: AwardEntry[] = [
  {
    title: "Selected Best Paper & Poster Presentation",
    event: "INAE Technology Conclave 2026",
    location: "Bhubaneswar, Odisha, India",
    paper: "Mitigating Denial of Service Attacks on Legacy Implantable Cardioverter Defibrillators",
    year: 2026
  }
];

export const content: Content = {
  personal,
  researchInterests,
  education,
  publications,
  experience: {
    industry: industryExperience,
    research: researchExperience,
    teaching: teaching // Shared reference
  },
  conferences,
  academicService,
  awards
};

