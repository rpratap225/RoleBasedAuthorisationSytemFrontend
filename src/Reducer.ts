export interface SessionData {
    userName?: string | null | undefined
    position?: string | null | undefined
    userId:number| null | undefined
    readOption:boolean| null | undefined
    writeOption:boolean| null | undefined
    deleteOption:boolean| null | undefined
    userType:number| null | undefined
    option1:boolean| null | undefined
    option2:boolean| null | undefined
}
export interface StandardState {
    sessionData: SessionData[]
}
export interface ContextProps {
    state: StandardState
    dispatch: ({ type: string, data: any }) => void
  }