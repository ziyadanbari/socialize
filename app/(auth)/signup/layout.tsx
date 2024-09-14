import SignUpStepsChecker from "@/components/SignUpStepsChecker"
import { ReactNode } from "react"

const SignUpLayout = ({children}:{children: ReactNode}) => {
    return (
        <SignUpStepsChecker>
            {children}
        </SignUpStepsChecker>
    )
}

export default SignUpLayout