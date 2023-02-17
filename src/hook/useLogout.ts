import history from "./history";

export const useLogout = () => {
  
  const handleLogout =  () => {
    try {
        localStorage.removeItem("dataAuth");
        localStorage.removeItem("tokenAuth");
        history.push({ pathname: '/' })
        window.location.reload();
    } catch (error) {
      console.log(error)
    }
  }
    return { handleLogout}
  }
  
