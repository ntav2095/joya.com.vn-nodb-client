import React, { useState } from "react";
import { Collapse } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import QuillReader from "../../../../components/QuillReader";

import styles from "./VisaDetail.module.css";
import "./VisaDetail.override.css";

function VisaDetail({ product }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <button className={styles.toggleBtn} onClick={toggle}>
        {isOpen ? "Thu gọn" : "Xem chi tiết"}
      </button>

      <Collapse in={isOpen}>
        <div className="VisaDetail">
          <Tab.Container defaultActiveKey="detail">
            <Row>
              <Col sm={3}>
                <Nav variant="pills" className="flex-column">
                  <Nav.Item>
                    <Nav.Link eventKey="detail">
                      Chi tiết phiếu dịch vụ
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="price_includes">Giá bao gồm</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="price_excludes">
                      Giá không bao gồm
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="price_other">
                      Trẻ em và phụ thu
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="registration_policy">
                      Điều kiện đăng ký
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="cancellation_policy">
                      Điều kiện hoàn hủy
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="payment_policy">
                      Phương thức thanh toán
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col sm={9}>
                <Tab.Content>
                  <Tab.Pane eventKey="detail">
                    <div className="bg-light border p-2 rounded h-100 w-100">
                      <QuillReader delta={product.detail} />
                    </div>
                  </Tab.Pane>
                  <Tab.Pane eventKey="price_includes">
                    <div className="bg-light border p-2 rounded h-100 w-100">
                      <QuillReader delta={product.price_policies.includes} />
                    </div>
                  </Tab.Pane>
                  <Tab.Pane eventKey="price_excludes">
                    <div className="bg-light border p-2 rounded h-100 w-100">
                      <QuillReader delta={product.price_policies.excludes} />
                    </div>
                  </Tab.Pane>
                  <Tab.Pane eventKey="price_other">
                    <div className="bg-light border p-2 rounded h-100 w-100">
                      <QuillReader delta={product.price_policies.other} />
                    </div>
                  </Tab.Pane>
                  <Tab.Pane eventKey="registration_policy">
                    <div className="bg-light border p-2 rounded h-100 w-100">
                      <QuillReader delta={product.terms.registration} />
                    </div>
                  </Tab.Pane>
                  <Tab.Pane eventKey="cancellation_policy">
                    <div className="bg-light border p-2 rounded h-100 w-100">
                      <QuillReader delta={product.terms.cancellation} />
                    </div>
                  </Tab.Pane>
                  <Tab.Pane eventKey="payment_policy">
                    <div className="bg-light border p-2 rounded h-100 w-100">
                      <QuillReader delta={product.terms.payment} />
                    </div>
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </div>
      </Collapse>
    </>
  );
}

export default VisaDetail;
