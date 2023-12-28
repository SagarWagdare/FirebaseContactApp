import { FaRegUserCircle } from "react-icons/fa";
import { RiEditCircleLine } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import {collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase";
import AddandUpdateContact from "./AddandUpdateContact";
import useDisclouse from "../hooks/useDisclouse";
import { toast } from "react-toastify";
const ContactCard =  ({ contact }) => {
  const {onClose,onOpen,isOpen} = useDisclouse();

 const deleteContact = async (contact)=>{
  try {
    const contactRef = collection(db,"Contacts");
    await deleteDoc(doc(contactRef,contact.id))
    toast.success(`${contact.name} Deleted Successfully`)

  } catch (error) {
    console.log(error)
  }
 }
 
  return (
    <>
    <div
      key={contact.id}
      className="border bg-[#FFEAAE] flex justify-center rounded-lg  "
    >
      <div className="flex gap-3 ">
        <FaRegUserCircle className="text-[#F6820C] text-3xl m-2" />
        <div className="w-[200px] overflow-y-scroll">
          <h2 className="text-medium ">{contact.name}</h2>
          <p className="text-sm">{contact.email}</p>
        </div>
        <div className="flex items-center">
          <RiEditCircleLine className="text-xl cursor-pointer" onClick={onOpen}/>
          <MdDelete className="text-[#F6820C] text-xl cursor-pointer" onClick={()=>deleteContact(contact)} />
        </div> 
      </div>
    </div>
    <AddandUpdateContact contact={contact} isUpdate isOpen={isOpen} onClose={onClose}/>
    
    
    </>
  );
};

export default ContactCard;
