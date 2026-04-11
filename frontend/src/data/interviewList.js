const googleLogo = `https://img.logo.dev/name/google?token=${import.meta.env.VITE_LOGO_DEV_PUBLISHABLE_KEY}&size=60&format=png&retina=true`
const microsoftLogo = `https://img.logo.dev/name/microsoft?token=${import.meta.env.VITE_LOGO_DEV_PUBLISHABLE_KEY}&size=60&format=png&retina=true`
const amazonLogo = `https://img.logo.dev/name/amazon?token=${import.meta.env.VITE_LOGO_DEV_PUBLISHABLE_KEY}&size=60&format=png&retina=true`
const ibmLogo = `https://img.logo.dev/name/ibm?token=${import.meta.env.VITE_LOGO_DEV_PUBLISHABLE_KEY}&size=60&format=png&retina=true`
const adobeLogo = `https://img.logo.dev/name/adobe?token=${import.meta.env.VITE_LOGO_DEV_PUBLISHABLE_KEY}&size=60&format=png&retina=true`
const oracleLogo = `https://img.logo.dev/name/oracle?token=${import.meta.env.VITE_LOGO_DEV_PUBLISHABLE_KEY}&size=60&format=png&retina=true`
const sapLogo = `https://img.logo.dev/name/sap?token=${import.meta.env.VITE_LOGO_DEV_PUBLISHABLE_KEY}&size=60&format=png&retina=true`
const salesforceLogo = `https://img.logo.dev/name/salesforce?token=${import.meta.env.VITE_LOGO_DEV_PUBLISHABLE_KEY}&size=60&format=png&retina=true`
const intelLogo = `https://img.logo.dev/name/intel?token=${import.meta.env.VITE_LOGO_DEV_PUBLISHABLE_KEY}&size=60&format=png&retina=true`
const ciscoLogo = `https://img.logo.dev/name/cisco?token=${import.meta.env.VITE_LOGO_DEV_PUBLISHABLE_KEY}&size=60&format=png&retina=true`
const dellLogo = `https://img.logo.dev/name/dell?token=${import.meta.env.VITE_LOGO_DEV_PUBLISHABLE_KEY}&size=60&format=png&retina=true`
const accentureLogo = `https://img.logo.dev/name/accenture?token=${import.meta.env.VITE_LOGO_DEV_PUBLISHABLE_KEY}&size=60&format=png&retina=true`
const tcsLogo = `https://img.logo.dev/tcs.com?token=${import.meta.env.VITE_LOGO_DEV_PUBLISHABLE_KEY}&size=60&format=png&retina=true&fallback=404`
const capgeminiLogo = `https://img.logo.dev/name/capgemini?token=${import.meta.env.VITE_LOGO_DEV_PUBLISHABLE_KEY}&size=60&format=png&retina=true`
const infosysLogo = `https://img.logo.dev/name/infosys?token=${import.meta.env.VITE_LOGO_DEV_PUBLISHABLE_KEY}&size=60&format=png&retina=true`
const wiproLogo = `https://img.logo.dev/name/wipro?token=${import.meta.env.VITE_LOGO_DEV_PUBLISHABLE_KEY}&size=60&format=png&retina=true`
const hpeLogo = `https://img.logo.dev/name/Hewlett%20Packard%20Enterprise?token=${import.meta.env.VITE_LOGO_DEV_PUBLISHABLE_KEY}&size=60&format=png&retina=true`
const siemensLogo = `https://img.logo.dev/name/siemens?token=${import.meta.env.VITE_LOGO_DEV_PUBLISHABLE_KEY}&size=60&format=png&retina=true`
const paypalLogo = `https://img.logo.dev/name/paypal?token=${import.meta.env.VITE_LOGO_DEV_PUBLISHABLE_KEY}&size=60&format=png&retina=true`
const uberLogo = `https://img.logo.dev/uber.com?token=${import.meta.env.VITE_LOGO_DEV_PUBLISHABLE_KEY}&size=60&format=png&retina=true`


//<img src={interview.company.logo} className='w-5'/>


/* 
  next format of data
{
  id: 1,
  company: {
    name: "Google",
    logoLink: "https://logo.com/google.png",
    location: "Bengaluru, India"
  },
  jobTitle: "Frontend Developer",
  salaryRange: { min: 1800000, max: 2800000 },
  stage: "Interview",
  dateApplied: "2026-03-12",
  source: "LinkedIn",
  notes: "Referral from John",
  resumeId: "Frontend_Resume.pdf",
  jobUrl, {have to do this}
  interviews: [
    {
      round: 1,
      type: "Technical",
      date: "2026-03-15",
      interviewer: "Jane Doe",
      meetingLink: "https://zoom.us/abc",
      notes: "Prepare algorithms",
      outcome: null,
      status: "Upcoming"
    }
  ]
} */


  /* 

  Application Status
    Pending → Waiting for response
    Shortlisted → Positive signal
    Interview → In process
    Offer → Success
    Rejected → Closed
  */


    /* 
      Main points to keep in mind:
        1. The rounds in the interviews, should be desending order, when add or modifying it

        Status of the interview
          Simple single-status system
          upcoming → interview is scheduled and hasn’t happened yet
          pending → interview happened but result isn’t decided yet
          passed → interview done and candidate passed
          failed → interview done and candidate didn’t pass 
    */

const applicationsList = [
  {
    id: 0,
    company: { 
      logoLink: googleLogo, 
      name: "Google", 
      location: "Bengaluru, India",
      url: "google.com"
    },
    jobTitle: "Frontend Developer",
    salaryRange: { min: 1800000, max: 2800000 },
    date: "2026-03-12",
    interviewType: "Virtual",
    stage: "Interview",
    isDeleted: false,
    source: "LinkedIn",
    notes: "Referral from John",
    resumeId: null,
    interviews: [
      {
        round: 1,
        type: "Technical",
        date: "2026-03-15",
        time:{
          start: '20:00',
          duration: 60
        },
        details: "Introduction and resume overview. Discussion about team fit. Initial salary expectations",
        interviewer: "Jane Doe",
        meetingLink: "https://zoom.us/abc",
        notes: "Prepare algorithms",
        status: "Upcoming"
      }
    ]
  },
  {
    id: 1,
    company: { 
      logoLink: microsoftLogo, 
      name: "Microsoft", 
      location: "Hyderabad, India",
      url: "microsoft.com"
    },
    jobTitle: "Software Engineer",
    salaryRange: { min: 1500000, max: 2500000 },
    date: "2026-03-18",
    interviewType: "Onsite",
    stage: "Interview",
    isDeleted: false,
    interviews: [
      {
        round: 3,
        type: "HR",
        date: "2026-05-25",
        time:{
          start: '18:00',
          duration: 60
        },
        details: "Introduction and resume overview. Discussion about team fit. Initial salary expectations",
        interviewer: "Kimmy Doe",
        meetingLink: "https://google.meet.us/abcd",
        notes: "Prepare DSA",
        status: "Upcoming"
      },
      {
        round: 2,
        type: "DSA",
        date: "2026-05-15",
        time:{
          start: '16:00',
          duration: 120
        },
        details: "Introduction and resume overview. Discussion about team fit. Initial salary expectations",
        interviewer: "Kimmy Doe",
        meetingLink: "https://google.meet.us/abcd",
        notes: "Prepare DSA",
        status: "Passed"
      },
      {
        round: 1,
        type: "Technical",
        date: "2026-04-15",
        time:{
          start: '12:00',
          duration: 45
        },
       details: "Introduction and resume overview. Discussion about team fit. Initial salary expectations",
        interviewer: "Jimmy Doe",
        meetingLink: "https://zoom.us/abcd",
        notes: "Prepare DSA",
        status: "Passed"
      }
    ]
  },
  {
    id: 2,
    company: { 
      logoLink: amazonLogo, 
      name: "Amazon", 
      location: "Chennai, India",
      url: "amazon.com"
    },
    jobTitle: "Full Stack Developer",
    salaryRange: { min: 1200000, max: 2000000 },
    date: "2026-03-20",
    interviewType: "Virtual",
    stage: "Interview",
    deleted: false,
    interviews: [
      {
        round: 3,
        type: "HR",
        date: "2026-01-25",
        time:{
          start: '18:00',
          duration: 60
        },
        details: "Introduction and resume overview. Discussion about team fit. Initial salary expectations",
        interviewer: "Kimmy Doe",
        meetingLink: "https://google.meet.us/abcd",
        notes: "Prepare DSA",
        status: "Upcoming"
      },
      {
        round: 2,
        type: "DSA",
        date: "2025-12-15",
        time:{
          start: '16:00',
          duration: 120
        },
        details: "Introduction and resume overview. Discussion about team fit. Initial salary expectations",
        interviewer: "Kimmy Doe",
        meetingLink: "https://google.meet.us/abcd",
        notes: "Prepare DSA",
        status: "Passed"
      },
      {
        round: 1,
        type: "Technical",
        date: "2025-11-15",
        time:{
          start: '12:00',
          duration: 45
        },
       details: "Introduction and resume overview. Discussion about team fit. Initial salary expectations",
        interviewer: "Jimmy Doe",
        meetingLink: "https://zoom.us/abcd",
        notes: "Prepare DSA",
        status: "Passed"
      }
    ]
  },
  {
    id: 3,
    company: { 
      logoLink: ibmLogo, 
      name: "IBM", 
      location: "Pune, India",
      url: "ibm.com"
    },
    jobTitle: "Backend Developer",
    salaryRange: { min: 1000000, max: 1800000 },
    date: "2026-03-22",
    interviewType: "Virtual",
    stage: "Rejected",
    deleted: false,
    interviews: [
      {
        round: 3,
        type: "HR",
        date: "2026-05-25",
        time:{
          start: '18:00',
          duration: 60
        },
        details: "Introduction and resume overview. Discussion about team fit. Initial salary expectations",
        interviewer: "Kimmy Doe",
        meetingLink: "https://google.meet.us/abcd",
        notes: "Prepare DSA",
        status: "Failed"
      },
      {
        round: 2,
        type: "DSA",
        date: "2026-05-15",
        time:{
          start: '16:00',
          duration: 120
        },
        details: "Introduction and resume overview. Discussion about team fit. Initial salary expectations",
        interviewer: "Kimmy Doe",
        meetingLink: "https://google.meet.us/abcd",
        notes: "Prepare DSA",
        status: "Passed"
      },
      {
        round: 1,
        type: "Technical",
        date: "2026-04-15",
        time:{
          start: '12:00',
          duration: 45
        },
       details: "Introduction and resume overview. Discussion about team fit. Initial salary expectations",
        interviewer: "Jimmy Doe",
        meetingLink: "https://zoom.us/abcd",
        notes: "Prepare DSA",
        status: "Passed"
      }
    ]
  },
  {
    id: 4,
    company: { 
      logoLink: adobeLogo, 
      name: "Adobe", 
      location: "Noida, India",
      url: "adobe.com"
    },
    jobTitle: "React Developer",
    salaryRange: { min: 1600000, max: 2600000 },
    date: "2026-03-25",
    interviewType: "Onsite",
    stage: "Interview",
    deleted: false
  },
  {
    id: 5,
    company: { 
      logoLink: oracleLogo, 
      name: "Oracle", 
      location: "Gurugram, India",
      url: "oracle.com"
    },
    jobTitle: "Cloud Engineer",
    salaryRange: { min: 1400000, max: 2200000 },
    date: "2026-03-28",
    interviewType: "Virtual",
    stage: "Shortlisted",
    isDeleted: false
  },
  {
    id: 6,
    company: { 
      logoLink: sapLogo, 
      name: "SAP", 
      location: "Bengaluru, India",
      url: "sap.com"
    },
    jobTitle: "UI Engineer",
    salaryRange: { min: 1300000, max: 2100000 },
    date: "2026-04-02",
    interviewType: "Virtual",
    stage: "Pending",
    isDeleted: false
  },
  {
    id: 7,
    company: { 
      logoLink: salesforceLogo, 
      name: "Salesforce", 
      location: "Hyderabad, India",
      url: "salesforce.com"
    },
    jobTitle: "Platform Engineer",
    salaryRange: { min: 1700000, max: 3000000 },
    date: "2026-04-05",
    interviewType: "Onsite",
    stage: "Pending",
    isDeleted: false
  },
  {
    id: 8,
    company: { 
      logoLink: intelLogo, 
      name: "Intel", 
      location: "Bengaluru, India",
      url: "intel.com"
    },
    jobTitle: "Systems Engineer",
    salaryRange: { min: 1400000, max: 2300000 },
    date: "2026-04-07",
    interviewType: "Virtual",
    stage: "Rejected",
    isDeleted: false
  },
  {
    id: 9,
    company: { 
      logoLink: ciscoLogo, 
      name: "Cisco", 
      location: "Pune, India",
      url: "cisco.com"
    },
    jobTitle: "Network Software Engineer",
    salaryRange: { min: 1300000, max: 2200000 },
    date: "2026-04-09",
    interviewType: "Virtual",
    stage: "Shortlisted",
    isDeleted: false
  },
  {
    id: 10,
    company: { 
      logoLink: dellLogo, 
      name: "Dell Technologies", 
      location: "Hyderabad, India",
      url: "dell.com"
    },
    jobTitle: "DevOps Engineer",
    salaryRange: { min: 1200000, max: 2100000 },
    date: "2026-04-12",
    interviewType: "Onsite",
    stage: "Pending",
    isDeleted: false
  },
  {
    id: 11,
    company: { 
      logoLink: accentureLogo, 
      name: "Accenture", 
      location: "Mumbai, India",
      url: "accenture.com"
    },
    jobTitle: "Application Developer",
    salaryRange: { min: 800000, max: 1500000 },
    date: "2026-04-15",
    interviewType: "Virtual",
    stage: "Pending",
    isDeleted: false
  },
  {
    id: 12,
    company: { 
      logoLink: tcsLogo, 
      name: "TCS", 
      location: "Kolkata, India",
      url: "tcs.com"
    },
    jobTitle: "Software Developer",
    salaryRange: { min: 600000, max: 1200000 },
    date: "2026-04-18",
    interviewType: "Onsite",
    stage: "Shortlisted",
    isDeleted: false
  },
  {
    id: 13,
    company: { 
      logoLink: capgeminiLogo, 
      name: "Capgemini", 
      location: "Noida, India",
      url: "capgemini.com"
    },
    jobTitle: "Java Developer",
    salaryRange: { min: 700000, max: 1400000 },
    date: "2026-04-20",
    interviewType: "Virtual",
    stage: "Rejected",
    isDeleted: false
  },
  {
    id: 14,
    company: { 
      logoLink: infosysLogo, 
      name: "Infosys", 
      location: "Bengaluru, India",
      url: "infosys.com"
    },
    jobTitle: "Associate Engineer",
    salaryRange: { min: 650000, max: 1100000 },
    date: "2026-04-22",
    interviewType: "Onsite",
    stage: "Pending",
    isDeleted: false
  },
  {
    id: 15,
    company: { 
      logoLink: wiproLogo, 
      name: "Wipro", 
      location: "Hyderabad, India",
      url: "wipro.com"
    },
    jobTitle: "Frontend Engineer",
    salaryRange: { min: 700000, max: 1300000 },
    date: "2026-04-25",
    interviewType: "Virtual",
    stage: "Pending",
    isDeleted: false
  },
  {
    id: 16,
    company: { 
      logoLink: hpeLogo, 
      name: "HPE", 
      location: "Chennai, India",
      url: "hpe.com"
    },
    jobTitle: "Cloud Support Engineer",
    salaryRange: { min: 900000, max: 1600000 },
    date: "2026-04-27",
    interviewType: "Virtual",
    stage: "Shortlisted",
    isDeleted: false
  },
  {
    id: 17,
    company: { 
      logoLink: siemensLogo, 
      name: "Siemens", 
      location: "Pune, India",
      url: "siemens.com"
    },
    jobTitle: "Software Consultant",
    salaryRange: { min: 1000000, max: 1900000 },
    date: "2026-04-29",
    interviewType: "Onsite",
    stage: "Pending",
    isDeleted: false
  },
  {
    id: 18,
    company: { 
      logoLink: paypalLogo, 
      name: "PayPal", 
      location: "Bengaluru, India",
      url: "paypal.com"
    },
    jobTitle: "Full Stack Engineer",
    salaryRange: { min: 1800000, max: 3200000 },
    date: "2026-05-02",
    interviewType: "Virtual",
    stage: "Shortlisted",
    isDeleted: false
  },
  {
    id: 19,
    company: { 
      logoLink: uberLogo, 
      name: "Uber", 
      location: "Hyderabad, India",
      url: "uber.com"
    },
    jobTitle: "Backend Engineer",
    salaryRange: { min: 2000000, max: 3500000 },
    date: "2026-05-05",
    interviewType: "Onsite",
    stage: "Pending",
    isDeleted: false
  }
];
export default applicationsList