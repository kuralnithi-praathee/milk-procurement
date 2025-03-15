// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { Container, Form, Row, Col, Button } from "react-bootstrap";
// import { FaUpload } from "react-icons/fa";
// import SubmitButton from "../../common/button/submitButton";

// export default function Index() {
//   const [selectedFile, setSelectedFile] = useState("");

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setSelectedFile(file.name);
//     }
//   };

//   const onSubmit = (data) => {
//     console.log("Saved Data:", { ...data, photo: selectedFile });
//   };

//   return (
//     <Container fluid className="mt-4">
//       <div style={{ padding: "20px", border: "1px solid grey", borderRadius: "12px" }}>
//         <h4 style={{ textAlign: "left" }}>Please fill the product details</h4>
//         <p style={{ textAlign: "left" }}>Enter the details to add a product</p>

//         <Form onSubmit={handleSubmit(onSubmit)}>
//           <Row className="mb-3 g-4" >

//             <Col md={6}>
//               <Form.Group>
//                 <Form.Label className="text-start d-block"> Name *</Form.Label>
//                 <Form.Control type="text" placeholder="Enter a product name" {...register("name", { required: "Name is required" })} />
//                 {errors.name && <p className="text-danger">{errors.name.message}</p>}
//               </Form.Group>
//             </Col>

//             <Col md={6}>
//               <Form.Group>
//                 <Form.Label className="text-start d-block">Quantity *</Form.Label>
//                 <Form.Control type="number" placeholder="Enter quantity" {...register("quantity", { required: "quantity is required" })} />
//                 {errors.quantity && <p className="text-danger">{errors.quantity.message}</p>}
//               </Form.Group>
//             </Col>

//             <Col md={6}>
//               <Form.Group>
//                 <Form.Label className="text-start d-block">Product weight *</Form.Label>
//                 <Form.Control type="number" placeholder="Enter product weight" {...register("productweight", { required: "product weight is required" })} />
//                 {errors.productweight && <p className="text-danger">{errors.productweight.message}</p>}
//               </Form.Group>
//             </Col>

//             <Col xs={12} md={6} >
//               <Form.Group>
//                 <Form.Label className="text-start d-block">Upload Image *</Form.Label>
//                 <div style={{display:"flex"}}>
//                   <input
//                     type="file"
//                     accept="image/*"
//                     id="upload"
//                     style={{ display: "none" }}
//                     {...register("photo", { required: "Image is required" })}
//                     onChange={handleFileChange}
//                   />

//                   <Button variant="light" className="w-50" onClick={() => document.getElementById("upload").click()}>
//                     <FaUpload className="me-2" /> Upload img
//                   </Button>
//                   {selectedFile && <p className="mt-2"> {selectedFile}</p>}
//                   {errors.photo && <p className="text-danger">{errors.photo.message}</p>}
//                 </div>
//               </Form.Group>
//             </Col>

//           </Row>
// <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '32px' }}>
//                         <SubmitButton title={"Add product"} handleSubmit={handleSubmit(onSubmit)} />
//                     </div>
//         </Form>
//       </div>
//     </Container>
//   );
// }
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { FaUpload } from "react-icons/fa";
import SubmitButton from "../../common/button/submitButton";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function ProductForm() {
  const [selectedFile, setSelectedFile] = useState(null);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const onSubmit = async (data) => {
    console.log(data,"data")
    const formData = new FormData();
    formData.append("categoryid", data.categoryid);
    formData.append("productname", data.productname);
    formData.append("productimage", selectedFile);
    formData.append("measurementunitid", data.measurementunitid);
    formData.append("availablequantity", data.availablequantity);
    formData.append("productweight", data.productweight);
    formData.append("status", data.status);
    formData.append("price", data.price);
    formData.append("saleprice", data.saleprice);
    formData.append("discountprice", data.discountprice);
    formData.append("taxid", data.taxid);
    formData.append("productdescription", data.productdescription);
    formData.append("inwardby", data.inwardby);

    try {
      const response = await axios.post(
        "http://deliveryapi.praathee.in:3000/api/v1/product/addProduct",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      
      if (response.status === 200) {
        toast.success("Product Added Successfully");
        reset();
        setSelectedFile(null);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to add product");
    }
  };

  return (
    <Container fluid className="mt-4">
      <div style={{ padding: "20px", border: "1px solid grey", borderRadius: "12px" }}>
        <h4 style={{ textAlign: "left" }}>Please fill the product details</h4>
        <p style={{ textAlign: "left" }}>Enter the details to add a product</p>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row className="mb-3 g-4">
            {[  
              { label: "Category ID", name: "categoryid", type: "number" },
              { label: "Product Name", name: "productname", type: "text" },
              { label: "Measurement Unit ID", name: "measurementunitid", type: "number" },
              { label: "Available Quantity", name: "availablequantity", type: "number" },
              { label: "Product Weight", name: "productweight", type: "number" },
              { label: "Status", name: "status", type: "number" },
              { label: "Price", name: "price", type: "number" },
              { label: "Sale Price", name: "saleprice", type: "number" },
              { label: "Discount Price", name: "discountprice", type: "number" },
              { label: "Tax ID", name: "taxid", type: "number" },
              { label: "Inward By", name: "inwardby", type: "number" },
            ].map((field, index) => (
              <Col md={6} key={index}>
                <Form.Group>
                  <Form.Label className="text-start d-block">{field.label} *</Form.Label>
                  <Form.Control 
                    type={field.type} 
                    placeholder={`Enter ${field.label.toLowerCase()}`} 
                    {...register(field.name, { required: `${field.label} is required` })} 
                    style={{ borderColor: errors[field.name] ? "red" : "#ced4da" }}
                  />
                  {errors[field.name] && <p className="text-danger mt-1 mb-0 text-start" style={{ fontSize: "0.875rem" }}>{errors[field.name].message}</p>}
                </Form.Group>
              </Col>
            ))}
            
            <Col md={12}>
              <Form.Group>
                <Form.Label className="text-start d-block">Product Description *</Form.Label>
                <Form.Control 
                  as="textarea" 
                  rows={3} 
                  placeholder="Enter product description" 
                  {...register("productdescription", { required: "Product description is required" })} 
                  style={{ borderColor: errors.productdescription ? "red" : "#ced4da" }}
                />
                {errors.productdescription && <p className="text-danger mt-1 mb-0 text-start" style={{ fontSize: "0.875rem" }}>{errors.productdescription.message}</p>}
              </Form.Group>
            </Col>

            <Col md={12}>
              <Form.Group>
                <Form.Label className="text-start d-block">Upload Image *</Form.Label>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <input
                    type="file"
                    accept="image/*"
                    id="upload"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                  <Button variant="light" onClick={() => document.getElementById("upload").click()}>
                    <FaUpload className="me-2" /> Upload Image
                  </Button>
                  {selectedFile && <p>{selectedFile.name}</p>}
                </div>
              </Form.Group>
            </Col>
          </Row>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "32px" }}>
            <SubmitButton title="Add Product" handleSubmit={handleSubmit(onSubmit)} />
          </div>
        </Form>
      </div>
    </Container>
  );
}
