"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { useUserStore } from "@/stores/useUserStore";
import { useRouter } from "next/navigation";

const LoginContainer = () => {
  const { login, isLoading, isLogin } = useUserStore();
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });
  const router=useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await login(formState.email, formState.password);

    if (isLogin) {
      router.push("/");
    }
    
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-900">
          Welcome Back..
        </h1>
        <form className="space-y-5 mb-2" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formState.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formState.password}
                onChange={handleChange}
                className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-black"
              >
                <Icon
                  icon={
                    showPassword ? "mdi:eye-off-outline" : "mdi:eye-outline"
                  }
                  className="text-xl"
                />
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
            type="submit"
          >
            Login
          </button>
        </form>

        <p className="w-full mx-auto text-sm text-center text-gray-600">
          Don't have an account?{" "}
          <Link className="text-blue-600 hover:underline" href="/register">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginContainer;
