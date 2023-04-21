import { useState, FormEvent } from "react";
import { useSignup } from "../hooks/useSignup";
import { ClipLoader } from "react-spinners";

const Signup = () => {
  const { signup, isLoading, error } = useSignup();
  // form states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    await signup(firstName, lastName, username, email, password);
    setEmail("");
    setPassword("");
    setUsername("");
  };

  return (
    <div className="mx-2">
      <div className="container max-w-5xl mx-auto flex min-h-screen items-center justify-center">
        <div className="flex justify-center max-w-4xl w-full">
          {/* form */}
          <div className="flex flex-col mx-4 text-left p-6 bg-white rounded-xl w-3/4 md:mx-0 dark:bg-gray-500">
            <div className="space-y-6">
              <h2 className="text-4xl font-mono font-bold text-gray-700 dark:text-white">
                Sign up
              </h2>
              <p className="max-w-sm font-light text-gray-700 dark:text-gray-200">
                Register to share your recipes with another users!
              </p>
            </div>
            <div>
              <form onSubmit={submitHandler}>
                <div className="flex space-x-8">
                  <input
                    onChange={(e) => setFirstName(e.target.value)}
                    value={firstName}
                    type="text"
                    className="border border-gray-400 rounded-lg p-6 py-4 focus:outline-none placeholder:font-thin block w-full mt-6 dark:bg-gray-500 dark:text-white dark:border-2 dark:placeholder:text-white"
                    placeholder="Please Enter Your First Name"
                  />
                  <input
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName}
                    type="text"
                    className="border border-gray-400 rounded-lg p-6 py-4 focus:outline-none placeholder:font-thin block w-full mt-6 dark:bg-gray-500 dark:text-white dark:border-2 dark:placeholder:text-white"
                    placeholder="Please Enter Your Last Name"
                  />
                </div>
                <input
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                  type="text"
                  className="border border-gray-400 rounded-lg p-6 py-4 focus:outline-none placeholder:font-thin block w-full mt-6 dark:bg-gray-500 dark:text-white dark:border-2 dark:placeholder:text-white"
                  placeholder="Please Enter Your Username"
                />
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="email"
                  className="border border-gray-400 rounded-lg p-6 py-4 focus:outline-none placeholder:font-thin block w-full mt-6 dark:bg-gray-500 dark:text-white dark:border-2 dark:placeholder:text-white"
                  placeholder="Please Enter Your Email"
                />
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type="password"
                  className="border border-gray-400 rounded-lg p-6 py-4 focus:outline-none placeholder:font-thin block w-full mt-6 dark:bg-gray-500 dark:text-white dark:border-2 dark:placeholder:text-white"
                  placeholder="Please Enter Your Password"
                />
                {!isLoading && (
                  <button
                    disabled={isLoading}
                    className="bg-blue-400 px-14 py-4 mt-3 text-white rounded hover:-translate-y-0.5 w-full hover:shadow-sm transition duration-150"
                  >
                    Sign up
                  </button>
                )}
                {isLoading && (
                  <button
                    disabled={isLoading}
                    className="flex justify-center items-center bg-blue-400 px-14 py-4 mt-3 text-white rounded hover:-translate-y-0.5 w-full hover:shadow-sm transition duration-150 bg-opacity-80"
                  >
                    <ClipLoader
                      color={"white"}
                      loading={isLoading}
                      size={20}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                    />
                  </button>
                )}

                {error && <p className="error">{error.error}</p>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
