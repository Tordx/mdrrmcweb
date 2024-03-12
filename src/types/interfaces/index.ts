

export interface registrationdata {
  firstname: string,
  middlename: string,
  lastname: string,
  suffix: string,
  address: string,
  contact: string,
  contact1: string,
  contact2: string,
  families: string,
  id: string,
  type: string,
  active: boolean,
  
}

export interface centerdata {

  center: string,
  address: string,
  latitude: string,
  longitude: string,
  capacity: string,
  id: string,
  active: boolean,
  date: Date,
  
}

export interface disastercenter {

  center: string,
  evacuees: string,
  id: string,
  services: string,
  active: boolean,
  date: Date,
  disasterid: string,

  
}

export interface disasterdata {
  disaster: string,
  id: string,
  date: string,
  center: string,
  evacuees: string,
  response: string,
  agri: string,
  infra: string,
  livestock: string,
  active: boolean,
  time: string,
}

//NOTE:You must create new interface for each data that has different data types

//this interface is use in personaldata
//if you have any additions add comment
export interface name {
  firstname: string,
  middlename: string,
  lastname: string,
  suffix: string,

}
//---->personaldata use when pulling user's personal information<-----
//---->data usage in header navigation bar, login, and profile<------
export interface personaldata {

  uid: string,
  name: string,
  birthdate: string,
  civilstatus: string,
  contactnumber: string,
  email: string,
  social: string,
  age: string,
  sex: string,
  address: string,

}

//---> education use when pulling user's educational information <---- //
//this data can also be seen by the admin, but are only limited to them and the user //

export interface educationdata {

  uid: string,
  school: string,
  schoolid: string,
  sy: string,
  highered: boolean,
  course: string,
  exam: boolean,
  topnotcher: boolean,
  rank: string,

}

//work history, where user is currently working at, and this data is use by employmentdata history//
//this data can also be seen by the admin, but are only limited to them and the user //

interface historydetails {

  uid: string,
  work: string,
  yearstart: string,
  yearend: string,
  current: boolean,
}

// this uses the above details
//this data can also be seen by the admin, but are only limited to them and the user //

export interface employmentdata {
 
  uid: string,
  employee: string,
  currentwork: string,
  salary: string,
  history: historydetails,

}

//login data can only be use in login and change auth
//passwords are encrypted, please do not expose

export interface logindata {

  uid: string,
  email: string,
  username: string,
  contact: string,
  password: string,
  newpassword: string,
  confirmpassword: string,
  type: string,
  
}

export interface codedata {
  id: string,
  code: string,
  username: string,
}

//this is for alumni status
// adds new data if ever user attends last year's alumni home coming

export interface statusdata {
  status: string[],
  uid: string,
}

//chilren use in app.tsx only, to nest components for login auth

export interface children {
  children: any | null
}

//postdata used in data.tsx to show admin posts

export interface postdata {
  id: string,
  uid: string,
  time: Date,
  photo: string,
  text: string,
  active: boolean,
  type: string
  school: string,
}

export interface admindata {
  uid: string,
  photoURL: string,
  displayName: string,
  email: string,
}
export interface smsdata {
  subject: string,
  message: string,
  id: string,
}

