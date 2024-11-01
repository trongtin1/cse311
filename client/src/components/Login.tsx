import Link from 'next/link';
import React from 'react';

const Login = () => {
    return (
        <div >
            <Link href="/login">
                <button
                    className="border-2 bg-white text-black py-1.5 px-6 rounded-lg hover:bg-blue-500 hover:text-white transition duration-300 ease-in-out"
                >
                    Sign In
                </button>
            </Link>

        </div>
    );
}
export default Login;
