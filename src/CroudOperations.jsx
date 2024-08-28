// import React, { useState, useEffect } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './App.css';

// const CrudOperations = () => {
//   const [title, setTitle] = useState("");
//   const [desc, setDesc] = useState("");
//   const [items, setItems] = useState([]);

//   useEffect(() => {
//     // Load items from local storage on component mount
//     const storedItems = JSON.parse(localStorage.getItem("crudItems"));
//     if (storedItems) {
//       setItems(storedItems);
//     }
//   }, []);

//   const handleAdd = () => {
//     if (title && desc) {
//       const newItem = { title, desc };
//       const updatedItems = [...items, newItem];

//       // Update state and local storage
//       setItems(updatedItems);
//       localStorage.setItem("crudItems", JSON.stringify(updatedItems));

//       // Clear input fields
//       setTitle("");
//       setDesc("");
//     }
//   };

//   return (
//     <div className='m-3'>
//       <div className='border-text-field p-3'>
//         <input 
//           type='text' 
//           placeholder='Title' 
//           value={title} 
//           onChange={(e) => setTitle(e.target.value)} 
//           className='form-control' 
//         />
//         <textarea 
//           placeholder='Description' 
//           value={desc} 
//           onChange={(e) => setDesc(e.target.value)} 
//           className='form-control mt-3' 
//         />
//         <button 
//           className='btn btn-primary d-flex ms-auto mt-3' 
//           onClick={handleAdd}
//         >
//           Add
//         </button>
//       </div>
      
//       {items.length > 0 && (
//         <table className='table table-bordered mt-4 w-50'>
//           <thead>
//             <tr>
//               <th>SL NO</th>
//               <th>Title</th>
//               <th>Description</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {items.map((item, index) => (
//               <tr key={index}>
//                 <td>{index+1}</td>
//                 <td>{item.title}</td>
//                 <td>{item.desc}</td>
//                 <td className='d-flex justify-content-between'>
//                     <button>Edit</button>
//                     <button>delete</button>
//                     <button>View</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }

// export default CrudOperations;

import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const CrudOperations = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [items, setItems] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [viewingItem, setViewingItem] = useState(null);

  useEffect(() => {
    // Load items from local storage on component mount
    const storedItems = JSON.parse(localStorage.getItem("crudItems"));
    if (storedItems) {
      setItems(storedItems);
    }
  }, []);

  const handleAdd = () => {
    if (title && desc) {
      if (isEditing) {
        // Update the existing item
        const updatedItems = items.map((item, index) => 
          index === currentIndex ? { title, desc } : item
        );
        setItems(updatedItems);
        localStorage.setItem("crudItems", JSON.stringify(updatedItems));
        setIsEditing(false);
        setCurrentIndex(null);
      } else {
        // Add a new item
        const newItem = { title, desc };
        const updatedItems = [...items, newItem];
        setItems(updatedItems);
        localStorage.setItem("crudItems", JSON.stringify(updatedItems));
      }

      // Clear input fields
      setTitle("");
      setDesc("");
    }
  };

  const handleEdit = (index) => {
    const itemToEdit = items[index];
    setTitle(itemToEdit.title);
    setDesc(itemToEdit.desc);
    setIsEditing(true);
    setCurrentIndex(index);
    setViewingItem(null); // Clear viewing item
  };

  const handleDelete = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
    localStorage.setItem("crudItems", JSON.stringify(updatedItems));
    setViewingItem(null); // Clear viewing item
  };

  const handleView = (index) => {
    setViewingItem(items[index]);
    setTitle(""); // Clear input fields
    setDesc("");
    setIsEditing(false); // Ensure we're not in editing mode
  };

  return (
    <div className='m-3'>
      <div className='border-text-field p-3'>
        <input 
          type='text' 
          placeholder='Title' 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          className='form-control' 
        />
        <textarea 
          placeholder='Description' 
          value={desc} 
          onChange={(e) => setDesc(e.target.value)} 
          className='form-control mt-3' 
        />
        <button 
          className='btn btn-primary d-flex ms-auto mt-3' 
          onClick={handleAdd}
        >
          {isEditing ? "Update" : "Add"}
        </button>
      </div>

      {items.length > 0 && (
        <table className='table table-bordered mt-4 w-50'>
          <thead>
            <tr>
              <th>SL NO</th>
              <th>Title</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.title}</td>
                <td>{item.desc}</td>
                <td className='d-flex justify-content-between'>
                  <button onClick={() => handleEdit(index)}>Edit</button>
                  <button onClick={() => handleDelete(index)}>Delete</button>
                  <button onClick={() => handleView(index)}>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {viewingItem && (
       
          <div className='border-text-field p-3 d-flex ms-auto'>
         <div>
         <div className='mb-3'>
              <strong>Title:</strong>
              <div className='border p-2'>{viewingItem.title}</div>
            </div>
            <div>
              <strong>Description:</strong>
              <div className='border p-2'>{viewingItem.desc}</div>
            </div>
         </div>
       
        </div>
      )}
    </div>
  );
}

export default CrudOperations;
