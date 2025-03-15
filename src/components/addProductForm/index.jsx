import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { FaUpload } from "react-icons/fa";
import SubmitButton from "../../common/button/submitButton";

export default function Index() {
  const [selectedFile, setSelectedFile] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file.name);
    }
  };

  const onSubmit = (data) => {
    console.log("Saved Data:", { ...data, photo: selectedFile });
  };

  return (
    <Container fluid className="mt-4">
      <div style={{ padding: "20px", border: "1px solid grey", borderRadius: "12px" }}>
        <h4 style={{ textAlign: "left" }}>Please fill the product details</h4>
        <p style={{ textAlign: "left" }}>Enter the details to add a product</p>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row className="mb-3 g-4" >

            <Col md={6}>
              <Form.Group>
                <Form.Label className="text-start d-block"> Name *</Form.Label>
                <Form.Control type="text" placeholder="Enter a product name" {...register("name", { required: "Name is required" })} />
                {errors.name && <p className="text-danger">{errors.name.message}</p>}
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label className="text-start d-block">Quantity *</Form.Label>
                <Form.Control type="number" placeholder="Enter quantity" {...register("quantity", { required: "quantity is required" })} />
                {errors.quantity && <p className="text-danger">{errors.quantity.message}</p>}
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label className="text-start d-block">Product weight *</Form.Label>
                <Form.Control type="number" placeholder="Enter product weight" {...register("productweight", { required: "product weight is required" })} />
                {errors.productweight && <p className="text-danger">{errors.productweight.message}</p>}
              </Form.Group>
            </Col>

            <Col xs={12} md={6} >
              <Form.Group>
                <Form.Label className="text-start d-block">Upload Image *</Form.Label>
                <div style={{display:"flex"}}>
                  <input
                    type="file"
                    accept="image/*"
                    id="upload"
                    style={{ display: "none" }}
                    {...register("photo", { required: "Image is required" })}
                    onChange={handleFileChange}
                  />

                  <Button variant="light" className="w-50" onClick={() => document.getElementById("upload").click()}>
                    <FaUpload className="me-2" /> Upload img
                  </Button>
                  {selectedFile && <p className="mt-2"> {selectedFile}</p>}
                  {errors.photo && <p className="text-danger">{errors.photo.message}</p>}
                </div>
              </Form.Group>
            </Col>

          </Row>
<div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '32px' }}>
                        <SubmitButton title={"Add product"} handleSubmit={handleSubmit(onSubmit)} />
                    </div>
        </Form>
      </div>
    </Container>
  );
}
