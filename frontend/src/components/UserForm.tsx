import React from "react";
import { Modal, Input, Form } from "antd";

// Use Form component from antd to create a form for adding or updating a book record
interface UserFormProps {
  visible: boolean;
  onCancel: () => void;
  onOk: () => void;
  form: any;
  title: string;
  okText: string;
  onFinish: (values: any) => void;
}

const UserForm: React.FC<UserFormProps> = ({
  visible,
  onCancel,
  onOk,
  form,
  title,
  okText,
  onFinish,
}) => {
  return (
    <Modal title={title} okText={okText} visible={visible} onCancel={onCancel} onOk={onOk}>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="title"
          label="Book Title"
          rules={[{ required: true, message: "Please enter the book title" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="author"
          label="Author"
          rules={[{ required: true, message: "Please enter author name" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Please enter a description" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserForm;
