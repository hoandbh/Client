
import { Amplify } from 'aws-amplify'

import { createContext, useContext, ReactNode } from 'react'


import SignIn from './SignIn'

import Wrapper from './Wrapper'

import awsConfig from './awsConfig'

import useAuthState, { UserContextType } from './useAuthState'


Amplify.configure(awsConfig)


export enum Role {

  Admin = 'ADMIN',

  Billing = 'BILLING',

  Therapy = 'THERAPY',

  CaseManager = 'CASE_MANAGER',

  BackendAdmin = 'BACKEND_ADMIN',

  FacilityAdmin = 'FACILITY_ADMIN',

  MDSCoordinator = 'MDS_COORDINATOR',

  BenefitsProvider = 'BENEFITS_PROVIDER',

  BusinessOfficeManager = 'BUSINESS_OFFICE_MANAGER'

}


export const UserContext = createContext < UserContextType | undefined > (undefined)


export const useUser = () => useContext(UserContext)


const AuthProvider = ({ children }: { children: ReactNode }) => {

  const {

    authState,

    currentUser,

    errorMessage,

    successMessage,

    setCurrentUser,

    setErrorMessage

  } = useAuthState()


  if (authState === 'NO_USER') {

    return (

      <Wrapper>

        {errorMessage && <div>{errorMessage}</div>}

        {successMessage && <div>{successMessage}</div>}

        <SignIn

          setCurrentUser={setCurrentUser}

          setErrorMessage={setErrorMessage}

        />

      </Wrapper>

    )

  }


  return (

    <UserContext.Provider value={currentUser}>{children}</UserContext.Provider>

  )

}


export default AuthProvider
