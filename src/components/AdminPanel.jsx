import React, { useState, useRef } from 'react';
import supabase from '../config/connect';
import { Bounce, toast } from 'react-toastify';

const AdminPanel = ({ active, products }) => {
    const [productName, setProductName] = useState('');
    const [productCategory, setProductCategory] = useState('');
    const [productType, setProductType] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productDesc, setProductDesc] = useState('');
    const [dragOver, setDragOver] = useState(false);
    const [fileName, setFileName] = useState('');
    const fileRef = useRef(null);
    const inputRef = useRef(null);

    const sendImgToStorage = async (file) => {
        if (!file) {
            console.error('No file selected.');
            return;
        }

        const filePath = `parts/${file.name}`;

        const { data: listData, error: listError } = await supabase.storage.from('images').list('parts');
        if (listError) {
            console.error('Error listing files:', listError.message);
            return;
        }

        const fileExists = listData.some(item => item.name === file.name);

        if (fileExists) {
            const { data: urlData, error: urlError } = supabase.storage.from('images').getPublicUrl(filePath);
            if (urlError) {
                console.error('Error getting public URL:', urlError.message);
            } else {
                const publicURL = urlData.publicUrl;
                console.log('File already exists. Public URL:', publicURL);
                return publicURL;
            }
        } else {
            const { data: uploadData, error: uploadError } = await supabase.storage.from('images').upload(filePath, file);
            if (uploadError) {
                console.error('Error uploading file:', uploadError.message);
            } else {
                console.log('File uploaded successfully:', uploadData);
                const { data: urlData, error: urlError } = supabase.storage.from('images').getPublicUrl(filePath);
                if (urlError) {
                    console.error('Error getting public URL:', urlError.message);
                } else {
                    const publicURL = urlData.publicUrl;
                    console.log('Public URL:', publicURL);
                    return publicURL;
                }
            }
        }
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();
        const file = fileRef.current;
        if (!file) {
            console.error('No file selected for upload.');
            return;
        }
        const imgURL = await sendImgToStorage(file);
        if (imgURL) {
            const { error } = await supabase.from('products').insert({
                name: productName,
                category: productCategory,
                type: productType,
                price: productPrice,
                about: productDesc,
                img: [imgURL]
            });
            if (error) {
                console.error('Error inserting product:', error.message);
            } else {
                window.location.reload();
            }
        }
    };

    const handleRemoveItem = async (_id) => {
        const { error } = await supabase.from('products').delete().eq('id', _id);
        if (error) {
            console.error('Error deleting product:', error.message);
        } else {
            window.location.reload();
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setDragOver(true);
    };

    const handleDragLeave = () => {
        setDragOver(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragOver(false);
        const file = e.dataTransfer.files[0];
        if (file) {
            fileRef.current = file;
            setFileName(file.name);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            fileRef.current = file;
            setFileName(file.name);
        }
    };

    const handleFileClick = () => {
        inputRef.current.click();
    };

    const alertMessage = (message, duration) => {
        toast(message, {
            position: "top-right",
            autoClose: duration,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
        });
    }

    return (
        <div style={active === 'adminPanel' ? { display: 'block' } : { display: 'none' }} className="admin-text-container">
            <h1>Welcome to the Admin Panel</h1>
            <p>This is the main content area where you can manage different aspects of your application.</p>
            <h2>Add New Product</h2>
            <form onSubmit={handleAddProduct}>
                <div className="input-container">
                    <label htmlFor="productName">Product Name</label>
                    <input type="text" id="productName" value={productName} onChange={(e) => setProductName(e.target.value)} />
                </div>
                <div className="input-container">
                    <label htmlFor="productCategory">Product Category</label>
                    <input type="text" id="productCategory" value={productCategory} onChange={(e) => setProductCategory(e.target.value)} />
                </div>
                <div className="input-container">
                    <label htmlFor="productType">Product Type</label>
                    <input type="text" id="productType" value={productType} onChange={(e) => setProductType(e.target.value)} />
                </div>
                <div className="input-container">
                    <label htmlFor="productPrice">Product Price</label>
                    <input type="number" id="productPrice" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} />
                </div>
                <div className="input-container">
                    <label htmlFor="productDesc">Product Description</label>
                    <textarea value={productDesc} onChange={(e) => setProductDesc(e.target.value)} id="productDesc" />
                </div>
                <div
                    style={{
                        border: '2px dashed #000',
                        padding: '.4em .8em',
                        textAlign: 'center',
                        width: '100%',
                        margin: '1em auto',
                        boxSizing: 'border-box',
                        cursor: 'pointer',
                        backgroundColor: dragOver ? '#f0f0f0' : 'transparent'
                    }}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={handleFileClick}
                >
                    <p>Drag & Drop your file here</p>
                    <p>or</p>
                    <p>Click to select a file</p>
                    {fileName && <p>Selected file: {fileName}</p>}
                </div>
                <input
                    type="file"
                    ref={inputRef}
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                />
                <div onClick={()=>{alertMessage("Please wait, do not reload the page", 5000)}} className="btn-container">
                    <button type="submit">ADD PRODUCT</button>
                </div>
            </form>
            <h2>Products</h2>
            {products.map((item, i) => (
                <div key={i} className="product-card">
                    <div className="img-text-container">
                        <div className="img-container">
                            <img src={`${item.img[0]}`} alt="" />
                        </div>
                        <div className="text-container">
                            <div className="category-name">
                                <h6>Product Name:</h6>
                                <p>{item.name.toUpperCase()}</p>
                            </div>
                            <div className="category-name">
                                <h6>Product Category:</h6>
                                <p>{item.category}</p>
                            </div>
                            <div className="category-name">
                                <h6>Product Type:</h6>
                                <p>{item.type}</p>
                            </div>
                            <div className="price-quantity-container">
                                <div>
                                    <h5>€{item.price}.00</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="delete" onClick={() => {handleRemoveItem(item.id);alertMessage("Please wait, do not reload the page", 5000)}}>
                        <i className="fa-solid fa-x"></i>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AdminPanel;
