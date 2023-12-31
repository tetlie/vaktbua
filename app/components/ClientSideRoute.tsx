"use client"

import Link from 'next/link'
import React from 'react'

type Props = {
  children: React.ReactNode,
  route: string
}

const ClientSideRoute = ({children, route=""}: Props) => {
  return (
    <Link href={route}>{children}</Link>
  )
}

export default ClientSideRoute