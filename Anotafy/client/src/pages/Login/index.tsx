import { Mail, Lock, Eye, EyeOff} from "lucide-react";
import Logo from "../../components/Logo";
import { useState } from "react";

export default function Login() {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-400 to-gray-5d0 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-8">
                <div className="flex justify-center mb-4">
                    <Logo className="w-16" />
                </div>

                <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
                    Anotafy
                </h1>
                <p className="text-center text-gray-600 mb-4">
                    Sistema para a gestão do seu restaurente!
                </p>

                <form className="space-y-6">
                    <div>
                        <label className="block text-md font-medium text-gray-700 mb-2">
                            Email
                        </label>
                        <div className="flex px-2 items-center w-full border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 transition-colors focus-within:border-black">
                            <Mail size={20} className=" text-gray-500" />
                            <input
                                type="text"
                                className="px-2 py-3 w-full bg-transparent border-none outline-none rounded-lg"
                                placeholder="Digite seu usuário"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-md font-medium text-gray-700 mb-2">
                            Senha
                        </label>
                        <div className="flex items-center w-full border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 transition-colors focus-within:border-black px-2.5">
                            <Lock
                                size={20}
                                className=" text-gray-500"
                            />
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                className="px-2 py-3 w-full bg-transparent border-none outline-none rounded-lg"
                                placeholder="Digite sua senha"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="right-3 text-gray-500 hover:text-gray-700"
                            >
                                {showPassword ? (
                                    <EyeOff
                                        size={20}
                                        className="cursor-pointer"
                                    />
                                ) : (
                                    <Eye size={20} className="cursor-pointer" />
                                )}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg cursor-pointer transition-colors disabled:opacity-50"
                    >
                        Entrar
                    </button>
                </form>
            </div>
        </div>
    );
}
