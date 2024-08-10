import React, { useState, useEffect } from "react";
import { Table, Button, message, Form } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import UserForm from "./components/UserForm";
import './App.css';

const App: React.FC = () => {
  const [users, setUsers] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);

  interface User {
    id: number;
    title: string;
    author: string;
    description: string;
  }

  const [editingRecord, setEditingRecord] = useState<User | null>(null);
  const [addUser, setAddUser] = useState(false);
  const [form] = Form.useForm();

  const BASE_URL = "http://localhost:5298/api/books"; 

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const response = await fetch(BASE_URL);
    const data = await response.json();
    setUsers(data);
  };

  const onDeleteUser = async (record: User) => {
    try {
      await fetch(`${BASE_URL}/${record.id}`, {
        method: "DELETE",
      });
      message.success("Book deleted successfully!");
      fetchBooks();
    } catch (error) {
      console.error("Failed to delete book:", error);
      message.error("Failed to delete book. Please try again.");
    }
  };

  const onUpdateUser = (record: User) => {
    setIsUpdating(true);
    setEditingRecord(record);
    form.setFieldsValue(record);
  };

  const handleAddUser = async (values: User) => {
    try {
      await fetch(BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      message.success("Book added successfully!");
      setAddUser(false);
      fetchBooks();
    } catch (error) {
      console.error("Failed to add book:", error);
      message.error("Failed to add book. Please try again.");
    }
  };

  const handleUpdate = async (values: User) => {
    if (!editingRecord) return;

    try {
      const response = await fetch(`${BASE_URL}/${editingRecord.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...editingRecord, 
          ...values,       
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      message.success("Book updated successfully!");
      setIsUpdating(false);
      fetchBooks(); 
    } catch (error) {
      console.error("Failed to update book:", error);
      message.error("Failed to update book. Please try again.");
    }
  };

  const onAddUser = () => {
    setAddUser(true);
    form.resetFields();
  };

  const columns = [
    {
      key: "title",
      dataIndex: "title",
      title: "Book Title",
    },
    {
      key: "author",
      dataIndex: "author",
      title: "Author",
    },
    {
      key: "description",
      dataIndex: "description",
      title: "Description",
    },
    {
      key: "action",
      title: "Action",
      render: (record: User) => (
        <>
          <EditOutlined
            onClick={() => onUpdateUser(record)}
            style={{ cursor: "pointer" }}
          />
          <DeleteOutlined
            onClick={() => onDeleteUser(record)}
            style={{ color: "red", marginLeft: 24, cursor: "pointer" }}
          />
        </>
      ),
    },
  ];

  return (
    <div>
      <div className="mb-6 bg-white font-bold text-[#105cd7] shadow-md flex justify-center p-4 rounded-lg">
        <h1 className="text-[24px]">Library Management System</h1>
      </div>
      <Button onClick={onAddUser} type="primary" className="mb-4 flex">
        Add New Book
      </Button>
      <Table dataSource={users} columns={columns} rowKey="id" />
      <UserForm
        visible={addUser}
        onCancel={() => setAddUser(false)}
        onOk={form.submit}
        form={form}
        title="Add new Book"
        okText="Add Book"
        onFinish={handleAddUser}
      />
      <UserForm
        visible={isUpdating}
        onCancel={() => setIsUpdating(false)}
        onOk={form.submit}
        form={form}
        title="Edit Book Details"
        okText="Update"
        onFinish={handleUpdate}
      />
    </div>
  );
};

export default App;
