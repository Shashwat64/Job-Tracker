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

export type ApplicationInFrontend =  Omit<Application, "interviews" | "userId" | "id">


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

type ModalType = null | "edit" | "add"

export type InterviewModalProps = {
  modalType: ModalType
  setModalType: React.Dispatch<React.SetStateAction<ModalType>>
  applicationJson: Application[]
  setApplicationJson: React.Dispatch<React.SetStateAction<Application[]>>
  selectedId: number | null
  setSelectedId: React.Dispatch<React.SetStateAction<number | null>>
  selectedApplication: Application
}

/* export type DropdownProps = {
  openModalId: string | null
  setOpenModalId: React.Dispatch<React.SetStateAction<>>
  id: 
  setAddJobModal: React.Dispatch<React.SetStateAction<>>
} */