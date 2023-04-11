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

  export interface ILogReq {
    email: string,
    password: string
}
export interface ILogRes {
  user: {
    id: number,
    nickName: string,
    email: string,
    favourites: unknown[]
},
token: string
}

export interface IGetMe {
  id: number,
  nickName: string,
  email: string,
  favourites: unknown[]
}

export interface IUploadAlbumRes {
  id: number,
  name: string,
  author: string,
  cover: string
}