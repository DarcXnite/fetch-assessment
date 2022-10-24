import { useEffect, useState } from 'react'
import axios from 'axios'

interface dataParams {
  occupations: string[]
  states: any[]
}

export default function useAxios(url: string) {
  const [data, setData] = useState<dataParams>()
  const [status, setStatus] = useState<number>()
  useEffect(() => {
    const controller = new AbortController()
    const fetchData = async (url: string) => {
      try {
        const res = await axios.get(url)
        setData(res.data)
        setStatus(res.status)
      } catch (err) {
        console.warn(err)
      }
    }

    fetchData(url)
    return () => controller.abort()
  }, [url])

  return { data, status }
}
