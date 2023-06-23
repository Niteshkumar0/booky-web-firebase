import React, { useContext, useEffect, useState } from 'react'
import '../styles/register.module.css'
import {useForm} from 'react-hook-form'
import {collection,addDoc,getFirestore} from 'firebase/firestore';
import { getStorage,ref,uploadBytes} from 'firebase/storage'
import {app} from '../config/Firebase'
import {getAuth,onAuthStateChanged} from 'firebase/auth'

export default function ListingBook(){
    
    let {register,handleSubmit,formState: {errors},watch} = useForm()
    let db = getFirestore(app)
    let storage = getStorage(app)
    let auth = getAuth(app);
    let [user,setUser] = useState()

    let checkUser = () => {
        onAuthStateChanged(auth, user => {
            if (user) {
                setUser(user)
            }else{
                setUser('')
            }
        })
    }
   
    

    useEffect(()=>{
        checkUser()
    },[])


    let [bookName,setBooKName] = useState();
    let [bookIsbn,setBooKIsbn] = useState();
    let [bookPrice,setBooKPrice] = useState();
    let [bookPic,setBooKPic] = useState(null)

    let addData = async() => {
     
        try {

            let imgRef = ref(storage,`upload/images/${bookPic.name}`)
            let upload = await uploadBytes(imgRef,bookPic).then(suuc => console.log("succes",suuc))
            let add = await addDoc(collection(db,'book'),{
                name: bookName,
                price:bookPrice ,             
                isbn:bookIsbn,
                imageURL: imgRef.fullPath,
                userId:user.uid,
                email:user.email,
            })
            oNsubmit()
        } catch (error) {
            console.error(error)
        }
    }

    // console.log("booknam",bookName)
    // console.log("isbn",bookIsbn)
    // console.log("bookprice",bookPrice)
    // console.log("bookphoto",bookPic)
    let oNsubmit =() => {
        setBooKName('')
        setBooKIsbn('');
        setBooKPrice('');
        setBooKPic(null)
    }

  return (
    <>
          <section>
    
      <form onSubmit={handleSubmit(oNsubmit)}>           
          <label htmlFor="name">name</label>
          <input type="name" id="name" placeholder='name' value={bookName} {...register('name',{required:true, onChange: () => setBooKName(watch('name'))})}    />
          {errors.name?.type === 'required' && <p>name is required</p>}
        

          <label htmlFor="ISBN"> ISBN</label>
          <input type="text" id="ISBN" placeholder='ISBN' value={bookIsbn}  {...register('isbn',{required:true,onChange: () => setBooKIsbn(watch('isbn'))})} />
          {errors.isbn?.type === 'required' && <p>ISBN is required</p> }


          <label htmlFor="price">price</label>
          <input type="text" id="price" placeholder="price" value={bookPrice} {...register('price',{required:true,onChange: () => setBooKPrice(watch('price'))})} />
          {errors.price?.type === 'req"price' && <p>price is required</p> }

          
          <label htmlFor="coverPhoto"> cover photo</label>
          <input type="file" id="coverPhoto" placeholder='coverPhoto'   {...register('coverPhoto',{required:true})} onChange={(e) => setBooKPic(e.target.files[0])} />
          {errors.coverPhoto?.type === 'required' && <p>cover photo is required</p> }



          <button onClick={addData} type='submit'>Sign in</button>
       </form> 

</section>
    </>
  )
}
