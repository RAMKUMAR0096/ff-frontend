import imageToBase64 from '@/helper/imageTobase64';
import imageTobase64 from '@/helper/imageTobase64';
import { useState } from 'react';
import { toast } from 'sonner';
import ScrollToTop from './ScrollToTop ';

const UploadProduct = ({ onUpload }) => {
    const [formData, setFormData] = useState<{
        name: string;
        category: string;
        description: string;
        image: string; 
        rating: number;
        reviews: number;
    }>({
        name: '',
        category: 'cables',
        description: '',
        image: '',
        rating: 0,
        reviews: 0,
    });


    // Convert image file to base64 string
    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            const base64: string = await imageToBase64(file); // ensure correct function name and file is File type
            setFormData(prev => ({
                ...prev,
                image: base64,
            }));
        } catch (err) {
            console.error('Failed to convert image:', err);
        }

    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newProduct = {
            ...formData,
            id: Date.now(),
        };

        // Save to localStorage
        const existing = JSON.parse(localStorage.getItem('products')) || [];
        const updated = [...existing, newProduct];
        localStorage.setItem('products', JSON.stringify(updated));
        toast.success("product addeded successfully")

        // Callback to parent
        if (onUpload) onUpload(newProduct);

        // Reset form
        setFormData({
            name: '',
            category: 'cables',
            description: '',
            image: '',
            rating: 0,
            reviews: 0,
        });
    };

    return (
        <>
            <ScrollToTop />
            <form
            onSubmit={handleSubmit}
            className="bg-white border p-6 rounded-lg shadow-lg space-y-4 w-full max-w-md"
        >
            <h2 className="text-xl font-semibold">Upload Product</h2>

            <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Product Name"
                required
                className="w-full border px-3 py-2 rounded"
            />

            <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
            >
                <option value="cables">Fiber Optic Cables</option>
                <option value="equipment">Network Equipment</option>
                <option value="accessories">Accessories</option>
                <option value="services">Services</option>
            </select>

            <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Product Description"
                required
                className="w-full border px-3 py-2 rounded"
            />

            <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                required
                className="w-full border px-3 py-2 rounded"
            />

            {formData.image && (
                <img
                    src={formData.image}
                    alt="Preview"
                    className="w-full h-40 object-cover rounded"
                />
            )}

            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Upload
            </button>
        </form>
        </>
    );
};

export default UploadProduct;
