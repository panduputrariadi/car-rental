import React from 'react'

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='bg-primary-foreground container grid h-svh max-w-none items-center justify-center'>      
        {children}      
    </div>
  )
}