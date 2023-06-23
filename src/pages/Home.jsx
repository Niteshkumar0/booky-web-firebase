import React, { useEffect, useState } from 'react'
import { getFirestore,collection,getDocs } from 'firebase/firestore'
import { app } from '../config/Firebase'
import { getDownloadURL,listAll,ref } from 'firebase/storage'
import { getStorage } from 'firebase/storage'
import '../App.css'
export default function HomePage() {
    let firestore = getFirestore(app)
    let storage = getStorage(app)
    let [book,setBook] = useState([])
    let [url,setUrl] = useState([])

    let listAllBooks = async () => {
        try {
            await getDocs(collection(firestore,'book'))
            .then(doc => setBook(doc.docs))
        } catch (error) {
            console.log(error)
        }
     
    }

    let forImage =async (imageURL) => {
      try {
        let folderRef = ref(storage , `${imageURL}`)
        let url = await getDownloadURL(folderRef)
        return url
      } catch (error) {
        
      }
    }

    let getImageUrl = async () => {
      try {
        let urls = await Promise.all(
          book.map(async (book) => {
            let url = await forImage(book.data().imageURL)
            return url;
          })
        )
        setUrl(urls)
      } catch (error) {
        console.log('errrr',error)
      }
    }
   
    

    useEffect(()=>{
      listAllBooks()
      getImageUrl()
    },[book])
    
   

  return (
    <>
    <section>

      <div> 
         {book.map((book,index) => (
           <div className='box' key={book.data().id}>
            <img src={url[index]} alt="pic" className='bookImage'/>
            <li className='name'>{book.data().name}</li>
            <li>this book has a title {book.data().name} and book sold by {book.data().email} and this book price is {book.data().price}</li>
        </div>
          
        ))}
        
      </div>
        </section>
    </>
  )
      }