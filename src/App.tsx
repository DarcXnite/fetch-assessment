import { useState } from 'react'
import './App.css'
import useAxios from './hooks/useAxios'

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
  const [details, setDetails] = useState<UserDetails>(initialForm)

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(details)
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
    console.log(details)
  }

  return (
    <>
      <header>Status Code: {status}</header>
      <div className='input-form'>
        <form action='submit' onSubmit={e => onSubmit}>
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
