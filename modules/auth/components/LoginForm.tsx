import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'

export default function LoginForm() {
  const [form, setForm] = useState({ username: '', password: '' })
  const { login, loginState } = useAuth()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await login(form)
  }

  return (
    <Card className="max-w-sm mx-auto mt-20">
      <CardHeader>
        <CardTitle>Admin Login</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="username">Username</Label>
            <Input name="username" value={form.username} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input name="password" type="password" value={form.password} onChange={handleChange} />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={loginState.isLoading}>
            Login
          </Button>
          {loginState.error && <span className="text-red-500 ml-4">{String(loginState.error)}</span>}
        </CardFooter>
      </form>
    </Card>
  )
}