export type Interview = {
  id:number
  applicationId: number
  date: string
  details: string
  interviewer: string
  meetingLink: string
  mode: string
  notes: string
  round: number
  status: string
  time: {
    start: string
    duration: number
  }
  type: string
  userId: number
}

export type InterviewInFrontend =  Omit<Interview, "applicationId" | "userId" | "id">

export type Application = {
  company:{
    logoLink: string
    location: string
    name: string
    url: string
  }
  date: string
  id: number
  interviews: Interview[]
  isDeleted: boolean
  jobTitle: string
  notes: string | null
  resumeId: number | null
  salaryRange: {
    min: number
    max: number
  }
  source: string | null
  stage: string
  userId: number
}

export type ApplicationInFrontend =  Omit<Application,  "userId" | "id">

export type ResumeDetails = {
  createdAt: string
  fileUrl: string
  id:number
  name:string
  userId:number
}
export type ResumeDetailsFromServer = {
  created_at: string
  file_url: string
  id:number
  name:string
  user_id:number
}

export type Resume = {
  id: number | null
  name: string
  fileUrl: string
}

export type UserData = {
  id: number,
  email: string
  username: string
  first_name: string
  password_hash: string
  created_at: string
  last_name: string
}

export type Error = {
  error: string
}

export type ModalType = null | "edit" | "add"

export type JobContextType = {
  applicationJson: Application[]
  setApplicationJson: React.Dispatch<React.SetStateAction<Application[]>>
  activeBtn: string | null
  userData: UserData | null
  setActiveBtn: React.Dispatch<React.SetStateAction<string | null>>
  setUserData: React.Dispatch<React.SetStateAction<UserData | null>>
}





/* export type DropdownProps = {
  openModalId: string | null
  setOpenModalId: React.Dispatch<React.SetStateAction<>>
  id: 
  setAddJobModal: React.Dispatch<React.SetStateAction<>>
} */





