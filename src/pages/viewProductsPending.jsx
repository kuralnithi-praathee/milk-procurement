import React from 'react'
import Layout from '../layout/mainLayout'
import Sidebar from '../layout/sidebar'
import Header from '../layout/header'
import { MdKeyboardArrowDown } from 'react-icons/md'
import Index from '../components/viewProductPending/index'

export const ViewProductsPending = () => {
    const breadcrumbs = [
        {
          name: "Pending Orders",
          path: `/home`,
          font: "bold"
        },
        // {
        //   name: "Driver",
        //   path: `/admit-card-list`,
        // },
        {
          name: (
            <>
              {/* Sales <MdKeyboardArrowDown size = {16} /> */}
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
