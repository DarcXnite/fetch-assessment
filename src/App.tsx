import { useState } from 'react'
import './App.css'
import useAxios from './hooks/useAxios'
import axios from 'axios'

interface UserDetails {
  name: string
  email: string
  password: string
  occupation: string
  state: string
}

interface States {
  name: string
  abbreviations: string
}

const initialForm = {
  name: '',
  email: '',
  password: '',
  occupation: '',
  state: '',
}

function App() {
  const { data, status } = useAxios(
    'https://frontend-take-home.fetchrewards.com/form'
  )
  const [resStatus, setResStatus] = useState<number>()
  const [isFormValid, setIsFormValid] = useState<boolean>()
  const [displayMsg, setDisplayMsg] = useState<boolean>()
  const [details, setDetails] = useState<UserDetails>(initialForm)

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { name, email, password, occupation, state } = details

    if (!name || !email || !password || !occupation || !state) {
      console.log('no fields can be empty')
      setIsFormValid(false)
      setDisplayMsg(true)
      return
    }
    try {
      const res = await axios.post(
        'https://frontend-take-home.fetchrewards.com/form',
        details
      )
      setResStatus(res.status)
      setIsFormValid(true)
      setDisplayMsg(true)
    } catch (err) {
      console.warn(err)
    }
    setDetails(initialForm)
  }

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setDetails(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <>
      <div className='header'>
        <header>Fill out form</header>
        {displayMsg ? (
          isFormValid ? (
            <header className='valid'>
              Status: {resStatus}, Your form was successfully submitted.
            </header>
          ) : (
            <header className='invalid'>No fields can be empty!</header>
          )
        ) : null}
      </div>
      <div className='input-form'>
        <form action='submit' onSubmit={onSubmit} className='form'>
          <input
            type='text'
            placeholder='Name'
            value={details?.name}
            name='name'
            onChange={handleChange}
          />
          <input
            type='email'
            placeholder='Email'
            value={details?.email}
            name='email'
            onChange={handleChange}
          />
          <input
            type='password'
            placeholder='Password'
            value={details?.password}
            name='password'
            onChange={handleChange}
          />
          <label htmlFor='occupations'>Select an Occupation:</label>
          <select
            name='occupation'
            id='occupations'
            value={details?.occupation}
            onChange={handleChange}
          >
            <option value='' disabled selected>
              Select an Occupation
            </option>
            {data?.occupations.map((occ: string, idx: number) => (
              <option key={idx} value={occ}>
                {occ}
              </option>
            ))}
          </select>
          <label htmlFor='states'>Select a State:</label>
          <select
            name='state'
            id='states'
            value={details?.state}
            onChange={handleChange}
          >
            <option value='' disabled selected>
              Select a State
            </option>
            {data?.states.map((state: States, idx: number) => {
              const { name } = state
              return (
                <option key={idx} value={name}>
                  {name}
                </option>
              )
            })}
          </select>
          <button>Submit</button>
        </form>
      </div>
    </>
  )
}

export default App
