"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { useUserStore } from "@/stores/useUserStore";
import { useRouter } from "next/navigation";

const RegisterContainer = () => {
  const { register } = useUserStore();
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });
  const router = useRouter();

  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  const { username, email, password } = formState;

  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let valid = true;

    if (!passwordRegex.test(password)) {
      setPasswordError("Invalid Password");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (valid) {
      const success = await register(username, email, password);

      if (success) {
        router.push("/login");
      }
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
          Register Form
        </h1>
        <form className="space-y-5 mb-2" onSubmit={handleSubmit}>
          {/* Username */}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              value={formState.username}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
              placeholder="Username"
              required
            />
          </div>
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
            {passwordError && (
              <p className="text-red-500 text-sm">{passwordError}</p>
            )}
          </div>

          {/* Submit */}
          <button
            className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
            type="submit"
          >
            Register
          </button>
        </form>

        <p className="w-full mx-auto text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link className="text-blue-600 hover:underline" href="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterContainer;
