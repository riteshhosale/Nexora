import { useState } from "react";
import { forgotPassword } from "../api/authApi";
import { toast } from "react-hot-toast";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await forgotPassword(email);

            toast.success(data.message);

            setEmail("");
        } catch (error) {
            toast.error(
                error.response?.data?.message || "An error occurred. Please try again."
            );
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
                <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
                    Forgot Password
                </h1>

                <form 
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >
                    <input 
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        required
                    />

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
                    >
                        Send Reset Link
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;