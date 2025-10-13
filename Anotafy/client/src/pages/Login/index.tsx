import { useState, useEffect } from 'react';
import { ChefHat, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import Logo from '../../components/Logo';

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
    const [toastMessage, setToastMessage] = useState<{
        type: 'success' | 'error';
        title: string;
        description: string;
    } | null>(null);

    // Load remembered email from localStorage
    useEffect(() => {
        const rememberedEmail = localStorage.getItem('anotafy_remembered_email');
        if (rememberedEmail)
        {
            setEmail(rememberedEmail)
            setRememberMe(true)
        }
    }, []);

    const validateEmail = (email: string): string | undefined => {
        if (!email.trim()) {
            return 'Email é obrigatório';
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return 'Email inválido';
        }
        if (email.length > 255) {
            return 'Email muito longo';
        }
        return undefined;
    };

    const validatePassword = (password: string): string | undefined => {
        if (!password) {
            return 'Senha é obrigatória';
        }
        if (password.length < 6) {
            return 'Senha deve ter no mínimo 6 caracteres';
        }
        if (password.length > 100) {
            return 'Senha muito longa';
        }
        return undefined;
    };

    const onSubmit = async () => {

        const emailError = validateEmail(email);
        const passwordError = validatePassword(password);

        if (emailError || passwordError) {
            setErrors({ email: emailError, password: passwordError });
            return;
        }

        setErrors({});
        setIsLoading(true);

        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 4000));

            // Handle "Remember me" functionality
            if (rememberMe) {
                localStorage.setItem('anotafy_remembered_email', email);
            } else {
                localStorage.removeItem('anotafy_remembered_email');
            }

            // For demo purposes - would normally validate against backend
            if (email === 'demo@anotafy.com' && password === 'demo123') {
                setToastMessage({
                    type: 'success',
                    title: 'Login realizado com sucesso!',
                    description: 'Bem-vindo ao Anotafy',
                });
            } else {
                setToastMessage({
                    type: 'error',
                    title: 'Erro ao fazer login',
                    description:
                        'Email ou senha incorretos. Tente: demo@anotafy.com / demo123',
                });
            }
        } catch (error) {
            setToastMessage({
                type: 'error',
                title: 'Erro ao fazer login',
                description: 'Ocorreu um erro ao processar sua solicitação',
            });
        } finally {
            setIsLoading(false)
        }
    };

    const handleForgotPassword = () => {
        setToastMessage({
            type: 'success',
            title: 'Recuperação de senha',
            description: 'Um link de recuperação será enviado para seu email',
        });
    };

    useEffect(() => {
        if (toastMessage) {
            const timer = setTimeout(() => {
                setToastMessage(null);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [toastMessage]);

    return (
        <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-background via-primary-light/20">
            {/* Toast Notification */}
            {toastMessage && (
                <div
                    className={`fixed top-4 right-4 z-50 w-full max-w-sm rounded-lg border p-4 shadow-lg animate-fade-in ${
                        toastMessage.type === 'error'
                            ? 'bg-destructive/10 border-destructive text-destructive'
                            : 'bg-primary/10 border-primary text-foreground'
                    }`}
                >
                    <div className="flex flex-col gap-1">
                        <h3 className="font-semibold">{toastMessage.title}</h3>
                        <p className="text-sm opacity-90">
                            {toastMessage.description}
                        </p>
                    </div>
                    <button
                        onClick={() => setToastMessage(null)}
                        className="absolute top-2 right-2 opacity-70 hover:opacity-100 transition-opacity"
                    >
                        ×
                    </button>
                </div>
            )}
            <div className="w-full max-w-md animate-fade-in">
                {/* Logo and Brand */}
                <div className="text-center mb-8 flex flex-col items-center">
                    <Logo size={16} className='m-6'/>
                    <h1 className="text-3xl font-bold text-foreground mb-2">
                        Anotafy
                    </h1>
                    <p className="text-muted-foreground">
                        Gestão inteligente de mesas
                    </p>
                </div>

                {/* Login Card */}
                <div className="bg-card rounded-2xl shadow-card border border-border p-8">
                    <div className="mb-6">
                        <h2 className="text-2xl font-semibold text-foreground mb-1">
                            Bem-vindo de volta
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            Entre com suas credenciais para acessar o sistema
                        </p>
                    </div>

                    <div className="space-y-5">
                        {/* Email Field */}
                        <div>
                            <label className="text-foreground font-medium text-sm block mb-2">
                                Email
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                <input
                                    type="email"
                                    placeholder="seu@email.com"
                                    className="flex h-12 w-full rounded-md border border-input bg-background pl-11 px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm transition-all"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            {errors.email && (
                                <p className="text-sm text-destructive mt-1">
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div>
                            <label className="text-foreground font-medium text-sm block mb-2">
                                Senha
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="••••••••"
                                    className="flex h-12 w-full rounded-md border border-input bg-background pl-11 pr-11 px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm transition-all"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-5 h-5" />
                                    ) : (
                                        <Eye className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="text-sm text-destructive mt-1">
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <button
                                    type="button"
                                    onClick={() => setRememberMe(!rememberMe)}
                                    className="relative h-4 w-4 shrink-0 rounded-full border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground p-[2px]"
                                    style={{
                                        backgroundColor: rememberMe
                                            ? 'hsl(var(--primary))'
                                            : 'transparent',
                                        color: rememberMe
                                            ? 'hsl(var(--primary-foreground))'
                                            : 'transparent',
                                    }}
                                >
                                    {rememberMe && (
                                        <div className='w-full h-full bg-primary rounded-full'/>
                                    )}
                                </button>
                                <label
                                    className="text-sm font-normal text-muted-foreground cursor-pointer rounded-2xl"
                                    onClick={() => { setRememberMe(!rememberMe) }}
                                >
                                    Lembrar meu email
                                </label>
                            </div>

                            <button
                                type="button"
                                onClick={handleForgotPassword}
                                className="text-sm text-primary hover:text-primary-hover transition-colors font-medium"
                            >
                                Esqueci minha senha
                            </button>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="button"
                            disabled={isLoading}
                            onClick={onSubmit}
                            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 w-full h-12 bg-primary hover:bg-primary-hover text-primary-foreground shadow-md hover:shadow-lg"
                        >
                            {isLoading ? 'Entrando...' : 'Entrar'}
                        </button>
                    </div>

                    {/* Demo Credentials Info */}
                    <div className="mt-6 p-4 bg-primary-light/50 rounded-lg border border-primary/20">
                        <p className="text-xs text-muted-foreground text-center">
                            <span className="font-semibold text-primary">
                                Demo:
                            </span>{' '}
                            email:{' '}
                            <code className="text-xs bg-primary/10 px-1.5 py-0.5 rounded">
                                demo@anotafy.com
                            </code>{' '}
                            / senha:{' '}
                            <code className="text-xs bg-primary/10 px-1.5 py-0.5 rounded">
                                demo123
                            </code>
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <p className="text-center text-sm text-muted-foreground mt-6">
                    © 2025 Anotafy. Todos os direitos reservados.
                </p>
            </div>
        </div>
    );
};