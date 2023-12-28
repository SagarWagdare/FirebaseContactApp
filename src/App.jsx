import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./config/firebase";
import ContactCard from "./components/ContactCard";
import { CiSearch } from "react-icons/ci";
import { FaCirclePlus } from "react-icons/fa6";
import AddandUpdateContact from "./components/AddandUpdateContact";
import useDisclouse from "./hooks/useDisclouse";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  const [contacts, setContacts] = useState([]);
  const { onClose, onOpen, isOpen } = useDisclouse();

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      // Update the state based on the window width
      setIsMobile(window.innerWidth <= 768); // You can adjust the threshold as needed
    };

    // Initial check on component mount
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array ensures that the effect runs only once on mount

  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsRef = collection(db, "Contacts");
        // Snapshot update the data in realtimev
        // This will not update the data so we are using below some different
        // const contactsSnapshot = await getDocs(contactsRef);

        // This will update realtime data
        onSnapshot(contactsRef, (snapshot) => {
          const contactsLists = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
          setContacts(contactsLists);
        });
      } catch (error) {
        console.log(error);
      }
    };
    getContacts();
  }, []);

  const filterContacts = (e) => {
    const value = e.target.value;
    const contactsRef = collection(db, "Contacts");
    onSnapshot(contactsRef, (snapshot) => {
      const contactsLists = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      const filteredContacts = contactsLists.filter((contact) =>
        contact.name.toLowerCase().includes(value.toLowerCase())
      );
      setContacts(filteredContacts);

      return filteredContacts;
    });
  };
  return (
    <>
      {isMobile ? (
        <>
          <div className="max-w-[370px] h-[530px] mx-auto border   p-2 bg-black overflow-scroll scrollable-content ">
            <Navbar />
            <div className="flex gap-2">
              <div className="flex flex-grow relative items-center">
                <CiSearch className="text-white text-2xl absolute ml-1" />
                <input
                  onChange={filterContacts}
                  type="text"
                  placeholder="Search Contact "
                  className="rounded-lg p-1 border border-white bg-transparent h-10 flex-grow text-white pl-8"
                />
              </div>
              <FaCirclePlus
                className="text-4xl text-white cursor-pointer"
                onClick={onOpen}
              />
            </div>
            <div className="mt-4 flex justify-center flex-col mx-auto gap-3">
              {contacts.map((contact) => (
                <ContactCard key={contact.id} contact={contact} />
              ))}
            </div>
          </div>
          <AddandUpdateContact
            onClose={onClose}
            onOpen={onOpen}
            isOpen={isOpen}
          />
          <ToastContainer position="top-center" autoClose={1000} />{" "}
        </>
      ) : (
        <div className="absolute top-0 z-40 grid h-screen w-screen place-items-center backdrop-blur flex justify-center items-center ">
          <h1 className="text-2xl font-extralight font-semibold fa-fade  ">
          For an optimal experience, please view this page on a mobile device or resize your screen to simulate mobile devices.
          </h1>
        </div>
      )}
    </>
  );
};

export default App;
