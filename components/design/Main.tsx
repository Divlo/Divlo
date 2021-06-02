import classNames from 'classnames'

export interface MainProps {
  className?: string
}

export const Main: React.FC<MainProps> = (props) => {
  const { children, className = '' } = props

  return (
    <main className={classNames('flex flex-1 flex-col', className)}>
      {children}
    </main>
  )
}
