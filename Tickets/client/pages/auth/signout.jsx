import { useEffect } from 'react'
import useRequest from '../../hooks/use-request'
import { useRouter } from 'next/router'

export default function SignOut() {
  const router = useRouter();
  const { doRequest, errors } = useRequest({
    url: '/api/users/signout',
    method: 'post',
    body: {},
    onSuccess: () => router.push('/')
  })

  useEffect(()=>{
    doRequest();
  }, [])
}
