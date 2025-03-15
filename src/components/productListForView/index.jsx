// import React, { useState } from "react";
// import { Card, Container, Form, InputGroup, Row, Col } from "react-bootstrap";
// import SubmitButton from "../../common/button/submitButton";
// import { motion } from "framer-motion";

// // Dummy Data Array
// const products = [
//   { name: "sample", weight: "220 g", quantity: 5, photo: "https://cdn.firstcry.com/education/2022/11/07145239/Dairy-Product-List-For-Kids-with-their-Benefits-And-Facts.jpg" },
//   { name: "sample", weight: "300 g", quantity: 2, photo: "https://cdn.firstcry.com/education/2022/11/07145239/Dairy-Product-List-For-Kids-with-their-Benefits-And-Facts.jpg" },
//   { name: "sample", weight: "500 g", quantity: 0, photo: "https://cdn.firstcry.com/education/2022/11/07145239/Dairy-Product-List-For-Kids-with-their-Benefits-And-Facts.jpg" },
//   { name: "sample", weight: "1.5 kg", quantity: 10, photo: "https://cdn.firstcry.com/education/2022/11/07145239/Dairy-Product-List-For-Kids-with-their-Benefits-And-Facts.jpg" },
// ];

// export default function Index() {
//   const [searchQuery, setSearchQuery] = useState("");

//   // Filter products based on searchQuery
//   const filteredProducts = products.filter((product) =>
//     product.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <Container fluid className="mt-4">
//       {/* Search Bar */}
//       <InputGroup className="mb-3" style={{ maxWidth: "30%" }}>
//         <Form.Control
//           type="text"
//           placeholder="Search stocks..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           style={{ borderRadius: "8px" }}
//         />
//       </InputGroup>

//       {/* Product Grid */}
//       <Row className="g-5 p-2">
//         {filteredProducts.length > 0 ? (
//           filteredProducts.map((product, index) => (
//             <Col xs={12} sm={6} md={3} key={index}>
//               <ProductCard product={product} />
//             </Col>
//           ))
//         ) : (
//           <p style={{ textAlign: "center", width: "100%" }}>No products found</p>
//         )}
//       </Row>

//       {/* Floating Continue Button with Motion Effect */}
    
//     </Container>
//   );
// }

// // Product Card Component with Framer Motion
// function ProductCard({ product }) {
//   const isOutOfStock = product.quantity === 0;
//   const borderColor = isOutOfStock ? "red" : "#229C47";

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//     >
//       <Card
//         style={{
//           borderRadius: "12px",
//           position: "relative",
//           boxShadow: "0px 4px 8px #00000040",
//           minHeight: "250px",
//           maxHeight: "400px",
//           border: `2px solid ${borderColor}`, // Dynamic border color
//         }}
//       >
//         <div className="d-flex align-items-center justify-content-center p-3 position-relative">
//           <img
//             src={product.photo}
//             alt={product.name}
//             style={{
//               width: "180px",
//               height: "150px",
//               borderRadius: "5%",
//               objectFit: "cover",
//             }}
//           />

//           {/* Show "Out of Stock" banner if quantity is 0 */}
//           {isOutOfStock && (
//             <div
//               style={{
//                 position: "absolute",
//                 top: "50%",
//                 left: "50%",
//                 transform: "translate(-50%, -50%)",
//                 background: "rgba(255, 255, 255, 0.9)",
//                 color: "red",
//                 fontWeight: "bold",
//                 fontSize: "16px",
//                 padding: "5px 15px",
//                 borderRadius: "5px",
//                 textAlign: "center",
//               }}
//             >
//               Out Of Stock
//             </div>
//           )}
//         </div>

//         <div className="px-3 pb-3">
//           <div style={{ fontWeight: 500, fontSize: "18px", display: "flex" }}>{product?.name}</div>
//           <div className="pt-1">
//             <div className="d-flex justify-content-between">
//               <span style={{ fontWeight: 500, fontSize: "14px", color: "#5B5B5B" }}>
//                 {product?.weight}
//               </span>
//               <span style={{ fontWeight: 500, fontSize: "14px" }}>Price</span>
//             </div>
//           </div>
//         </div>
//       </Card>
//     </motion.div>
//   );
// }





import React, { useEffect, useState } from "react";
import { Card, Container, Form, InputGroup, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import axios from "axios";
import Searchbar from "../../common/searchbar";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://deliveryapi.praathee.in:3000/api/v1/product/getProduct");
        setProducts(response.data.data);
      } catch (err) {
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.productname.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <p>Loading products...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <Container fluid className="mt-4">
<div className="d-flex justify-content-end mt-4">
<Searchbar searchQuery={searchQuery} handleChange={(e) => setSearchQuery(e.target.value)} /></div>


      <Row className="g-5 p-2">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            <Col xs={12} sm={6} md={3} key={product.productid || index}>
              <ProductCard product={product} />
            </Col>
          ))
        ) : (
          <p style={{ textAlign: "center", width: "100%" }}>No products found</p>
        )}
      </Row>
    
    </Container>
  );
}

function ProductCard({ product }) {
  const isOutOfStock = product.availablequantity === 0;
  const borderColor = isOutOfStock ? "red" : "#229C47";
  const productImage = product.imageBase64 || "https://via.placeholder.com/180";

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card
        style={{
          borderRadius: "12px",
          position: "relative",
          boxShadow: "0px 4px 8px #00000040",
          minHeight: "250px",
          maxHeight: "400px",
          border: `2px solid ${borderColor}`,
        }}
      >
        <div className="d-flex align-items-center justify-content-center p-3 position-relative">
          <img
            src={productImage}
            alt={product.productname}
            style={{ width: "180px", height: "150px", borderRadius: "5%", objectFit: "cover" }}
          />
          {isOutOfStock && (
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                background: "rgba(255, 255, 255, 0.9)",
                color: "red",
                fontWeight: "bold",
                fontSize: "16px",
                padding: "5px 15px",
                borderRadius: "5px",
                textAlign: "center",
              }}
            >
              Out Of Stock
            </div>
          )}
        </div>
        <div className="px-3 pb-3">
          <div style={{ fontWeight: 500, fontSize: "18px" }}>{product.productname}</div>
          <div className="pt-1 d-flex justify-content-between">
            <span style={{ fontWeight: 500, fontSize: "14px", color: "#5B5B5B" }}>{product.productweight} kg</span>
            <span style={{ fontWeight: 500, fontSize: "14px" }}>${product.saleprice}</span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

