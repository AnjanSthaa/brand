import { useState } from 'react'
import { signup, login } from './api'

const Auth = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '' })
  const [isSignup, setIsSignup] = useState(true)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (isSignup) {
        await signup(form)
        alert('Signup successful!')
      } else {
        const { data } = await login(form)
        localStorage.setItem('token', data.token)
        alert('Login successful!')
      }
    } catch (err) {
      alert(err.response?.data?.message || 'An error occurred')
    }
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  return (
    <div>
      <h2>{isSignup ? 'Sign Up' : 'Log In'}</h2>
      <form onSubmit={handleSubmit}>
        {isSignup && (
          <input
            name='username'
            placeholder='Username'
            onChange={handleChange}
            required
          />
        )}
        <input
          name='email'
          placeholder='Email'
          onChange={handleChange}
          required
        />
        <input
          name='password'
          type='password'
          placeholder='Password'
          onChange={handleChange}
          required
        />
        <button type='submit'>{isSignup ? 'Sign Up' : 'Log In'}</button>
      </form>
      <button onClick={() => setIsSignup(!isSignup)}>
        Switch to {isSignup ? 'Login' : 'Sign Up'}
      </button>
    </div>
  )
}

export default Auth
