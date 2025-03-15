import React from 'react'
import Layout from '../layout/mainLayout'
import Sidebar from '../layout/sidebar'
import Header from '../layout/header'
import { MdKeyboardArrowDown } from 'react-icons/md'
import Index from '../components/viewProduct/index'

export const ViewProducts = () => {
    const breadcrumbs = [
        {
          name: "View products",
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
