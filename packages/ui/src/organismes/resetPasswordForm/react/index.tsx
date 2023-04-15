import { ROUTES } from '@travel-tailor/constants'
import { AuthService } from '@travel-tailor/services'
import { ResetPasswordDTO } from '@travel-tailor/types'
import { ChangeEvent, FC, FormEvent, useState, useRouter } from '@travel-tailor/functions'

interface IProps {
  api_url: string
}

export const WebResetPasswordForm: FC<IProps> = ({ api_url }) => {
  const [credentials, setCredentials] = useState<ResetPasswordDTO>({
    password: '',
  })

  const [submitError, setSubmitError] = useState({});

  const router = useRouter()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCredentials({ ...credentials, [name]: value })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const resetTokenParam = router.query.resetToken;
    await AuthService.resetPassword(api_url, `${resetTokenParam}`, credentials, setSubmitError)
    router.push(ROUTES.AUTH.SIGNIN)
  }

  return (
    <form action="" onSubmit={handleSubmit}>
      <label htmlFor="">
        <span>Password</span>
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
        />
      </label>
      <input type="submit" value={'reset password'} />
    </form>
  )
}
