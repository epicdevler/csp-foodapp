'use client'
import { auth, firestore_db } from "@/db_init";
import { DB_COLLECTIONS, USERS_ROLE } from "@/libs/auth/utils";
import { BasicUserData } from "@/libs/models";
import { Alert, AlertIcon, Button, FormControl, FormLabel, Heading, Input, Stack, Text } from "@chakra-ui/react";
import { User, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { Timestamp, doc, serverTimestamp, setDoc } from "firebase/firestore";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, ChangeEventHandler, FormEvent, FormEventHandler, use, useEffect, useState } from "react";



async function saveUser(data: BasicUserData) {
  await setDoc(doc(firestore_db, DB_COLLECTIONS.USERS, data.uid), data)
}

export default function Register() {

  const router = useRouter()

  const [fullNameValue, setFullNameValue] = useState<string>('')
  const [emailValue, setEmailValue] = useState<string>('')
  const [passwordValue, setPasswordValue] = useState<string>('')
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [isError, setIsError] = useState<boolean>(false)
  const [isLoading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    setIsError(error !== null && error !== "")

    return () => {
      setIsError(false)
    }
  }, [error])
  useEffect(() => {
    if (isLoading && isError) {
      setLoading(false)
    }

  }, [isError, isLoading])



  const handleFullNameValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFullNameValue(event.target.value)
  }

  const handleEmailValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmailValue(event.target.value)
  }

  const handlePasswordValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(event.target.value)
  }


  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    clearError()

    if (validatePassword()) {
      event.preventDefault()
      return
    }

    setLoading(true)
    createUserWithEmailAndPassword(auth, emailValue, passwordValue)
      .then((userCredential) => {        
        // Signed in 
        const user: User = userCredential.user;

        const userData: BasicUserData = {
          fullName: fullNameValue,
          email: user.email!!,
          uid: user.uid,
          role: USERS_ROLE.CLIENT,
          dateJoined: Timestamp.now()
        }
        try {
          saveUser(userData)
            .then(data => {
              console.log("navigating...")
              router.replace("/")
              setLoading(false)
            })
            .catch(e => {
              console.error("Error adding document: ", e);
              setError("Error: " + e)
            })

        } catch (e) {
          console.error("Error adding document: ", e);
          setError("Error: " + e)
        }


      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        if (errorCode == "auth/email-already-in-use") {
          setError("Email aleady exists.")
        } else {
          setError("Something went wrong, try again.")
        }
        const a = auth.currentUser
        if (a != null) {
          console.log("Deleting user...")
          a.delete()
          console.log("Deleted user.")
        }

        console.error(errorMessage)
        console.error(errorCode)
      });


    event.preventDefault();
  }


  const validatePassword = (): boolean => {
    var valid = false
    if (passwordValue.length < 6) {
      setError("Password length should be greater than 6")
      valid = true
    }

    return valid
  }

  const clearError = () => {
    setError(null)
  }

  return (
    <main>

      <Head>
        <title>Create Account | Food App</title>
        <meta property="og:title" content="Create Account | Food App" key="title" />
      </Head>
      <form onSubmit={handleSubmit}>
        <Stack mt={50} maxW={'md'} alignItems={'center'} mx='auto' direction={'column'} spacing={5}>

          <Heading size={'lg'}>Create Account</Heading>

          {
            isError ?
              <Alert status="error"><AlertIcon /> {error}</Alert>
              :
              <></>
          }

          <FormControl w={'full'}>
            <FormLabel htmlFor={'fullname'}>Full Name</FormLabel>
            <Input
              value={fullNameValue}
              onChange={handleFullNameValueChange}
              placeholder="Full Name"
              type='text'
              id="fullname"
              required
              disabled={isLoading}
              w={'full'}
            />
          </FormControl>

          <FormControl w={'full'}>
            <FormLabel htmlFor={'email'}>Email</FormLabel>
            <Input
              value={emailValue}
              onChange={handleEmailValueChange}
              placeholder="Email"
              type='email'
              id="email"
              required
              disabled={isLoading}
              w={'full'}
            />
          </FormControl>

          <FormControl w={'full'}>
            <FormLabel htmlFor={'password'}>Password</FormLabel>
            <Input
              onChange={handlePasswordValueChange}
              value={passwordValue}
              placeholder="Password"
              type='password'
              disabled={isLoading}
              id="password"
              required
              w={'full'}
            />
          </FormControl>

          <Button isLoading={isLoading} type="submit" w={'full'} colorScheme="green">Create Account</Button>


          <Text as={Link} href='login'>Already have an account</Text>
        </Stack>

      </form>
    </main>
  )
}
