"use client"
import Todo from "@/components/todo";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  })

  const [todoData, setTodoData] = useState([]);

  const fetchTodos = async () => {
    const response = await axios('/api')
    setTodoData(response.data.todos)
  }

  const deleteTodo = async (id) => {
    const response = await axios.delete('/api', {
      params: {
        mongoId: id
      }
    })
    toast.success(response.data.msg)
    fetchTodos();
  }


  const completeTodo = async (id) => {
    const response = await axios.put('/api',{}, {
      params: {
        mongoId: id
      }
    })
    toast.success(response.data.msg)
    fetchTodos();
  }

  useEffect(() => {
    fetchTodos();
  }, [])

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;;
    setFormData(form => ({ ...form, [name]: value }));
  }

  const onSubmitHandle = async (e) => {
    e.preventDefault()
    try {
      // api code
      if((formData.title && formData.description) !== ""){
        const response = await axios.post('/api', formData)
        toast.success(response.data.msg)
        setFormData({
          title: "",
          description: ""
        });
      } else {
        toast.error("Fill all the inputs")
      }
      await fetchTodos();
    } catch (error) {
      toast.error("Error")
    }
  }

  return (
    <>
      <ToastContainer theme="dark" />
      <form onSubmit={onSubmitHandle} className="flex items-start flex-col gap-2 w-[80%] max-w-[600px] mt-16 px-2 mx-auto">
        <input
          value={formData.title}
          onChange={onChangeHandler}
          type="text"
          name="title"
          placeholder="Enter Title"
          className="px-3 py-2 border-2 w-full outline-none" />
        <textarea
          value={formData.description}
          onChange={onChangeHandler}
          name="description"
          placeholder="Enter Description"
          className="px-3 py-2 border-2 w-full outline-none" />
        <button type="submit" className="bg-orange-600 mx-auto py-3 px-11 text-white">Add ToDo</button>
      </form>


      <div className="relative overflow-x-auto mt-8 lg:px-8 w-full mx-auto">
        <table className="w-full border rounded-md text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs border text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {todoData.map((i, index) => {
              return <Todo
                key={index}
                id={index}
                title={i.title}
                description={i.description}
                complete={i.isCompleted}
                mongoId={i._id}
                deleteTodo={deleteTodo}
                completeTodo={completeTodo}
              />
            })}
          </tbody>
        </table>
      </div>

    </>
  );
}
