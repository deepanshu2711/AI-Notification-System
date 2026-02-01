import * as Headless from '@headlessui/react'
import NextLink from 'next/link'
import React, { forwardRef } from 'react'

type LinkProps = {
  href: string
} & React.ComponentPropsWithoutRef<'a'>

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link({ href, ...props }, ref) {
  return (
    <Headless.DataInteractive>
      <NextLink href={href} passHref legacyBehavior>
        <a ref={ref} {...props} />
      </NextLink>
    </Headless.DataInteractive>
  )
})
