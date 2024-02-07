import {getDocs,collection, setDoc, doc} from '@firebase/firestore'
import { db } from '..';
import { educationdata, employmentdata, personaldata, postdata, statusdata } from '../../types/interfaces';

export const fetchdata = async(data: string) => {
  try {
    const querySnapshot = await getDocs(collection(db, data));
    const thisdata: postdata[] = []
    querySnapshot.forEach((doc) => {
      if(doc.data().active === true)
      thisdata.push({
        uid: doc.data().uid,
        id: doc.data().postid,
        time: doc.data().time,
        photo: doc.data().photo,
        text: doc.data().text,
        active: doc.data().active,
        type: doc.data().type,
        school: doc.data().school
      })
    })

    return thisdata;

  } catch(error){
    console.log(error)
  }
  }

  export const fetchpersonaldata = async(uid: string,) => {
    try {
      const querySnapshot = await getDocs(collection(db, 'user'));
      const thisdata: personaldata[] = []
      querySnapshot.forEach((doc) => {
        if(doc.data().uid === uid)
        thisdata.push({
          uid: doc.data().uid,
          name: doc.data().name,
          birthdate: doc.data().birthdate,
          civilstatus: doc.data().civilstatus,
          contactnumber: doc.data().contactnumber,
          email: doc.data().email,
          social: doc.data().social,
          age: doc.data().age,
          sex: doc.data().sex,
          address: doc.data().address,
        })
      })
  
      return thisdata;
  
    } catch(error){
      console.log(error)
    }
  }

  export const fetcheducation = async(uid: string,) => {
    try {
      const querySnapshot = await getDocs(collection(db, 'user'));
      const thisdata: educationdata[] = []
      querySnapshot.forEach((doc) => {
        if(doc.data().uid === uid)
        thisdata.push({
          uid: doc.data().uid,
          school: doc.data().school,
          schoolid: doc.data().schoolid,
          sy: doc.data().sy,
          highered: doc.data().highered,
          course: doc.data().course,
          exam: doc.data().exam,
          topnotcher: doc.data().topnotcher,
          rank: doc.data().rank,
        })
      })
  
      return thisdata;
  
    } catch(error){
      console.log(error)
    }
  }

  export const fetchemployment = async(uid: string) => {

    try {

      const querySnapshot = await getDocs(collection(db, 'user'));
      const thisdata: employmentdata[] = []
      querySnapshot.forEach((doc) => {
        if(doc.data().uid === uid)
          thisdata.push({
          uid: doc.data().uid,
          employee: doc.data().employee,
          currentwork: doc.data().currentwork,
          salary: doc.data().salary,
          history: doc.data().history, 
        })
      })
      return thisdata
      
    } catch(error) {
      throw error
    }

  }

  export const fetchstatus = async(uid: string,) => {
    try {
      const querySnapshot = await getDocs(collection(db, 'user'));
      const thisdata: statusdata[] = []
      querySnapshot.forEach((doc) => {
        if(doc.data().uid === uid)
        thisdata.push({
          uid: doc.data().uid,
          status: doc.data().status,
        
        })
      })
  
      return thisdata;
  
    } catch(error){
      console.log(error)
    }
  }

  
  const generateRandomKey = (length: number) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

  export const update = async(uid: string) => {
    const id = generateRandomKey(30)
    try {
    const updateRef = doc(db, 'updates', uid)
    await setDoc(updateRef, {
      date: new Date(),
      uid: uid,
      update: id,
    }).then(() => {
      console.log('updated')
    })
    } catch(error) {
      console.log(error)
    }
  }