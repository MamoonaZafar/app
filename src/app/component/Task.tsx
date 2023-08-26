'use client'

import React, { FormEventHandler, useState } from "react"
import { ITask } from "../../../types/tasks"
import {BiEdit} from 'react-icons/bi'
import {BsTrash} from "react-icons/bs"
import Modal from "./Modal"
import { useRouter } from "next/navigation"
import { deleteTodo, editTodo } from "../../../api"

interface TaskProps{
    task: ITask
}




export const Task: React.FC<TaskProps> = ({task}) => {
  const router = useRouter();
  const[openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const[openModalDelete, setOpenModalDelete] = useState<Boolean>(false);
  const [taskToEdit, setTaskToEdit] = useState<string>(task.text);

  const handleSubmitEditTodo: FormEventHandler<HTMLFormElement>= async(e)=>{
    e.preventDefault();
    await editTodo({
        id: task.id,
        text: taskToEdit
    })
    setTaskToEdit("");
    setOpenModalEdit(false);
    router.refresh

  };

  const handleDeleteTask = async (id: string)=>{
     await deleteTodo(id);
     setOpenModalDelete(false);
     router.refresh
  }

  return (
    <tr key={task.id}>
        <td className="w-full">{task.text}</td>
        <td className="flex gap-5">
          <BiEdit onClick={()=>setOpenModalEdit(true)} cursor="pointer" className='text-[#5616C5]' size={25}/>
          <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
            <form onSubmit={handleSubmitEditTodo}>
                <h3 className='font-bold text-lg'>Edit Task</h3>
                <div className='modal-action'>
                <input value={taskToEdit}
                onChange={e => setTaskToEdit(e.target.value)}
                type="text" placeholder="Type here" className="input input-bordered w-full" />
                <button type='submit' className='btn text-white '>Submit</button>
                </div>
            </form>
        </Modal>
          <BsTrash onClick={() => setOpenModalDelete(true)}
          cursor="pointer" className='text-red-500' size={25}/>
          <Modal modalOpen={openModalDelete} setModalOpen={setOpenModalDelete}>
            <h3 className="text-lg">Are you sure</h3>
            <div className="modal-action">
              <button onClick={()=> handleDeleteTask(task.id)} className="btn">Yes</button>
            </div>

        </Modal>
        </td>
      </tr>
  )
}
