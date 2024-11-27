import { useState } from 'react'
/*
Input: a list of strings that define CSS classes
Output: a single string of Tailwind CSS
Return value: a string with the CSS classes
Function: joins multiple strings into a single string
Variables: classes
Date: 21 - 03 - 2024
Author: Gerardo Omar Rodriguez Ramirez
*/

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

/*
Input: a list of tabs with icon, href, name and a boolean to identify the currently selected tab
Output: a set of tabs to select different sections of a page
Return value: a set of tab buttons as a component
Function: creates a set of tab buttons to navigate through different sections of a page
Variables: icon, href, name, current
Date: 11 - 04 - 2024
Author: Gerardo Omar Rodriguez Ramirez
*/

// Update type annotation of the 'tabs' parameter
export default function TabComponent({
  myTabs,
  adminTabs,
  isAdmin,
  handleChange
}: Readonly<{
  readonly myTabs: ReadonlyArray<{
    //    icon: any
    href: string | undefined
    name: string
    current?: boolean
  }>
  readonly adminTabs: ReadonlyArray<{
    //   icon: any
    href: string | undefined
    name: string
    current?: boolean
  }>
  handleChange: (tabName: string) => void
  isAdmin: boolean
}>) {
  const tabs = myTabs.concat(adminTabs)
  const accountTab = tabs.find(tab => tab.name === 'Cuentas')
  const filteredAdminTabs = adminTabs.filter(tab => tab.name !== 'Cuentas')

  const [activeTab, setActiveTab] = useState(tabs.find(tab => tab.current)?.name)

  const handleTabChange = (tabName: string) => {
    setActiveTab(tabName)
  }

  return (
    <div>
      <div className='lg:hidden'>
        <label
          htmlFor='tabs'
          className='sr-only'>
          Select a tab
        </label>
        <select
          id='tabs'
          name='tabs'
          className='block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
          value={activeTab}
          onChange={e => handleTabChange(e.target.value)}>
          {isAdmin
            ? tabs.map(tab => (
                <option
                  key={tab.name}
                  value={tab.name}>
                  {tab.name}
                </option>
              ))
            : myTabs.map(tab => (
                <option
                  key={tab.name}
                  value={tab.name}>
                  {tab.name}
                </option>
              ))}
        </select>
      </div>
      <div className='hidden lg:block'>
        <div className='border-b border-gray-200'>
          <div className='flex flex-row gap-8'>
            <div
              className=' flex flex-row space-x-2'
              aria-label='Tabs'>
              {myTabs.map(tab => (
                <a
                  key={tab.name}
                  href={tab.href}
                  className={classNames(
                    tab.name === activeTab
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent dark:text-white hover:border-gray-300 hover:text-gray-700',
                    'group inline-flex items-center border-b-2 py-2 px-1 text-xs font-medium'
                  )}
                  onClick={e => {
                    e.preventDefault()
                    handleTabChange(tab.name)
                    handleChange(tab.name)
                  }}
                  aria-current={tab.name === activeTab ? 'page' : undefined}>
                  {/*<tab.icon
                  className={classNames(
                    tab.name === activeTab ? 'text-indigo-500' : 'text-gray-400 group-hover:text-gray-500',
                    '-ml-0.5 mr-2 h-5 w-5'
                  )}
                  aria-hidden='true'
                />*/}
                  <span>{tab.name}</span>
                </a>
              ))}
            </div>
            { isAdmin && <div
              className='bg-primary rounded-md flex flex-row space-x-2'
              aria-label='Tabs'>
              {filteredAdminTabs.map(tab => (
                <a
                  key={tab.name}
                  href={tab.href}
                  className={classNames(
                    tab.name === activeTab
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-white hover:border-gray-300 hover:text-gray-700',
                    `group inline-flex items-center border-b-2 py-2 px-1 text-xs font-medium`
                  )}
                  onClick={e => {
                    e.preventDefault()
                    handleTabChange(tab.name)
                    handleChange(tab.name)
                  }}
                  aria-current={tab.name === activeTab ? 'page' : undefined}>
                  {/*<tab.icon
                  className={classNames(
                    tab.name === activeTab ? 'text-indigo-500' : 'text-gray-400 group-hover:text-gray-500',
                    '-ml-0.5 mr-2 h-5 w-5'
                  )}
                  aria-hidden='true'
                />*/}
                  <span>{tab.name}</span>
                </a>
              ))}
            </div>}
            {isAdmin && <div
              className='bg-complementary rounded-md flex flex-row space-x-2'
              aria-label='Tabs'>
              {accountTab && (
                <a
                  href={accountTab.href}
                  className={classNames(
                    accountTab.name === activeTab
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-white hover:border-gray-300 hover:text-gray-700',
                    `group inline-flex items-center border-b-2 py-2 px-1 text-xs font-medium`
                  )}
                  onClick={e => {
                    e.preventDefault()
                    handleTabChange(accountTab.name)
                    handleChange(accountTab.name)
                  }}
                  aria-current={accountTab.name === activeTab ? 'page' : undefined}>
                  {/*<tab.icon
                  className={classNames(
                    tab.name === activeTab ? 'text-indigo-500' : 'text-gray-400 group-hover:text-gray-500',
                    '-ml-0.5 mr-2 h-5 w-5'
                  )}
                  aria-hidden='true'
                />*/}
                  <span>{accountTab.name}</span>
                </a>
              )}
            </div>}
          </div>
        </div>
      </div>
    </div>
  )
}
