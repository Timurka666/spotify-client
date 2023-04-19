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
  favourites: unknown[],
  albums: IAlbum[]
}

export interface IUploadAlbumRes {
  id: number,
  name: string,
  author: string,
  cover: string
}

export interface IAlbum {
  id: number,
  name: string,
  author: string,
  coverPath: string,
  tracks: ITrack[],

}

export interface IAlbumRes extends IAlbum {
  publisher: string
}

export interface ITrack {
  id: number,
  name: string,
  filePath: string,
  author: string,
  coverPath: string,
  likes: number,
  comments: unknown[]
}