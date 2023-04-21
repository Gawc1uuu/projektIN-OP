import github from "../assets/github.svg";
import linkedin from "../assets/linkedin.svg";
import facebook from "../assets/facebook.svg";
import instagram from "../assets/instagram.svg";
import mail from "../assets/mail.svg";

const Footer = () => {
  return (
    <footer className="bg-violet-400 text-white ">
      <div className="container max-w-6xl mx-auto px-6 py-10">
        <div className="flex flex-col items-center justify-between space-y-12 md:flex-row md:space-y-0 md:items-start">
          <div>
            <h1 className="text-5xl my-2">Trippy</h1>
          </div>
          <div className="flex justify-center items-center flex-col">
            <h3>All right reserved &copy;</h3>
            <img className="w-10" src={mail.toString()} alt="mail" />
            <p>gawlikjakub9@gmail.com</p>
          </div>
          <div className="flex flex-col justify-between items-center">
            <div className="flex space-x-2">
              <div>
                <a href="https://github.com/Gawc1uuu">
                  <img
                    className="w-10 hover:opacity-80"
                    src={github.toString()}
                    alt="github"
                  />
                </a>
              </div>
              <div>
                <a href="https://www.linkedin.com/in/jakub-gawlik-7b7465248/">
                  <img
                    className="w-11 hover:opacity-80"
                    src={linkedin.toString()}
                    alt="linkedin"
                  />
                </a>
              </div>
              <div>
                <a href="https://www.facebook.com/kuba.gawlik.1276/">
                  <img
                    className="w-10 hover:opacity-80"
                    src={facebook.toString()}
                    alt="facebook"
                  />
                </a>
              </div>
              <div>
                <a href="https://www.instagram.com/gawc1uuu/">
                  <img
                    className="w-10 hover:opacity-80"
                    src={instagram.toString()}
                    alt="instagram"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
