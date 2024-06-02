import { BiLogOut } from "react-icons/bi";
import UseLogout from "../../hooks/UseLogout";
const LogoutButton = () => {
  const { loading, logout } = UseLogout();
  return (
    <>
      <div className='mt-auto'>
        {!loading ? (
          <BiLogOut
            className='w-6 h-6 text-white cursor-pointer'
            onClick={logout}
          />
        ) : (
          <span className='loading loading-dots loading-xs '></span>
        )}
      </div>
    </>
  );
};

export default LogoutButton;
