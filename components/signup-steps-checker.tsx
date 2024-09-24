"use client"
import { useAppSelector } from '@/hooks/app'
import { signUpFirstStepSchema } from '@/schemas/auth.schema'
import { usePathname, useRouter } from 'next/navigation'
import { ReactNode, useEffect } from 'react'

const SignUpStepsChecker = ({children}: {children:ReactNode}) => {
    const registerStepsData = useAppSelector((state) => state.registerStepsReducer)
    const router = useRouter()
    const pathname = usePathname()
    useEffect(() => {
        if (registerStepsData.currentStep !== 1) {
          if (!signUpFirstStepSchema.safeParse(registerStepsData).success) {
            router.replace("/signup/1")
          }
        }
    },[pathname,registerStepsData,router])
  return (
    children
  )
}

export default SignUpStepsChecker