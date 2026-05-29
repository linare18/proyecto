import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { subscribeToAuthChanges, logoutUser } from '../../../services/authService';

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    /* 
      // BACKUP: OLD LOCALSTORAGE METHOD
      // const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || 'null');
      // setUser(loggedInUser);
      // setLoading(false);
    */

    const unsubscribe = subscribeToAuthChanges((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    const result = await logoutUser();
    if (result.success) {
      /*
        // BACKUP: OLD LOCALSTORAGE METHOD
        // localStorage.removeItem('loggedInUser');
      */
      navigate('/login');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <p className="text-xl text-gray-600">Please log in to view your profile</p>
        <button
          onClick={() => navigate('/login')}
          className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-neutral-900 border border-neutral-800 shadow-xl rounded-3xl overflow-hidden">
        {/* Header/Cover background */}
        <div className="h-32 bg-gradient-to-r from-brand-emerald via-emerald-600 to-teal-600 opacity-80"></div>

        <div className="flex flex-col sm:flex-row items-center sm:items-start px-6 -mt-12 pb-6">
          {/* Avatar */}
          <div className="w-24 h-24 rounded-full bg-neutral-900 p-1 shadow-md border border-neutral-800">
            <div className="w-full h-full rounded-full bg-neutral-800 flex items-center justify-center text-3xl font-bold text-neutral-300">
              {user.displayName ? user.displayName.charAt(0).toUpperCase() : user.email?.charAt(0).toUpperCase() || 'U'}
            </div>
          </div>

          {/* User Info */}
          <div className="mt-4 sm:mt-14 sm:ml-6 text-center sm:text-left flex-1">
            <h1 className="text-2xl font-bold text-neutral-100">
              {user.displayName || 'Usuario de FloraStore'}
            </h1>
            <p className="text-sm text-neutral-400 mt-1">{user.email}</p>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 sm:mt-14">
            <button
              onClick={handleLogout}
              className="px-6 py-2 border-2 border-brand-rose text-brand-rose font-semibold rounded-xl hover:bg-rose-950/20 transition-colors cursor-pointer"
            >
              Cerrar sesión
            </button>
          </div>
        </div>

        {/* Profile Details Sections */}
        <div className="border-t border-neutral-800/60 p-6">
          <h3 className="text-lg font-semibold text-neutral-100 mb-4">Información de la Cuenta</h3>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-neutral-400">ID de Usuario</dt>
              <dd className="mt-1 text-sm text-neutral-200 break-all font-mono bg-neutral-950 p-2 rounded-lg border border-neutral-800/40">{user.uid}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-neutral-400">Estado de la cuenta</dt>
              <dd className="mt-1 text-sm text-brand-emerald font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-brand-emerald animate-pulse"></span>
                Activo
              </dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-neutral-400">Correo verificado</dt>
              <dd className="mt-1 text-sm text-neutral-200">{user.emailVerified ? 'Sí' : 'No'}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
