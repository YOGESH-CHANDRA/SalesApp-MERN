import "./Footer.css";

const Footer = () => {
  return (
    <>
      <div className="footer bg-primary">
        <h5 className="text-center text-white"> Copyright &copy;Yogesh Chandra {(new Date()).getFullYear()}</h5>
      </div>
    </>
  );
};

export default Footer;
