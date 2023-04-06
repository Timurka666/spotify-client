export interface IRegReq {
    nickName: string,
    email: string,
    password: string
}
export interface IRegRes {
    user: {
      nickName: string
      email: string
      password: string
      id: number
    }
    token: string
  }