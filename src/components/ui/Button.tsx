import { forwardRef } from 'react'

import { Link } from 'react-router-dom'



const buttonBaseClassName =

  'btn-interactive inline-flex min-h-11 items-center justify-center gap-2 border border-grid-border px-6 py-3 text-xs font-bold uppercase tracking-widest'



const buttonVariants = {

  primary: 'bg-cobalt text-white hover:bg-brand-navy',

  outline: 'bg-white text-ink hover:bg-accent hover:text-white',

  dark: 'bg-ink text-white hover:bg-brand-blue',

} as const



export const buttonClassName = `${buttonBaseClassName} ${buttonVariants.primary}`



type ButtonProps = {

  children: React.ReactNode

  to?: string

  href?: string

  onClick?: () => void

  type?: 'button' | 'submit'

  variant?: keyof typeof buttonVariants

  className?: string

}



export const Button = forwardRef<HTMLAnchorElement | HTMLButtonElement, ButtonProps>(

  function Button(

    { children, to, href, onClick, type = 'button', variant = 'primary', className = '' },

    ref,

  ) {

    const styles = `${buttonBaseClassName} ${buttonVariants[variant]} ${className}`.trim()



    if (to) {

      return (

        <Link to={to} className={styles} ref={ref as React.Ref<HTMLAnchorElement>}>

          {children}

        </Link>

      )

    }



    if (href) {

      return (

        <a

          href={href}

          target="_blank"

          rel="noopener noreferrer"

          className={styles}

          ref={ref as React.Ref<HTMLAnchorElement>}

        >

          {children}

        </a>

      )

    }



    return (

      <button

        type={type}

        onClick={onClick}

        className={styles}

        ref={ref as React.Ref<HTMLButtonElement>}

      >

        {children}

      </button>

    )

  },

)


