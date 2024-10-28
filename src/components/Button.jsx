

function IconBtn({ children, props }) {
  return (
    <button  {...props} className='inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background border border-muted hover:bg-accent hover:text-accent-foreground h-10 w-10'>{children}</button>
  )
}

export default IconBtn