import { createClient } from './supabase/client'

export async function signInWithEmail(email: string, password: string) {
  const supabase = createClient()
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.trim(),
    password,
  })

  if (error) {
    throw error
  }

  return data
}

export async function signUpWithEmail(email: string, password: string, name: string) {
  const supabase = createClient()
  
  // fetch 에러 디버깅을 위해 콘솔 로그 추가
  console.log('Signing up with:', { email, url: process.env.NEXT_PUBLIC_SUPABASE_URL });

  const { data, error } = await supabase.auth.signUp({
    email: email.trim(),
    password,
  })

  if (error) {
    throw error
  }

  return data
}

export async function signOut() {
  const supabase = createClient()
  const { error } = await supabase.auth.signOut()

  if (error) {
    throw error
  }
}

export async function resetPassword(email: string) {
  const supabase = createClient()
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/auth/update-password`,
  })

  if (error) {
    throw error
  }
}

export async function updatePassword(password: string) {
  const supabase = createClient()
  const { error } = await supabase.auth.updateUser({
    password: password,
  })

  if (error) {
    throw error
  }
}
