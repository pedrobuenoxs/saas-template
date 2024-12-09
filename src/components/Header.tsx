import { useLocation } from "react-router-dom";

interface IHeader {
  path: string;
  text: string;
}
const Header = (headers: IHeader[]) => {
  let location = useLocation();

  return (
    <div className="flex flex-row max-w-[600px] mx-auto justify-around py-2 px-4 shadow rounded-full bg-gray-900 items-center z-10 inset-0 h-[50px] fixed m-2">
      <a href="/">
        <h1 className="text-gray-200 text-xs text-center font-bold">QCT?</h1>
      </a>
      {headers &&
        headers.map((el) => {
          return (
            <>
              <a
                href={el.path}
                className={`text-gray-200 px-4 py-1 hover:text-gray-900 hover:font-light hover:bg-white  hover:rounded-full ${
                  location.pathname === el.path
                    ? "text-gray-900 font-light bg-white  rounded-full"
                    : ""
                } `}
              >
                {el.text}
              </a>
            </>
          );
        })}
    </div>
  );
};

export default Header;
