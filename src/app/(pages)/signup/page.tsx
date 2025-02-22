"use client"
import React from 'react';
import styles from './Signup.module.css';
import Image from 'next/image';
import {useState} from 'react';
import {useRouter}from 'next/navigation';

const apiUrl=process.env.NEXT_PUBLIC_API_URL;


const Page = () => {
  const[formData,setFormData]=useState({
    name:'',
    email:'',
    password:'',
    confirmpassword:''
  });
const router=useRouter()
const handleChange=(e)=>{ //handle change
  setFormData({
    ...formData,
    [e.target.id]:e.target.value
  });
};

const handleSubmit = async (e) => { //handlesubmit
  e.preventDefault();

  console.log(formData) //print the form data

  const { name, email, password, confirmpassword } = formData;

  if (password !== confirmpassword) {
      alert('Passwords do not match');
      return;
    }



    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
      });

      if (response.ok) {
     
        alert('Account created successfully');
        router.push('/login')
        // Redirect to login or another page if necessary
      } else {
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error creating account');
    }
  };

  return (
    <div className={styles.createAccountContainer}>
        <Image
        src="https://dynamic.brandcrowd.com/asset/logo/517c7a8a-7da9-4b61-aab1-4a665f3ab306/logo-search-grid-1x?logoTemplateVersion=1&v=638505629239000000&text=BOOKISTA"
        alt="My Books"
        width={150}
        height={50}
        className={styles.logo}
        />
        <h1>Create account</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Your name</label>
            <input type="text" id="name" placeholder="First and last name" value={formData.name} onChange={handleChange}required/>

            <label htmlFor="email">Email</label>
            <input type="email" id="email" value={formData.email} onChange={handleChange}required/>

            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="At least 6 characters"value={formData.password} onChange={handleChange}required/>
            <p className={styles.passwordInfo}>Passwords must be at least 6 characters.</p>

            <label htmlFor="confirmpassword">Password again</label>
            <input type="password" id="confirmpassword" value={formData.confirmpassword} onChange={handleChange}required/>
  

            <button type="submit" className={styles.createAccountButton}>Create your Amazon account</button>
        </form>
        <p className={styles.agreement}>
            By clicking{' '}"Create your Bookista account",{' '}you agree to the{' '}
            <a href="">Bookista Conditions of Use & Sale</a>{' '},{' '}the{' '}
            <a href="">Kindle Store Terms of Use
            </a>{' '}and{' '}<a href="">Bookista's Privacy Notice</a>.
        </p>

        <p className={styles.signin}>
            Already have an account? <a href="/login">Sign in</a>
        </p>
    </div>

  )
}

export default Page
