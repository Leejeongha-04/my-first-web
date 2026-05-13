"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { signUpWithEmail } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function SignupPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      console.log("Submitting signup form...");
      await signUpWithEmail(email, password, name)
      setSuccess(true)
      // 3초 후 로그인 페이지로 이동
      setTimeout(() => {
        router.push("/login")
      }, 3000)
    } catch (err: any) {
      console.error("Signup error details:", err);
      setError(err.message || "회원가입 중 오류가 발생했습니다.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>회원가입</CardTitle>
          <CardDescription>새 계정을 생성하여 시작하세요.</CardDescription>
        </CardHeader>
        <CardContent>
          {success ? (
            <div className="space-y-4 text-center">
              <p className="text-sm font-medium text-green-600">
                가입 완료! 로그인 페이지로 이동합니다...
              </p>
              <Button onClick={() => router.push("/login")} className="w-full">
                로그인하러 가기
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">이름</label>
                <Input
                  id="name"
                  type="text"
                  placeholder="홍길동"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">이메일</label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">비밀번호</label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && (
                <p className="text-sm text-destructive font-medium">{error}</p>
              )}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "처리 중..." : "회원가입"}
              </Button>
            </form>
          )}
        </CardContent>
        {!success && (
          <CardFooter className="flex justify-center text-sm text-muted-foreground">
            <p>
              이미 계정이 있으신가요?{" "}
              <a href="/login" className="text-primary hover:underline">
                로그인
              </a>
            </p>
          </CardFooter>
        )}
      </Card>
    </main>
  )
}
