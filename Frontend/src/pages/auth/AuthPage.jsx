import CommonForm from '@/components/common-form/CommonForm'
import { signInFormControls, signUpFormControls } from '@/config/Config'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AuthContext } from '@/context/auth-context/AuthContext'
import { GraduationCap } from 'lucide-react'
import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

function AuthPage() {
  const [activeTab, setActiveTab] = useState('signin')
  const {
    signInFormData,
    setSignInFormData,
    signUpFormData,
    setSignUpFormData,
    handleRegisterUser,
    handleLoginUser
  } = useContext(AuthContext)

  function handleTabChange(value) 
  {
    setActiveTab(value)
  }

  function checkSignInValue() {
    return (
      signInFormData && 
      signInFormData.userEmail != '' && 
      signInFormData.password != ''
    )
  }

  function checkSignUpValue() {
    return (
      signUpFormData &&
      signUpFormData.userName != '' &&
      signUpFormData.userEmail != '' &&
      signUpFormData.password != ''
    )
  }

  console.log({toast})
  toast.info("You Can Try Demo Admin Account Email: admin@gmail.com Password: admin123")
  toast.info("Login With Student Account For Student Page")

  // console.log(signInFormData)

  return (
    <div className='flex flex-col min-h-screen'>
      <header className='px-4 lg:px-6 h-14 flex items-center border-b'>
        <Link to={"/"} className='flex items-center justify-center hover:text-black'>
          <GraduationCap className='h-8 w-8 mr-4'/>
          <span className='font-extrabold text-xl'>Online Learning Platform</span>
        </Link>
      </header>
      <div className='flex items-center justify-center min-h-screen bg-background'>
        <Tabs
        value={activeTab}
        defaultValue='signin'
        onValueChange={handleTabChange}
        className='w-full max-w-md'
        >
          <TabsList className='grid w-full grid-cols-2'>
            <TabsTrigger value='signin'>Sign In</TabsTrigger>
            <TabsTrigger value='signup'>Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value='signin'>
            <Card className="p-6 space-y-4">
              <CardHeader>
                <CardTitle>Sign In To Your Account</CardTitle>
                <CardDescription>
                  Enter Your Email And Password To Access Your Account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <CommonForm
                formControls={signInFormControls}
                buttonText={'Sign In'}
                formData={signInFormData}
                setFormData={setSignInFormData}
                isDisabled={!checkSignInValue()}
                handleSubmit={handleLoginUser}
                />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value='signup'>
            <Card className="p-6 space-y-4">
              <CardHeader>
                <CardTitle>Create A New Account</CardTitle>
                <CardDescription>
                  Enter Your Details To Get Started
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CommonForm
                formControls={signUpFormControls}
                buttonText={'Sign Up'}
                formData={signUpFormData}
                setFormData={setSignUpFormData}
                isDisabled={!checkSignUpValue()}
                handleSubmit={handleRegisterUser}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default AuthPage
