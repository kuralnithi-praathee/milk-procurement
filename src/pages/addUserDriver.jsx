import React from 'react'
import Layout from '../layout/mainLayout'
import Sidebar from '../layout/sidebar'
import Header from '../layout/header'
import { MdKeyboardArrowDown } from 'react-icons/md'
import Index from '../components/addUserDriver'

export const AddUserDriver = () => {
    const breadcrumbs = [
        {
          name: "AddUser",
          path: `/add-user`,
          font:"bold"
        },
        // {
        //   name: "Driver",
        //   path: `/admit-card-list`,
        // },
        {
          name: (
            <>
              Driver <MdKeyboardArrowDown size = {16} />
            </>
          ),
          path: "#",
          active: true,
          font:""
        },
      ];
  
  
  return (
<>

<Layout>
<Header breadcrumbs={breadcrumbs} />
<Sidebar/>
<Index/>
</Layout>

</>
  )
}
