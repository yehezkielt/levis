import { revalidatePath } from "next/cache";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Register() {
    async function addUser(formData: FormData) {
        "use server";

        const newUser = {
            username: formData.get("username"),
            name: formData.get("name"),
            email: formData.get("email"),
            password: formData.get("password"),
        };

        const res = await fetch(
            process.env.NEXT_PUBLIC_BASE_URL + "/api/user/register",
            {
                cache: "no-store",
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newUser),
            }
        );

        if (!res.ok) throw new Error("Register Failed");

        // revalidatePath("/register")
        redirect("/login");
    }
    return (
        <>
            {/* register form */}

            <div className="min-h-screen flex items-center justify-center">
                <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
                    <div className="flex justify-center mb-8">
                        <img
                            src="https://levi.co.id/cdn/shop/files/levis-logo-new-colour.svg?v=1701845829&width=160"
                            alt="Logo"
                            className="w-30 h-20"
                        />
                    </div>
                    <h1 className="text-2xl font-semibold text-center text-gray-500 mt-8 mb-6">
                        America Finest Overall
                    </h1>
                    <form action={addUser}>
                        <div className="mb-6">
                            <input
                                type="username"
                                id="username"
                                name="username"
                                placeholder="Username.."
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            />
                        </div>
                        <div className="mb-6">
                            <input
                                type="name"
                                id="name"
                                name="name"
                                placeholder="Name.."
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            />
                        </div>
                        <div className="mb-6">
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Email.."
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            />
                        </div>
                        <div className="mb-6">
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Password.."
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-32 bg-gradient-to-r from-red-300 to-red-600 text-white py-2 rounded-lg mx-auto block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 mt-4 mb-6"
                        >
                            Register
                        </button>
                    </form>
                    <div className="text-center">
                        <p className="text-sm">
                            Already have account?{" "}
                            <Link href="/login" className="text-cyan-600">
                                Login here
                            </Link>
                        </p>
                    </div>
                    <p className="text-xs text-gray-600 text-center mt-10">
                        © 2024 Tatang Group
                    </p>
                </div>
            </div>
        </>
    );
}
