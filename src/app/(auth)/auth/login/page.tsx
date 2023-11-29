'use client'
import { auth, firestore_db } from "@/db_init";
import { loadUser, logOut } from "@/libs/auth";
import { DB_COLLECTIONS, USERS_ROLE } from "@/libs/auth/utils";
import { BasicUserData } from "@/libs/models";
import { Alert, AlertIcon, Button, FormControl, FormLabel, Heading, Input, Stack, Text } from "@chakra-ui/react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getDoc, collection, doc } from "firebase/firestore";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, ChangeEventHandler, FormEvent, FormEventHandler, use, useEffect, useState } from "react";



export default function Login() {

  const router = useRouter()

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
    signInWithEmailAndPassword(auth, emailValue, passwordValue)
      .then((userCredential) => {

        // Signed in 
        const user = userCredential.user;
        manageUser(user.uid)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        if (errorCode == "auth/user-not-found" || errorCode == "auth/invalid-login-credentials") {
          setError("Invalid email or password.")
        }
        if (errorCode == "auth/network-request-failed") {
          setError("Network error, check internet connection.")
        }
        else {
          setError("Something went wrong, try again.")
        }

        const a = auth.currentUser
        if (a != null) {
          logOut()
        }

        console.error(errorMessage)
        console.error(errorCode)
      });



    event.preventDefault();
  }

  const manageUser = (userId: string) => {
    loadUser(userId)
      .then((_userData) => {
        _userData.exists()
        if (_userData.exists()) {
          const userData: BasicUserData = (_userData.data() as BasicUserData)
          console.log(userData.role)
          if (userData.role === USERS_ROLE.ADMIN) {
            router.replace("/dashboard")
          } else {
            router.replace("/")
          }
        } else {
          setError("Something went wrong, please try again.")
          logOut()
          setLoading(false)
        }
      })
      .catch((error) => {
        console.error("Firestore: " + error)
        logOut()
        setLoading(false)
      })
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
        <title>Sign In | Food App</title>
        <meta property="og:title" content="Sign In | Food App" key="title" />
      </Head>
      {/* <LoadingPageLayout isLoading={isLoading}> */}
      <form onSubmit={handleSubmit}>
        <Stack mt={50} maxW={'md'} alignItems={'center'} mx='auto' direction={'column'} spacing={5}>

          <Heading size={'lg'}>Welcome Back</Heading>
          <Heading size='md'>Sign In</Heading>


          {
            isError ?
              <Alert status="error"><AlertIcon /> {error}</Alert>
              :
              <></>
          }

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

          <Button isLoading={isLoading} type="submit" w={'full'} colorScheme="green">LOGIN</Button>

          <Stack w={'full'} direction={'row'} justifyContent={'space-between'}>
            <Text as={Link} href='register'>Create Account</Text>
            <Text as={Link} href='#'>Forgot Password?</Text>
          </Stack>
        </Stack>
      </form>
      {/* </LoadingPageLayout> */}
    </main>
  )
}
