import Modal from "./Modal";
import { Field, Form, Formik } from "formik";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { toast } from "react-toastify";

const AddandUpdateContact = ({ onOpen, onClose, isOpen,isUpdate,contact }) => {
  const addContact = async (contact)=>{
    if(!contact.name && !contact.email ){
      
      toast.warn("Pls add Name and Email")
      return;

    }
    try {
      const contactsRef = collection(db,"Contacts");
      await addDoc(contactsRef,contact)
      onClose();
      toast.success("New Contact Added Successfully")
      
      
    } catch (error) {
      console.log(error)
    }

  }
  const updateContact = async (contact,id)=>{
    if(!contact.name && !contact.name){
      toast.warn("Pls add some text")
      return
    }
    try {
      const contactsRef = doc(db,"Contacts",id);
      await updateDoc(contactsRef,contact)
      onClose();
      toast.success(" Contact Updated Successfully")

      
    } catch (error) {
      console.log(error)
    }

  }
  return (
    <Modal onOpen={onOpen} onClose={onClose} isOpen={isOpen} >
      <Formik initialValues={isUpdate? 
      
      {
        name:contact.name,
        email:contact.email
      }:{
        name:"",
        email:""
      }} 
      onSubmit={(values)=> {console.log(values)
        isUpdate?updateContact(values,contact.id):addContact(values)}}>
        <Form className="flex flex-col p-1 ">
          <div className="flex flex-col gap-1">
            <label htmlFor="name">Name</label>
            <Field name="name" className="border p-1" />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="email">Email</label>
            <Field name="email" className="border p-1" />
          </div>
          <button className="bg-[#f39536fe] border px-6 py-1 rounded-xl self-end my-2">{isUpdate?"Update":"Add"} Contact</button>

        </Form>
      </Formik>
    </Modal>
  );
};

export default AddandUpdateContact;
