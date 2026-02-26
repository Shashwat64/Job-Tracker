const googleLogo = "https://img.logo.dev/name/google?token=pk_GAJVb_SMSqi7kcC4fhfdhQ&size=60&retina=true"
const microsoftLogo = "https://img.logo.dev/name/microsoft?token=pk_GAJVb_SMSqi7kcC4fhfdhQ&size=60&retina=true"
const amazonLogo = "https://img.logo.dev/name/amazon?token=pk_GAJVb_SMSqi7kcC4fhfdhQ&size=60&retina=true"
const ibmLogo = "https://img.logo.dev/name/ibm?token=pk_GAJVb_SMSqi7kcC4fhfdhQ&size=60&retina=true"
const adobeLogo = "https://img.logo.dev/name/adobe?token=pk_GAJVb_SMSqi7kcC4fhfdhQ&size=60&retina=true"
const oracleLogo = "https://img.logo.dev/name/oracle?token=pk_GAJVb_SMSqi7kcC4fhfdhQ&size=60&retina=true"
const sapLogo = "https://img.logo.dev/name/sap?token=pk_GAJVb_SMSqi7kcC4fhfdhQ&size=60&retina=true"
const salesforceLogo = "https://img.logo.dev/name/salesforce?token=pk_GAJVb_SMSqi7kcC4fhfdhQ&size=60&retina=true"
const intelLogo = "https://img.logo.dev/name/intel?token=pk_GAJVb_SMSqi7kcC4fhfdhQ&size=60&retina=true"
const ciscoLogo = "https://img.logo.dev/name/cisco?token=pk_GAJVb_SMSqi7kcC4fhfdhQ&size=60&retina=true"
const dellLogo = "https://img.logo.dev/name/dell?token=pk_GAJVb_SMSqi7kcC4fhfdhQ&size=60&retina=true"
const accentureLogo = "https://img.logo.dev/name/accenture?token=pk_GAJVb_SMSqi7kcC4fhfdhQ&size=60&retina=true"
const tcsLogo = "https://img.logo.dev/name/Tata%20Consultancy%20Services?token=pk_GAJVb_SMSqi7kcC4fhfdhQ&size=30&retina=true"
const capgeminiLogo = "https://img.logo.dev/name/capgemini?token=pk_GAJVb_SMSqi7kcC4fhfdhQ&size=60&retina=true"
const infosysLogo = "https://img.logo.dev/name/infosys?token=pk_GAJVb_SMSqi7kcC4fhfdhQ&size=60&retina=true"
const wiproLogo = "https://img.logo.dev/name/wipro?token=pk_GAJVb_SMSqi7kcC4fhfdhQ&size=60&retina=true"
const hpeLogo = "https://img.logo.dev/name/Hewlett%20Packard%20Enterprise?token=pk_GAJVb_SMSqi7kcC4fhfdhQ&size=60&retina=true"
const siemensLogo = "https://img.logo.dev/name/siemens?token=pk_GAJVb_SMSqi7kcC4fhfdhQ&size=60&retina=true"
const paypalLogo = "https://img.logo.dev/name/paypal?token=pk_GAJVb_SMSqi7kcC4fhfdhQ&size=60&retina=true"
const uberLogo = "https://img.logo.dev/uber.com?token=pk_GAJVb_SMSqi7kcC4fhfdhQ&size=60&retina=true"

//<img src={interview.company.logo} className='w-5'/>

const interviewList = [
  {
    id: 0,
    company: { 
      logoLink: googleLogo, 
      name: "Google", 
      location: "Bengaluru, India" },
    jobTitle: "Frontend Developer",
    salaryRange: { min: 1800000, max: 2800000 },
    date: "2026-03-12",
    interviewType: "Virtual",
    stage: "Pending"
  },
  {
    id: 1,
    company: { logoLink: microsoftLogo, name: "Microsoft", location: "Hyderabad, India" },
    jobTitle: "Software Engineer",
    salaryRange: { min: 1500000, max: 2500000 },
    date: "2026-03-18",
    interviewType: "Onsite",
    stage: "Shortlisted"
  },
  {
    id: 2,
    company: { logoLink: amazonLogo, name: "Amazon", location: "Chennai, India" },
    jobTitle: "Full Stack Developer",
    salaryRange: { min: 1200000, max: 2000000 },
    date: "2026-03-20",
    interviewType: "Virtual",
    stage: "Pending"
  },
  {
    id: 3,
    company: { logoLink: ibmLogo, name: "IBM", location: "Pune, India" },
    jobTitle: "Backend Developer",
    salaryRange: { min: 1000000, max: 1800000 },
    date: "2026-03-22",
    interviewType: "Virtual",
    stage: "Rejected"
  },
  {
    id: 4,
    company: { logoLink: adobeLogo, name: "Adobe", location: "Noida, India" },
    jobTitle: "React Developer",
    salaryRange: { min: 1600000, max: 2600000 },
    date: "2026-03-25",
    interviewType: "Onsite",
    stage: "Pending"
  },
  {
    id: 5,
    company: { logoLink: oracleLogo, name: "Oracle", location: "Gurugram, India" },
    jobTitle: "Cloud Engineer",
    salaryRange: { min: 1400000, max: 2200000 },
    date: "2026-03-28",
    interviewType: "Virtual",
    stage: "Shortlisted"
  },
  {
    id: 6,
    company: { logoLink: sapLogo, name: "SAP", location: "Bengaluru, India" },
    jobTitle: "UI Engineer",
    salaryRange: { min: 1300000, max: 2100000 },
    date: "2026-04-02",
    interviewType: "Virtual",
    stage: "Pending"
  },
  {
    id: 7,
    company: { logoLink: salesforceLogo, name: "Salesforce", location: "Hyderabad, India" },
    jobTitle: "Platform Engineer",
    salaryRange: { min: 1700000, max: 3000000 },
    date: "2026-04-05",
    interviewType: "Onsite",
    stage: "Pending"
  },
  {
    id: 8,
    company: { logoLink: intelLogo, name: "Intel", location: "Bengaluru, India" },
    jobTitle: "Systems Engineer",
    salaryRange: { min: 1400000, max: 2300000 },
    date: "2026-04-07",
    interviewType: "Virtual",
    stage: "Rejected"
  },
  {
    id: 9,
    company: { logoLink: ciscoLogo, name: "Cisco", location: "Pune, India" },
    jobTitle: "Network Software Engineer",
    salaryRange: { min: 1300000, max: 2200000 },
    date: "2026-04-09",
    interviewType: "Virtual",
    stage: "Shortlisted"
  },
  {
    id: 10,
    company: { logoLink: dellLogo, name: "Dell Technologies", location: "Hyderabad, India" },
    jobTitle: "DevOps Engineer",
    salaryRange: { min: 1200000, max: 2100000 },
    date: "2026-04-12",
    interviewType: "Onsite",
    stage: "Pending"
  },
  {
    id: 11,
    company: { logoLink: accentureLogo, name: "Accenture", location: "Mumbai, India" },
    jobTitle: "Application Developer",
    salaryRange: { min: 800000, max: 1500000 },
    date: "2026-04-15",
    interviewType: "Virtual",
    stage: "Pending"
  },
  {
    id: 12,
    company: { logoLink: "https://img.logo.dev/name/Tata%20Consultancy%20Services?token=pk_GAJVb_SMSqi7kcC4fhfdhQ&size=30&retina=true", name: "TCS", location: "Kolkata, India" },
    jobTitle: "Software Developer",
    salaryRange: { min: 600000, max: 1200000 },
    date: "2026-04-18",
    interviewType: "Onsite",
    stage: "Shortlisted"
  },
  {
    id: 13,
    company: { logoLink: capgeminiLogo, name: "Capgemini", location: "Noida, India" },
    jobTitle: "Java Developer",
    salaryRange: { min: 700000, max: 1400000 },
    date: "2026-04-20",
    interviewType: "Virtual",
    stage: "Rejected"
  },
  {
    id: 14,
    company: { logoLink: infosysLogo, name: "Infosys", location: "Bengaluru, India" },
    jobTitle: "Associate Engineer",
    salaryRange: { min: 650000, max: 1100000 },
    date: "2026-04-22",
    interviewType: "Onsite",
    stage: "Pending"
  },
  {
    id: 15,
    company: { logoLink: wiproLogo, name: "Wipro", location: "Hyderabad, India" },
    jobTitle: "Frontend Engineer",
    salaryRange: { min: 700000, max: 1300000 },
    date: "2026-04-25",
    interviewType: "Virtual",
    stage: "Pending"
  },
  {
    id: 16,
    company: { logoLink: hpeLogo, name: "HPE", location: "Chennai, India" },
    jobTitle: "Cloud Support Engineer",
    salaryRange: { min: 900000, max: 1600000 },
    date: "2026-04-27",
    interviewType: "Virtual",
    stage: "Shortlisted"
  },
  {
    id: 17,
    company: { logoLink: siemensLogo, name: "Siemens", location: "Pune, India" },
    jobTitle: "Software Consultant",
    salaryRange: { min: 1000000, max: 1900000 },
    date: "2026-04-29",
    interviewType: "Onsite",
    stage: "Pending"
  },
  {
    id: 18,
    company: { logoLink: paypalLogo, name: "PayPal", location: "Bengaluru, India" },
    jobTitle: "Full Stack Engineer",
    salaryRange: { min: 1800000, max: 3200000 },
    date: "2026-05-02",
    interviewType: "Virtual",
    stage: "Shortlisted"
  },
  {
    id: 19,
    company: { logoLink: uberLogo, name: "Uber", location: "Hyderabad, India" },
    jobTitle: "Backend Engineer",
    salaryRange: { min: 2000000, max: 3500000 },
    date: "2026-05-05",
    interviewType: "Onsite",
    stage: "Pending"
  }
]
export default interviewList