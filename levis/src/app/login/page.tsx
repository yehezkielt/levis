import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Login() {
    async function loginUser(formData: FormData) {
        "use server";

        const user = {
            email: formData.get("email"),
            password: formData.get("password"),
        };
        console.log(user, " ini user ------");

        const res = await fetch(
            process.env.NEXT_PUBLIC_BASE_URL + "/api/user/login",
            {
                cache: "no-store",
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            }
        );

        const result = await res.json();
        console.log(result, "iiiiiii");

        if (!res.ok) throw new Error("Login Failed");

        cookies().set("Authorization", `Bearer ${result.data.token}`);
        // revalidatePath("/login")
        redirect("/");
    }
    return (
        <>
            {/* login form */}

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
                    <form action={loginUser}>
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
                            <a
                                href="#"
                                className="block text-right text-xs text-cyan-600 mt-2"
                            >
                                forget password?
                            </a>
                        </div>
                        <button
                            type="submit"
                            className="w-32 bg-gradient-to-r from-red-300 to-red-600 text-white py-2 rounded-lg mx-auto block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 mt-4 mb-6"
                        >
                            Login
                        </button>
                    </form>
                    <div className="text-center">
                        <p className="text-sm">
                            Dont have account?{" "}
                            <Link href="/register" className="text-cyan-600">
                                Register here
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
