import React, { useEffect, useState } from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import { CiEdit } from "react-icons/ci";
import ChangeButton from "../../common/button/changeButton";
import { FaRegCalendarAlt } from "react-icons/fa";
import SubmitButton from "../../common/button/submitButton";
import OutlinedButton from "../../common/button/outlinedButton";

// Sample Data
const orders = [
  { id: "123456", name: "John Doe", phone: "+1 234 567 890", address: "123 Main St, Palakkad", status: "total" }
];

const products = [
  { productId: "P001", name: "Milk", quantity: 2 },
  { productId: "P002", name: "Bread", quantity: 1 },
  { productId: "P003", name: "Eggs", quantity: 12 },
  { productId: "P004", name: "Butter", quantity: 1 },
  { productId: "P005", name: "Cheese", quantity: 3 }
];

export default function Index() {
  const [filter, setFilter] = useState("total");
  const [filteredOrders, setFilteredOrders] = useState([]);

  useEffect(() => {
    const filteredOrders = orders.filter((order) => order.status === filter);
    setFilteredOrders(filteredOrders);
  }, [filter]);

  return (
    <Container className="mt-4">
      {/* Filter Buttons */}

      {/* Orders Display */}
      <Row className="g-3">

        {filteredOrders.map((order) => (
          <>

            <Col xs={12} md={12} key={order.id}>
              {filter === "total" && <ViewOrderDeliveredCard order={order} />}
            </Col>
          </>
        ))}
       
      </Row>


    </Container>
  );
}

// Total Orders Card
function ViewOrderDeliveredCard({ order }) {
  return (
    <div >

    <div className="py-4 px-3 border rounded shadow-sm" style={{ minHeight: "70%", width: "82vW", display: "flex", flexDirection: "column" }}>
      <div style={{ display: 'flex', justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontWeight: 700, fontSize: "20px" }}>{order.name}</div>
        <div style={{ color: '#229C47', fontWeight: 500 }}>  {order.id}</div>
      </div>
      <div style={{ color: "#1E4FCB", fontWeight: 500, display: "flex", paddingTop: 10 }}> {order.phone}</div>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", paddingTop: 10, alignItems: "flex-start" }}>
        <div style={{ fontWeight: 500, display: "flex", justifyContent: "flex-start" }} >{order.address}</div>
        
      </div>
      <hr />

      <div style={{ paddingTop: 10 }}>
        <div style={{ display: 'flex', justifyContent: "flex-end", alignItems: "center", fontWeight: 500, color: "#229C47", gap: 6 }}>
          <CiEdit style={{ paddingRight: 2 }} size={20} />
          <span className="">
            Edit
          </span>

        </div>
      </div>


      <div style={{ paddingTop: 2 }}>

        {
          products?.map((item, index) => (<>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: "center", fontWeight: 500, gap: 12 }}>
              <div style={{paddingTop:10}}> {item.name}</div>
              <div>{item.quantity}</div>
            </div>
          </>))


}
      </div>
      <hr />

      <h6 style={{color:"#5B5B5B",textAlign:"left",fontWeight:500,paddingBottom:2}}>
  payment method
</h6>

      <div style={{ display:"flex",flexDirection:"column",gap:12,fontWeight:500}}>
<div style={{display:"flex",justifyContent:"space-between"}}>
              <span> paid by</span>
              <span style={{color:"#229C47"}}> Credit</span>
</div>
<div style={{display:"flex",justifyContent:"space-between"}}>
              <div> Credit withdrew</div>
              <div> -2500</div>
</div>
<div style={{display:"flex",justifyContent:"space-between"}}>
              <div> Credit balance by</div>
              <div> -2500</div>
</div>
            
            
            
            </div>

      <hr />

      <div style={{display:'flex',justifyContent:"space-between",alignItems:"center"}}>
          <div style={{display:"flex",justifyContent:'center',alignItems:"center" }}>
          <img style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            objectFit: "cover",
            marginRight: "15px",
          }} src={'https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D'} />

          <div>

            <div style={{ fontWeight: 500, fontSize: "18px",textAlign:"left" }}>
              dave
            </div>
            <div style={{ color: '#229C47', fontWeight: 500 }}>
              Delivery man
            </div>
          </div>
        </div>

        <div style={{color:"#FF9215",fontWeight:500}}>
Pending
        </div>


      </div>


    </div>
    <div style={{paddingTop:10,display:"flex",alignItems:"center", justifyContent:"flex-end",width:"100%"}}>
    </div>
    
      
          </div>
  );
}

