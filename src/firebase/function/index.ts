import {getDocs,collection, setDoc, doc , getDoc} from '@firebase/firestore'
import { db } from '..';
import { centerdata, disastercenter, disasterdata, registrationdata, smsdata } from 'types/interfaces';


export const generateRandomKey = (length: number) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

export const fetchRegistrationList = async() => {
  try {
    const querySnapshot = await getDocs(collection(db, 'registration'));
    const thisdata: registrationdata[] = []
    querySnapshot.forEach((doc) => {
      if(doc.data().active === true)
      thisdata.push({
        firstname: doc.data().firstname,
        middlename: doc.data().middlename,
        lastname: doc.data().lastname,
        suffix: doc.data().suffix,
        address: doc.data().address,
        contact: doc.data().contact,
        contact1: doc.data().contact1,
        contact2: doc.data().contact2,
        families: doc.data().families,
        id: doc.data().id,
        type: doc.data().type,
        active: doc.data().active,

      })
    })

    return thisdata;

  } catch(error){
    console.log(error)
  }
  }

  export const fetchRegistration = async(id: string) => {
    try {
      const querySnapshot = await getDocs(collection(db, 'registration'));
      const thisdata: registrationdata[] = []
      querySnapshot.forEach((doc) => {
        if(doc.data().id === id)
        thisdata.push({
          firstname: doc.data().firstname,
          middlename: doc.data().middlename,
          lastname: doc.data().lastname,
          suffix: doc.data().suffix,
          address: doc.data().address,
          contact: doc.data().contact,
          contact1: doc.data().contact1,
          contact2: doc.data().contact2,
          families: doc.data().families,
          id: doc.data().id,
          type: doc.data().type,
          active: doc.data().active,
        })
      })
  
      return thisdata;
  
    } catch(error){
      console.log(error)
    }
    }

  export const fetchCenters = async() => {
    try {
      const querySnapshot = await getDocs(collection(db, 'center'));
      const thisdata: centerdata[] = []
      querySnapshot.forEach((doc) => {
        if(doc.data().active === true)
        thisdata.push({
         center: doc.data().center,
         address: doc.data().address,
         longitude: doc.data().longitude,
         latitude: doc.data().latitude,
         capacity: doc.data().capacity,
         id: doc.data().id,
         active: doc.data().active,
         date: doc.data().date
        })
      })
  
      return thisdata;
  
    } catch(error){
      console.log(error)
    }
  }

  export const fetchcenter = async(id: string) => {
    try {
      const querySnapshot = await getDocs(collection(db, 'center'));
      const thisdata: centerdata[] = []
      querySnapshot.forEach((doc) => {
        if(doc.data().id === id)
        thisdata.push({
         center: doc.data().center,
         address: doc.data().address,
         longitude: doc.data().longitude,
         latitude: doc.data().latitude,
         capacity: doc.data().capacity,
         id: doc.data().id,
         active: doc.data().active,
         date: doc.data().date
        })
      })
  
      return thisdata;
  
    } catch(error){
      console.log(error)
    }
  }
export const fetchDisasterList = async() => {
  try {
    const querySnapshot = await getDocs(collection(db, 'disaster'));
    const thisdata: disasterdata[] = []
    querySnapshot.forEach((doc) => {
      if(doc.data().active === true)
      thisdata.push({
        disaster: doc.data().disaster,
        id: doc.data().id,
        date: doc.data().date,
        time: doc.data().time,
        center: doc.data().center,
        evacuees: doc.data().evacuees,
        response: doc.data().response,
        agri: doc.data().agri,
        infra: doc.data().infra,
        livestock: doc.data().livestock,
        active: doc.data().active,
      })
    })

    return thisdata;

  } catch(error){
    console.log(error)
  }
}

export const fetchdisaster = async (id: string) => {
  try {
    const docRef = doc(db, 'disaster', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();

      if (data?.active === true) {
        return [
          {
            disaster: data.disaster,
            id: data.id,
            date: data.date,
            time: data.time,
            center: data.center,
            evacuees: data.evacuees,
            response: data.response,
            agri: data.agri,
            infra: data.infra,
            livestock: data.livestock,
            active: data.active,
          },
        ];
      }
    }

    return [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const fetchdisasterevacuation = async(id: string) => {
  try {
    const querySnapshot = await getDocs(collection(db, 'disastercenter'));
    const thisdata: disastercenter[] = []
    querySnapshot.forEach((doc) => {
      if(doc.data().id === id)
      thisdata.push({
       center: doc.data().center,
       evacuees: doc.data().evacuees,
       id: doc.data().id,
       active: doc.data().active,
       date: doc.data().date,
       services: doc.data().services,
       disasterid: doc.data().disasterid,
      })
    })

    return thisdata;

  } catch(error){
    console.log(error)
  }
}
export const fetchsms = async(id: string) => {
  try {
    const querySnapshot = await getDocs(collection(db, 'sms'));
    const thisdata: smsdata[] = []
    querySnapshot.forEach((doc) => {
      if(doc.data().id === id)
      thisdata.push({
       subject: doc.data().subject,
       message: doc.data().message,
       id: doc.data().id,
      })
    })

    return thisdata;

  } catch(error){
    console.log(error)
  }
}

// import { educationdata, employmentdata, personaldata, postdata, statusdata } from '../../types/interfaces';

// export const fetchdata = async(data: string) => {
//   try {
//     const querySnapshot = await getDocs(collection(db, data));
//     const thisdata: postdata[] = []
//     querySnapshot.forEach((doc) => {
//       if(doc.data().active === true)
//       thisdata.push({
//         uid: doc.data().uid,
//         id: doc.data().postid,
//         time: doc.data().time,
//         photo: doc.data().photo,
//         text: doc.data().text,
//         active: doc.data().active,
//         type: doc.data().type,
//         school: doc.data().school
//       })
//     })

//     return thisdata;

//   } catch(error){
//     console.log(error)
//   }
//   }

//   export const fetchpersonaldata = async(uid: string,) => {
//     try {
//       const querySnapshot = await getDocs(collection(db, 'user'));
//       const thisdata: personaldata[] = []
//       querySnapshot.forEach((doc) => {
//         if(doc.data().uid === uid)
//         thisdata.push({
//           uid: doc.data().uid,
//           name: doc.data().name,
//           birthdate: doc.data().birthdate,
//           civilstatus: doc.data().civilstatus,
//           contactnumber: doc.data().contactnumber,
//           email: doc.data().email,
//           social: doc.data().social,
//           age: doc.data().age,
//           sex: doc.data().sex,
//           address: doc.data().address,
//         })
//       })
  
//       return thisdata;
  
//     } catch(error){
//       console.log(error)
//     }
//   }

//   export const fetcheducation = async(uid: string,) => {
//     try {
//       const querySnapshot = await getDocs(collection(db, 'user'));
//       const thisdata: educationdata[] = []
//       querySnapshot.forEach((doc) => {
//         if(doc.data().uid === uid)
//         thisdata.push({
//           uid: doc.data().uid,
//           school: doc.data().school,
//           schoolid: doc.data().schoolid,
//           sy: doc.data().sy,
//           highered: doc.data().highered,
//           course: doc.data().course,
//           exam: doc.data().exam,
//           topnotcher: doc.data().topnotcher,
//           rank: doc.data().rank,
//         })
//       })
  
//       return thisdata;
  
//     } catch(error){
//       console.log(error)
//     }
//   }

//   export const fetchemployment = async(uid: string) => {

//     try {

//       const querySnapshot = await getDocs(collection(db, 'user'));
//       const thisdata: employmentdata[] = []
//       querySnapshot.forEach((doc) => {
//         if(doc.data().uid === uid)
//           thisdata.push({
//           uid: doc.data().uid,
//           employee: doc.data().employee,
//           currentwork: doc.data().currentwork,
//           salary: doc.data().salary,
//           history: doc.data().history, 
//         })
//       })
//       return thisdata
      
//     } catch(error) {
//       throw error
//     }

//   }

//   export const fetchstatus = async(uid: string,) => {
//     try {
//       const querySnapshot = await getDocs(collection(db, 'user'));
//       const thisdata: statusdata[] = []
//       querySnapshot.forEach((doc) => {
//         if(doc.data().uid === uid)
//         thisdata.push({
//           uid: doc.data().uid,
//           status: doc.data().status,
        
//         })
//       })
  
//       return thisdata;
  
//     } catch(error){
//       console.log(error)
//     }
//   }

  
//   const generateRandomKey = (length: number) => {
//     const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     let result = '';
//     for (let i = 0; i < length; i++) {
//       result += characters.charAt(Math.floor(Math.random() * characters.length));
//     }
//     return result;
//   };

//   export const update = async(uid: string) => {
//     const id = generateRandomKey(30)
//     try {
//     const updateRef = doc(db, 'updates', uid)
//     await setDoc(updateRef, {
//       date: new Date(),
//       uid: uid,
//       update: id,
//     }).then(() => {
//       console.log('updated')
//     })
//     } catch(error) {
//       console.log(error)
//     }
//   }