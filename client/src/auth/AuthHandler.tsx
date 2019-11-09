import { useEffect } from "react"
import { useHistory } from "react-router-dom"

type Props = {
  onHandleAuthCallback: () => void
}

export default function AuthHandler({ onHandleAuthCallback }: Props) {
  const history = useHistory()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.has("code")) {
      onHandleAuthCallback()
      history.replace("/")
    }
  }, [history, onHandleAuthCallback])

  return null
}
