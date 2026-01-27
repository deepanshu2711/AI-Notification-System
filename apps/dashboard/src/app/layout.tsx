import { Main } from '@/components/elements/main'
import { GitHubIcon } from '@/components/icons/social/github-icon'
import { XIcon } from '@/components/icons/social/x-icon'
import { YouTubeIcon } from '@/components/icons/social/youtube-icon'
import {
  FooterCategory,
  FooterLink,
  FooterWithNewsletterFormCategoriesAndSocialIcons,
  NewsletterForm,
  SocialLink,
} from '@/components/sections/footer-with-newsletter-form-categories-and-social-icons'
import { Providers } from '@/providers'
import { auth, AuthProvider } from '@myauth/next'
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Oatmeal Kit Demo',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <>
          <Providers>
            {/* @ts-expect-error type error */}
            <AuthProvider initialSession={session} clientId={process.env.NEXT_PUBLIC_CLIENT_ID!}>
              <Main>{children}</Main>
            </AuthProvider>
          </Providers>

          <FooterWithNewsletterFormCategoriesAndSocialIcons
            id="footer"
            cta={
              <NewsletterForm
                headline="Stay in the loop"
                subheadline={
                  <p>
                    Get customer support tips, product updates and customer stories that you can archive as soon as they
                    arrive.
                  </p>
                }
                action="#"
              />
            }
            links={
              <>
                <FooterCategory title="Product">
                  <FooterLink href="#">Features</FooterLink>
                  <FooterLink href="#">Pricing</FooterLink>
                  <FooterLink href="#">Integrations</FooterLink>
                </FooterCategory>
                <FooterCategory title="Company">
                  <FooterLink href="#">About</FooterLink>
                  <FooterLink href="#">Careers</FooterLink>
                  <FooterLink href="#">Blog</FooterLink>
                  <FooterLink href="#">Press Kit</FooterLink>
                </FooterCategory>
                <FooterCategory title="Resources">
                  <FooterLink href="#">Help Center</FooterLink>
                  <FooterLink href="#">API Docs</FooterLink>
                  <FooterLink href="#">Status</FooterLink>
                  <FooterLink href="#">Contact</FooterLink>
                </FooterCategory>
                <FooterCategory title="Legal">
                  <FooterLink href="/privacy-policy">Privacy Policy</FooterLink>
                  <FooterLink href="#">Terms of Service</FooterLink>
                  <FooterLink href="#">Security</FooterLink>
                </FooterCategory>
              </>
            }
            fineprint="© 2025 Oatmeal, Inc."
            socialLinks={
              <>
                <SocialLink href="https://x.com" name="X">
                  <XIcon />
                </SocialLink>
                <SocialLink href="https://github.com" name="GitHub">
                  <GitHubIcon />
                </SocialLink>
                <SocialLink href="https://www.youtube.com" name="YouTube">
                  <YouTubeIcon />
                </SocialLink>
              </>
            }
          />
        </>
      </body>
    </html>
  )
}
