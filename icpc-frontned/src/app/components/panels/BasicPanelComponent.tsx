import cn from 'classnames'
interface IBasicPanelComponentProps {
    children: React.ReactNode;
    backgroundColor?: string;
}

export const BasicPanelComponent = ({children, backgroundColor = 'bg-white'}: IBasicPanelComponentProps) => {
  const classes = cn(`overflow-hidden rounded-lg shadow`, backgroundColor )
  return (
    <div className={classes}>
      <div className="px-4 py-5 sm:p-6">{children}</div>
    </div>
  )
}
