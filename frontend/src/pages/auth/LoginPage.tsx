import {useState} from "react";
import {useNavigate} from "react-router-dom";
import { useAuthContext } from "../../hooks/auth/useAuthContext";

export const LoginPage = () => {

  // extraemos el metodo login para usarlo 
const { login } = useAuthContext();
  // creamos el metodo navigate para navegar entre paginas
  const navigate = useNavigate();

  // creamos estados para email y password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // funcion para enviar password y email
  const handleSubmit = async (e: React.FormEvent) => {
    // prevenimos la accion por defecto
    e.preventDefault();

    try {
      // llamamos al metodo login de nuestro hook y le pasamos email y password  
      const response = await login({email, password});

      // si el token existe en la respuesta entonces navegamos a courses
      if (response.token) {
        navigate("/admin/results");
      }
    } catch (error) {
        // mandamos error
      console.error("Error al iniciar sesión");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Iniciar sesión</h2>

        <div className="mb-4">
          <label className="block mb-1">Email</label>

          <input
            type="email"
            className="w-full border rounded p-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1">Password</label>

          <input
            type="password"
            className="w-full border rounded p-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Ingresar
        </button>
      </form>
    </div>
  );
};
