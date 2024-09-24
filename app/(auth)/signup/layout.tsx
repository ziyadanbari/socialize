import SignUpStepsChecker from "@/components/signup-steps-checker"
import { ReactNode } from "react"

const SignUpLayout = ({children}:{children: ReactNode}) => {
    return (
        <SignUpStepsChecker>
            {children}
        </SignUpStepsChecker>
    )
}

export default SignUpLayout