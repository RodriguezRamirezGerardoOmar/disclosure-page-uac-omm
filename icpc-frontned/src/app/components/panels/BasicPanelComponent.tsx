import cn from 'classnames'
interface IBasicPanelComponentProps {
    children: React.ReactNode;
    backgroundColor?: string;
}

/*
Input: a set of children and a TailwindCSS string
Output: a panel to embed children with a background color
Return value: a panel component with a background color and children
Function: creates a panel to insert different items
Variables: children, backgroundColor, classes
Date: 11 - 04 - 2024
Author: Gerardo Omar Rodriguez Ramirez
*/

export const BasicPanelComponent = ({children, backgroundColor = 'bg-white'}: IBasicPanelComponentProps) => {
  const classes = cn(`overflow-hidden rounded-lg shadow`, backgroundColor )
  return (
    <div className={classes}>
      <div className="px-4 py-5 sm:p-6">{children}</div>
    </div>
  )
}
